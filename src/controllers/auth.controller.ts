import {Request, Response} from "express"
import bcrypt from "bcrypt"
import { handleHttp } from "@utils/error.handle"
import UserModel from "@models/user.model"
import { User } from "@interfaces/user.interface"
import { Error } from "mongoose"

const signup = (req: Request, res: Response) => {
    try {
        
        const user: User = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        user.save((err: Error, user: User)=>{
            if(err){
                res.status(500).send({message: err})
                return;
            }

            if (req.body.roles) {
                Role.find(
                  {
                    name: { $in: req.body.roles },
                  },
                  (err, roles) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
          
                    user.roles = roles.map((role) => role._id);
                    user.save((err) => {
                      if (err) {
                        res.status(500).send({ message: err });
                        return;
                      }
          
                      res.send({ message: "User was registered successfully!" });
                    });
                  }
                );
              } else {
                Role.findOne({ name: "user" }, (err, role) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
          
                  user.roles = [role._id];
                  user.save((err: Error) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
          
                    res.send({ message: "User was registered successfully!" });
                  });
                });
              }
        })
        
    } catch (error) {
        handleHttp(res, `ERROR_SIGNUP`, error)
    }
}

const loggin = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, `ERROR_SIGNUP`, error)
    }
}


const signout = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, `ERROR_SIGNUP`, error)
    }
}