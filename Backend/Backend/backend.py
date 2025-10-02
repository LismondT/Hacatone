import asyncio
import os
import random
from aiohttp import web
import jwt
import datetime
import secrets
from Database import db

# 🔑 Секретный ключ для подписи JWT
SECRET_KEY = "asdmakmcboaragbвфыввыфвфывф"

# 🌍 домен фронтенда, который разрешаем
FRONTEND_ORIGIN = "http://localhost:3000"


UPLOAD_DIR = "uploads"


# Функция генерации access токена
def generate_access_token(user):
    payload = {
        "ID": user["ID"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=15),
        "iss": "http://localhost:5500"
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token


def generate_refresh_token():
    return secrets.token_hex(32)


# Обработчик для OPTIONS запросов (preflight)
async def options_handler(request):
    response = web.Response(status=200)
    response.headers['Access-Control-Allow-Origin'] = FRONTEND_ORIGIN
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response





async def get_user_id(request):
    access_token = request.cookies.get('access_token')
    if not access_token:
        return None
    payload = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])
    user_id = payload["ID"]
    return user_id


async def get_missions(request):
    print(123)
    missions = await db.get_all_missions()
    result = []
    for m in missions:
        result.append({
            "id": str(m.get("ID")),  # ID как строка
            "title": m.get("Name", ""),
            "description": m.get("Description", ""),
            "expirience": m.get("Expirience", 0),
            "energy": m.get("Energy", 0),
            "hasArtefactReward": False,   # пока что нет логики артефактов
            "artefactName": "",
            "skills": [],
            "needRank": m.get("RankName", ""),  # подтягиваем название ранга из JOIN
            "isOnline": bool(m.get("Online", 0)),  # конвертируем 0/1 в true/false
            "branchId": m.get("FK_Branch", 1)
        })
    print(result)
    return web.json_response({
        "status": "success",
        "missions": result
    })



async def get_result(request):
    print(123)
    reader = await request.multipart()

    saved_files = []

    async for part in reader:
        if part.filename:  # значит это файл
            filename = part.filename
            file_path = os.path.join(UPLOAD_DIR, filename)

            # создаём папку, если её нет
            os.makedirs(UPLOAD_DIR, exist_ok=True)

            # сохраняем файл по частям (stream)
            with open(file_path, "wb") as f:
                while True:
                    chunk = await part.read_chunk()  # по умолчанию 8192 байт
                    if not chunk:
                        break
                    f.write(chunk)

            saved_files.append(file_path)
        else:
            # если обычное поле в FormData
            value = await part.text()
            print(f"Поле {part.name} = {value}")
    return web.json_response({
        "status": 200,
        "message": f"Услышал тебя родной"
    }, status=200)


async def signin_user(request):
    if request.method == 'OPTIONS':
        return await options_handler(request)

    users = await db.users()

    if request.method == 'POST':
        try:
            data = await request.json()
            print("Received data:", data)
        except:
            data = {}

    user = users[0]
    print(user)

    access_token = generate_access_token(user)
    refresh_token = generate_refresh_token()

    response = web.json_response({
        "id": user.get("ID"),
        "firstName": user.get("First_name", ""),
        "lastName": user.get("Name", ""),
        "surname": user.get("Patronymic", ""),
        "email": user.get("E-mail", ""),
        "phone": user.get("Phone", ""),
        "birthdate": user.get("Birthdate", ""),
        "sex": user.get("Sex", ""),
        "countryId": user.get("FK_Country"),
        "regionId": user.get("FK_Region"),
        "isHr": user.get("FK_Role") == 'hr',
        "rankId": user.get("FK_Rank"),
        "place": user.get("Place", ""),
        "photo": user.get("Photo", ""),
        "resume": user.get("Resume", ""),
        "energy": user.get("Energy", 0),
        "exp": user.get("Expirience", 0),
        "direction": user.get("Direction", ""),
        "access_token": access_token
    })

    # ✅ Устанавливаем куки правильно (SameSite=None + Secure)
    response.set_cookie(
        name="access_token",
        value=access_token,
        max_age=900,  # 15 минут
        samesite="None",
        secure=True
    )

    response.set_cookie(
        name="refresh_token",
        value=refresh_token,
        max_age=604800,  # 7 дней
        samesite="None",
        secure=True
    )

    return response


async def auth_user(request):
    if request.method == 'OPTIONS':
        return await options_handler(request)

    access_token = request.cookies.get('access_token')
    print(access_token)
    if not access_token:
        return web.json_response({
            "error": "Not authenticated",
            "message": "No access token found in cookies"
        }, status=401)

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])
        user_id = payload["ID"]

        users = await db.users()
        user = next((u for u in users if u["ID"] == user_id), None)
        print(user)

        if not user:
            return web.json_response({
                "error": "User not found",
                "message": f"User with ID {user_id} not found in database"
            }, status=404)

        response = web.json_response({
            "id": user.get("ID"),
            "firstName": user.get("First_name", ""),
            "lastName": user.get("Name", ""),
            "surname": user.get("Patronymic", ""),
            "email": user.get("E-mail", ""),
            "phone": user.get("Phone", ""),
            "birthdate": user.get("Birthdate", ""),
            "sex": user.get("Sex", ""),
            "countryId": user.get("FK_Country"),
            "regionId": user.get("FK_Region"),
            "isHr": user.get("FK_Role") == 'hr',
            "rankName": user.get("FK_Rank"),
            "place": user.get("Place", ""),
            "image": user.get("Photo", ""),
            "resume": user.get("Resume", ""),
            "energy": user.get("Energy", 0),
            "exp": user.get("Expirience", 0),
            "direction": user.get("Direction", ""),
            "access_token": access_token
        })

        # 🔄 Обновляем куку (продлеваем срок)
        response.set_cookie(
            name="access_token",
            value=access_token,
            max_age=900,
            samesite="None",
            secure=True
        )

        return response

    except jwt.ExpiredSignatureError:
        return web.json_response({
            "error": "Token expired",
            "message": "Access token has expired"
        }, status=401)

    except jwt.InvalidTokenError as e:
        return web.json_response({
            "error": "Invalid token",
            "message": str(e)
        }, status=401)


async def run_webhook_server():
    app = web.Application()

    # Middleware для CORS
    async def add_cors_headers(request, response):
        response.headers['Access-Control-Allow-Origin'] = FRONTEND_ORIGIN
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
        response.headers['Access-Control-Allow-Credentials'] = 'true'

    app.on_response_prepare.append(add_cors_headers)

    app.router.add_route('*', '/api/auth/profile', auth_user)
    app.router.add_route('*', '/api/auth/signin', signin_user)
    app.router.add_post('/api/sendMissionResult', get_result)
    app.router.add_route("*", '/api/getMissions', get_missions)

    async def root_handler(request):
        return web.json_response({"status": "server is running"})

    app.router.add_route('*', '/', root_handler)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', 5500)
    await site.start()

    print("🚀 Webhook сервер запущен на порту 5500")
    return runner


async def main():
    await run_webhook_server()
    print("🔄 Сервер работает. Нажмите Ctrl+C для остановки...")
    await asyncio.Future()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n✅ Сервер остановлен")
