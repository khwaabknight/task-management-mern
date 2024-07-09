import { Request, Response } from 'express';
import User from '../models/user.model';
require('dotenv').config();

const generateAccessToken = async(userId : string) =>{
    try {
        const user = await User.findById(userId);
        if(!user){
            throw new Error("User not found");
        }
        const accessToken = user.generateAccessToken();

        return accessToken;
    } catch (error) {
        console.error("Something went wrong while generating refresh and access token: ", error);
        throw error;
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        // 1. Check if all required fields are provided
        // 2. Check if user already exists
        // 3. Create new user
        // 4. Create token
        // 5. Return success response
        // 6. Meanwhile handle errors and return error response

        const { fullname, email, password } = req.body;
        if(!fullname || !email || !password) {
            return res.status(400).json({ 
                success: false,
                error: true,
                message: "Insufficient Data",
                data: null,
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                error: true,
                message: 'User already exists',
                data: null,
            });
        }

        
        const newUser = await User.create({
            fullname,
            email,
            password,
            tasks: [],
        });

        if (!newUser) {
            return res.status(500).json({ message: "Something went wrong while registering the user" })
        }

        const accessToken = await generateAccessToken(newUser._id.toString());    

        return res
        .status(201).json({
            success: true,
            error: false,
            message: "User created successfully",
            data: {
                token: accessToken,
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                },
            },
        });
    } catch (error) {
        console.error("Error in SIGNUP controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // Check if all required fields are provided
        // Check if user exists
        // Check if password is correct
        // Create token
        // Return success response
        // Meanwhile handle errors and return error response
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Insufficient Data",
                data: null,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                error: true,
                message: 'User does not exist',
                data: null,
            });
        }
        
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                error: true,
                message: 'Invalid password',
                data: null,
            });
        }

        const accessToken = await generateAccessToken(user._id.toString()); 

        return res
        .status(200).json({
            success: true,
            error: false,
            message: "User logged in successfully",
            data: {
                token: accessToken,
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                },
            },
        });
    } catch (error) {
        console.error("Error in LOGIN controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
};
