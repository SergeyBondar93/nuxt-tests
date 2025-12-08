import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: true, // Разрешить все источники
  credentials: true // Разрешить отправку cookies
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public')); // Раздавать статические файлы из папки public

// Middleware для проверки авторизации
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('No token found. Cookies:', req.cookies);
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Корневой эндпоинт
app.get('/', (req, res) => {
  res.json({
    message: 'API Server is running',
    endpoints: {
      'POST /login': 'Авторизация (username: user, password: 123)',
      'GET /current-user': 'Получить информацию о текущем пользователе (требует авторизации)',
      'GET /todos': 'Получить 10 todos из jsonplaceholder (требует авторизации)'
    }
  });
});

// Эндпоинт для авторизации
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === 'user' && password === '123') {
    const token = jwt.sign(
      { username: 'user', id: 1 },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Для localhost не нужен secure
      sameSite: 'lax', // Для localhost lax работает
      maxAge: 24 * 60 * 60 * 1000, // 24 часа
      path: '/' // Явно указываем путь
    });

    console.log('Cookie set successfully');
    return res.json({ message: 'Login successful' });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

// Эндпоинт для отладки - проверка cookie
app.get('/debug-cookies', (req, res) => {
  res.json({
    cookies: req.cookies,
    headers: req.headers.cookie
  });
});

// Эндпоинт для получения информации о текущем пользователе
app.get('/current-user', authenticateToken, (req, res) => {
  res.json({
    username: req.user.username,
    id: req.user.id
  });
});

// Эндпоинт для получения todos
app.get('/todos', authenticateToken, async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    
    // Возвращаем первые 10 todos
    const limitedTodos = todos.slice(0, 10);
    
    res.json(limitedTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

