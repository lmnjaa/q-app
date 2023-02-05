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