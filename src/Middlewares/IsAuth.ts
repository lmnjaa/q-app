import { Request, Response, NextFunction } from "express";
import { ResponseEntity } from "../Utils/ResponseEntity";
import * as Constants from '../Constants/Constats';
import * as jwt from 'jsonwebtoken';
import { JwtDecodeClass } from "../Utils/JwtDecodeClass";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { JWT_SECRET_KEY } = process.env;
    const token = req.cookies.JwtCookie;

    if (!token) return res.send(new ResponseEntity([], Constants.NotAuthorized, 403));

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.body = new JwtDecodeClass(decoded['role'], decoded['id']);

        if (decoded['role'] === 1) return res.send(new ResponseEntity([], Constants.NotAuthorized, 403));
        next();
    } catch {
        return res.send(new ResponseEntity([], Constants.ServerError, 500));
    }
}

export const decodeJwt = (req: Request): JwtDecodeClass | undefined => {
    const { JWT_SECRET_KEY } = process.env;
    const token = req.cookies.JwtCookie;

    if (!token) return;

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        return new JwtDecodeClass(decoded['role'], parseInt(decoded['id']));
    } catch (error) {
        return error.message;
    }
}