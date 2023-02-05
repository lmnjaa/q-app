import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import DependencyTypes from "../Common/DependencyTypes";
import { ResponseEntity } from "../Utils/ResponseEntity";
import * as ResponseMessage from '../Constants/constats';
import { validateId, validateRequest } from "../Utils/RequestValidation";
import { IBookService } from "../Services/interface/IBookService";

@injectable()
export class BookController {

    private readonly _bookService: IBookService;

    constructor(
        @inject(DependencyTypes.IUserService) bookService: IBookService
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

        if (!validateRequest([title, publisher, User_id]))
            return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._bookService.create(title, publisher, User_id);
            if (data) return res.send(new ResponseEntity(data, ResponseMessage.Successfull, 200));

            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public updateBook = async (req: Request, res: Response) => {
        const { id, title, publisher, User_id } = req.body;

        if (!validateRequest([title, publisher, User_id]))
            return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._bookService.update(id, title, publisher, User_id);
            if (data) return res.send(new ResponseEntity(data, ResponseMessage.Successfull, 200));

            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public deleteBook = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!validateId(id)) return res.send(new ResponseEntity([], ResponseMessage.InvalidParameter, 400));

        try {
            const data = await this._bookService.delete(parseInt(id));
            if (data > 1) return res.send(new ResponseEntity(data, ResponseMessage.Successfull, 200));

            return res.send(new ResponseEntity(data, ResponseMessage.NoDataByThatId, 404));

        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };
}