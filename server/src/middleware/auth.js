import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'habitup_super_secret_jwt_key_2026';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado: Token no proporcionado.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Sesión inválida o expirada. Por favor, inicia sesión nuevamente.' });
    }
    req.user = user;
    next();
  });
}

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
