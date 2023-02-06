export interface IMysqlService {
    setup(): void;
    execute<T>(query: string, params: any[]): Promise<T>;
}