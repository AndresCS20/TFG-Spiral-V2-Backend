import mongoose from 'mongoose';
import user from './user.model';
import role from './role.model';

const db: {
  mongoose: typeof mongoose,
  user: any, // Reemplaza 'any' con el tipo real de 'user'
  role: any, // Reemplaza 'any' con el tipo real de 'role'
  ROLES: string[],
} = {
  mongoose,
  user,
  role,
  ROLES: ["user", "admin", "moderator"],
};

export default db;