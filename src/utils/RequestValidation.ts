import { JwtDecodeClass } from "./JwtDecodeClass";

export const validateId = (id: string): boolean => {
    return (typeof id == 'number' || !isNaN(parseInt(id))) ? true : false;
}

export const validateRequest = (params: string[]) => {
    params.forEach((param, _) => {
        if(!param) return false;
    })
    return true;
}

export const validateUsernameAndPassworwd = (username: string, password: string) => {
    return (!username || !password) ? false : true;
}

export const JwtChecker = (token: JwtDecodeClass, User_id: number) => {
    return token.Role === 0 && token.UserId !== User_id ? true : false;
}