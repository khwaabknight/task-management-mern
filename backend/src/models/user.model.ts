import mongoose, { ObjectId, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

export type UserType = {
    _id: string;
    fullname: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    refreshToken?: string;
    isPasswordCorrect: (password : string) => Promise<boolean>;
    generateAccessToken: () => string;
}

const userSchema = new Schema<UserType>({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password : string){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model<UserType>("User", userSchema);
export default User;