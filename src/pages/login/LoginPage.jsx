// components/LoginForm.jsx
import { useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login: authLogin, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Откуда пришли - для редиректа обратно
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await authLogin(login, password);
      navigate(from, { replace: true });
    } catch (err) {
      // Ошибка уже установлена в контексте
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Вход в систему</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Логин:
          </label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Пароль:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>

      {/* Тестовые данные для разработки */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold mb-2">Тестовые данные:</h3>
          <div className="text-sm">
            <p>Логин: <strong>admin</strong>, Пароль: <strong>admin123</strong></p>
            <p>Логин: <strong>user</strong>, Пароль: <strong>user123</strong></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;