import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import DependencyTypes from "../Common/DependencyTypes";
import { ResponseEntity } from "../Utils/ResponseEntity";
import * as ResponseMessage from '../Constants/Constants';
import { validateId, validateRequest } from "../Utils/RequestValidation";
import { IBookService } from "../Services/Interface/IBookService";
import { decodeJwt } from "../Middlewares/IsAuth";

@injectable()
export class BookController {

    private readonly _bookService: IBookService;

    constructor(
        @inject(DependencyTypes.IBookService) bookService: IBookService
    ) {
        this._bookService = bookService;
    }

    public getBooks = async (req: Request, res: Response) => {
        try {
            const data = await this._bookService.getAll();

            if (data) return res.send(new ResponseEntity(data, ResponseMessage.Successfull, 200));

            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public getBook = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!validateId(id)) return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._bookService.getById(parseInt(id));
            if (data) return res.send(new ResponseEntity(data, ResponseMessage.Successfull, 200));

            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public createBook = async (req: Request, res: Response) => {
        const { title, publisher, User_id } = req.body;
        const decodedJwt = decodeJwt(req);

        if (!validateRequest([title, publisher, User_id]))
            return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._bookService.create(decodedJwt, title, publisher, User_id);
            if (data) return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));

            return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public updateBook = async (req: Request, res: Response) => {
        const { id, title, publisher, User_id } = req.body;
        const decodedJwt = decodeJwt(req);

        if (!validateRequest([title, publisher, User_id]))
            return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._bookService.update(decodedJwt, id, title, publisher, User_id);
            if (data) return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));

            return res.send(new ResponseEntity(data, data.responseMessage, data.responseCode));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public deleteBook = async (req: Request, res: Response) => {
        const { id, User_id } = req.params;
        const decodedJwt = decodeJwt(req);

        if (!validateId(id)) return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._bookService.delete(decodedJwt, parseInt(id), parseInt(User_id));
            if (data) return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));

            return res.send(new ResponseEntity(data.responseData, data.responseMessage, data.responseCode));

        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };
}