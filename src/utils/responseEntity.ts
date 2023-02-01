export class ResponseEntity {
    public responseData = [];
    public responseMessage: string;
    public statusCode: number;
    constructor(responseData: [], responseMessage: string, statusCode: number) {
        this.responseData = responseData;
        this.responseMessage = responseMessage;
        this.statusCode = statusCode;
    }
}