export enum RES_TYPE {
    ERROR,
    SUCCESS
}

export class ServiceResponse {
    responseType: RES_TYPE;
    responseMessage: string;
    responseData: string | [];
    responseCode: number;
    constructor(responseType: RES_TYPE, responseMessage: string, responseData: string | [], responseCode: number) {
        this.responseType = responseType;
        this.responseMessage = responseMessage;
        this.responseData = responseData;
        this.responseCode = responseCode;
    }
}