import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import DependencyTypes from "../Common/DependencyTypes";
import { IUserService } from "../Services/Interface/IUserService";
import { ResponseEntity } from "../Utils/ResponseEntity";
import * as ResponseMessage from '../Constants/Constants';
import { validateId, validateRequest } from "../Utils/RequestValidation";
import { decodeJwt } from "../Middlewares/IsAuth";

@injectable()
export class UserController {

    private readonly _userService: IUserService;

    constructor(
        @inject(DependencyTypes.IUserService) userService: IUserService
    ) {
        this._userService = userService;
    }

    
    public getUsers = async (req: Request, res: Response) => {
        try {
            const data = await this._userService.getAll();

            if (data) return res.send(new ResponseEntity(data, ResponseMessage.Successfull, 200));

            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public getUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!validateId(id)) return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._userService.getById(parseInt(id));
            if (data) return res.send(new ResponseEntity(data, ResponseMessage.Successfull, 200));

            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public createUser = async (req: Request, res: Response) => {
        const { firstName, lastName, email, isAdmin, username, password } = req.body;

        if (!validateRequest([firstName, lastName, email, isAdmin, username, password]))
            return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._userService.create(firstName, lastName, email, isAdmin, username, password);
            if (data) return res.send(new ResponseEntity(data, data.responseMessage, data.responseCode));

            return res.send(new ResponseEntity(data, data.responseMessage, data.responseCode));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public updateUser = async (req: Request, res: Response) => {
        const { id, firstName, lastName, email, isAdmin, username, password } = req.body;

        if (!validateRequest([firstName, lastName, email, isAdmin, username, password]))
            return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._userService.update(id, firstName, lastName, email, isAdmin, username, password);
            if (data) return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));

            return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!validateId(id)) return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._userService.delete(parseInt(id));
            if (data.responseData) return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));

            return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));

        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public deactivateUser = async (req: Request, res: Response) => {
        const { id, User_id } = req.params;
        const decodedJwt = decodeJwt(req);

        if (!validateId(id)) return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._userService.deactive(decodedJwt, parseInt(id), parseInt(User_id));
            if (data.responseData) return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));

            return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));

        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };
}