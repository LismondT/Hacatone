from datetime import datetime, timedelta

import aiosqlite

db_path = "../Database/Alabuga.db"

fk_mapping = {
    "FK_Country": "Country",
    "FK_Region": "Region",
    "FK_Role": "Role",
    "FK_Rank": "Rank"
}


async def users():
    async with aiosqlite.connect(f"{db_path}", check_same_thread=False) as db:
        try:
            users_data = []
            select_fields = ['u.*']
            join_clauses = []
            for fk_field, table in fk_mapping.items():
                join_clauses.append(f'LEFT JOIN "{table}" t_{table} ON u."{fk_field}" = t_{table}."ID"')
                select_fields.append(f't_{table}."Name" AS "{fk_field}"')
            sql_query = f'SELECT {", ".join(select_fields)} FROM "User" u {" ".join(join_clauses)}'
            async with db.execute(sql_query) as cursor:
                columns = [description[0] for description in cursor.description]
                async for row in cursor:
                    user_dict = {}
                    for i, column_name in enumerate(columns):
                        user_dict[column_name] = row[i]
                    users_data.append(user_dict)
            return users_data
        except Exception as e:
            print(f"Ошибка при получении пользователей: {e}")
            return []


async def get_all_missions():
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        sql = """
            SELECT m.ID,
                   m.Name,
                   m.Image,
                   m.Description,
                   m.Expirience,
                   m.Energy,
                   m.Online,
                   m.Relevant,
                   m.Need_file,
                   m.Lore,
                   m.FK_Branch,
                   r.Name AS RankName,
                   c.Name AS CategoryName,
                   b.ID AS BranchName
            FROM "Mission" m
            LEFT JOIN "Rank" r ON m.FK_Rank = r.ID
            LEFT JOIN "Category" c ON m.FK_Category = c.ID
            LEFT JOIN "Branch" b ON m.FK_Branch = b.ID
            """
        async with db.execute(f"{sql}") as cursor:
            users_data = []
            columns = [description[0] for description in cursor.description]
            async for row in cursor:
                user_dict = {}
                for i, column_name in enumerate(columns):
                    user_dict[column_name] = row[i]
                users_data.append(user_dict)
        return users_data


async def check_register(user_id):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        async with db.execute("SELECT user_id FROM users WHERE user_id=?", (user_id,)) as cursor:
            async for row in cursor:
                return bool(len(row))
            return 0


async def check_admin(user_id):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        async with db.execute("SELECT user_id FROM users WHERE user_id=? AND status=1", (user_id,)) as cursor:
            async for row in cursor:
                if row[0] == user_id:
                    return True
            return False


async def admin_list():
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        async with db.execute("SELECT user_id, name FROM users WHERE status=1") as cursor:
            admins = []
            async for row in cursor:
                admins.append(row)
            return admins


async def register(user_id, full_name, username):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        await db.execute(
            "INSERT INTO `users` (`user_id`, `name`, `username`) VALUES (?, ?, ?)",
            (user_id, full_name, username))
        await db.commit()


async def update_data(table_name, data, set_data, user_id):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        try:
            await db.execute(f"UPDATE {table_name} SET {data}=? WHERE user_id=?", (set_data, user_id))
            await db.commit()
            return 1
        except Exception:
            pass


async def get_events(event_type):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        async with db.execute("SELECT id, name FROM events WHERE type=?", (event_type,)) as cursor:
            events = []
            if not cursor:
                return False
            async for row in cursor:
                events.append(row)
            return events


async def get_event(event_id):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        async with db.execute("SELECT * FROM events WHERE id = ?", (event_id,)) as cursor:
            return await cursor.fetchone()


async def create_event(event_type, name, description, url):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        await db.execute(
            "INSERT INTO `events` (`type`, `name`, `description`, `url`) VALUES (?, ?, ?, ?)",
            (event_type, name, description, url))
        await db.commit()


async def delete_event(event_id):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        await db.execute("DELETE FROM events WHERE id = ?", (event_id,))
        await db.commit()
        return True


async def update_event(event_id, data, set_data):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        await db.execute(f"UPDATE events SET {data}=? WHERE id=?", (set_data, event_id,))
        await db.commit()
        return True


# Сохранение викторины
async def save_quiz(post_id: int, question: str, correct_answer: str, photo_id: str = None):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        await db.execute('''
            INSERT INTO quiz (post_id, question, correct_answer, photo_id, created_at)
            VALUES (?, ?, ?, ?, ?)
        ''', (post_id, question, correct_answer, photo_id, datetime.now()))
        await db.commit()


# Получение викторины по ID поста
async def get_quiz_by_post_id(post_id: int):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        cursor = await db.execute('''
            SELECT * FROM quiz WHERE post_id = ?
        ''', (post_id,))
        return await cursor.fetchone()


# Обновление победителя
async def update_quiz_winner(post_id: int, winner_id: int, winner_name: str):
    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        await db.execute('''
            UPDATE quiz 
            SET winner_id = ?, winner_name = ?
            WHERE post_id = ?
        ''', (winner_id, winner_name, post_id))
        await db.commit()


async def get_active_time_statistics():
    now = datetime.now()
    start_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
    last_hour = now - timedelta(hours=1)
    last_week = now - timedelta(weeks=1)
    last_5_minutes = now - timedelta(minutes=5)

    async with aiosqlite.connect(db_path, check_same_thread=False) as db:
        async with db.execute("SELECT active_time FROM users WHERE active_time IS NOT NULL AND active_time != ''") as cursor:
            rows = await cursor.fetchall()
            active_times = [datetime.fromisoformat(row[0]) for row in rows]

    # Подсчет пользователей по временным интервалам
    users_today = sum(1 for time in active_times if time >= start_of_day)
    users_last_week = sum(1 for time in active_times if time >= last_week)
    users_last_hour = sum(1 for time in active_times if time >= last_hour)
    users_last_5_minutes = sum(1 for time in active_times if time >= last_5_minutes)

    return users_today, users_last_hour, users_last_5_minutes, users_last_week



