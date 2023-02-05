export const validateId = (id: string): boolean => {
    return (typeof id == 'number' || !isNaN(parseInt(id))) ? true : false;
}

export const validateUserEntity = (firstName: string, lastName: string, email: string, isAdmin: boolean, username: string, password: string) => {
    return (!firstName || !lastName || !email || !isAdmin || !username || !password) ? false : true;
}

export const validateUsernameAndPassworwd = (username: string, password: string) => {
    return (!username || !password) ? false : true;
}