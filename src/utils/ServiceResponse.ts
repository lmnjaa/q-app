export enum RES_TYPE {
    ERROR,
    SUCCESS
}

export class ServiceResponse {
    responseType: RES_TYPE;
    responseMessage: string;
    responseData: string;
    constructor(responseType: RES_TYPE, responseMessage: string, responseData: string) {
        this.responseType = responseType;
        this.responseMessage = responseMessage;
        this.responseData = responseData;
    }
}