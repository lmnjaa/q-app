import { BaseModel } from "../Models/BaseModel";

export class ResponseEntity {
    public responseData: BaseModel[] | BaseModel;
    public responseMessage: string;
    public statusCode: number;
    constructor(responseData: BaseModel[] | BaseModel, responseMessage: string, statusCode: number) {
        this.responseData = responseData;
        this.responseMessage = responseMessage;
        this.statusCode = statusCode;
    }
}