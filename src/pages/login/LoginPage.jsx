import { useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login: authLogin, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await authLogin(login, password);
      navigate(from, { replace: true });
    } catch (err) {
      // ошибка уже установлена в контексте
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">🚀 Вход в систему</h2>
        
        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Логин:</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="login-btn">
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>

        {process.env.NODE_ENV === 'development' && (
          <div className="test-data">
            <h3>Тестовые данные:</h3>
            <p>Логин: <strong>admin</strong>, Пароль: <strong>admin123</strong></p>
            <p>Логин: <strong>user</strong>, Пароль: <strong>user123</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
