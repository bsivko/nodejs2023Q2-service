export class CreateUserDto {
    readonly id: string;
    readonly login: string;
    readonly password: string;
    readonly version: number; // integer number, increments on update
    readonly createdAt: number; // timestamp of creation
    readonly updatedAt: number; // timestamp of last update
}
