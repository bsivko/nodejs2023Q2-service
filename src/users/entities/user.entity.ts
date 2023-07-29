import { ApiProperty } from "@nestjs/swagger";

export class User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
}

export class UserResponse {

    @ApiProperty({ type: 'string' })
    id: string;
    @ApiProperty({ type: 'string' })
    login: string;
    @ApiProperty({ type: 'integer' })
    version: number;
    @ApiProperty({ type: 'integer' })
    createdAt: number;
    @ApiProperty({ type: 'integer' })
    updatedAt: number;

    constructor(o: User) {
        this.id = o.id;
        this.login = o.login;
        this.version = o.version;
        this.createdAt = o.createdAt;
        this.updatedAt = o.updatedAt;
    }
}

