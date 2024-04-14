import mongoose, { Mongoose } from 'mongoose';

mongoose.Promise = global.Promise;

import User from './user.model';
import Role from './role.model';

interface Database {
  mongoose: Mongoose;
  user: typeof User;
  role: typeof Role;
  ROLES: string[];
}

const db: Database = {
  mongoose: mongoose,
  user: User,
  role: Role,
  ROLES: ["user", "admin", "moderator"],
};

export default db;
