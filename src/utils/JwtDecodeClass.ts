export class JwtDecodeClass {
    public Role: number;
    public UserId: number;

    constructor(role: number, userId: number){
        this.Role = role;
        this.UserId = userId;
    }
}