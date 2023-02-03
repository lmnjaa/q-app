import IEntity from '../Entity/IEntity';

export class ResponseEntity {
    public responseData: IEntity[] | IEntity;
    public responseMessage: string;
    public statusCode: number;
    constructor(responseData: IEntity[] | IEntity, responseMessage: string, statusCode: number) {
        this.responseData = responseData;
        this.responseMessage = responseMessage;
        this.statusCode = statusCode;
    }
}