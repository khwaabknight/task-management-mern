import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
require('dotenv').config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace("Bearer ","") ?? null;

        if(!token) {
            return res.status(401).json({
                success:false,
                error: true,
                message:"Token is missing",
                data: null,
            });
        }

        const decode:JwtPayload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
        const user = await User.findById(decode._id);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "User not found",
                data: null,
            });
        }

        req.body.user = user,

        next();        
    } catch (error:any) {
        console.log("Error in AUTH Middleware: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
        
    }

}