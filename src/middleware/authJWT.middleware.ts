import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '@models/user.model';
import RoleModel from '@models/role.model';
import { Role } from '@interfaces/role.interface';

const db = require("../models");
const secret = process.env.JWT_SECRET || '35SADASDASDQEQWEQWE';

interface AuthenticatedRequest extends Request {
  userId?: string; // Define el tipo de userId según tus necesidades (en este caso, asumo string)
}

const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = (req.session as { token?: string })?.token;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.userId = decoded.id as string;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};

// const checkUserRole = (role: string) => {
//   return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//       const user = await UserModel.findById(req.userId).exec();

//       if (!user) {
//         return res.status(404).send({ message: 'User not found!' });
//       }

//       const roles = await RoleModel.find({ _id: { $in: user.roles } }).exec();

//       const roleNames = roles.map((role : Role) => role.name);

//       if (roleNames.includes(role)) {
//         next();
//       } else {
//         return res.status(403).send({ message: `Require ${role} Role!` });
//       }
//     } catch (error: any) {
//       return res.status(500).send({ message: error.message });
//     }
//   };
// };

// export const isAdmin = checkUserRole('admin');
// export const isModerator = checkUserRole('moderator');

export default verifyToken;






























// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import {  Request as ExpressRequest, NextFunction, Response } from "express";
// const secret = process.env.JWT_SECRET;

// const db = require("../models");
// const User = db.user;
// const Role = db.role;

// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   let token = req.session.token;

//   if (!token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }

//   jwt.verify(token,
//             config.secret,
//             (err, decoded) => {
//               if (err) {
//                 return res.status(401).send({
//                   message: "Unauthorized!",
//                 });
//               }
//               req.userId = decoded.id;
//               next();
//             });
// };

// const isAdmin = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     Role.find(
//       {
//         _id: { $in: user.roles },
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "admin") {
//             next();
//             return;
//           }
//         }

//         res.status(403).send({ message: "Require Admin Role!" });
//         return;
//       }
//     );
//   });
// };

// const isModerator = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     Role.find(
//       {
//         _id: { $in: user.roles },
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "moderator") {
//             next();
//             return;
//           }
//         }

//         res.status(403).send({ message: "Require Moderator Role!" });
//         return;
//       }
//     );
//   });
// };

// const authJwt = {
//   verifyToken,
//   isAdmin,
//   isModerator,
// };
// module.exports = authJwt;
