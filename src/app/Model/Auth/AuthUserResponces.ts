import { AuthUser } from "./AuthUser";

export interface AuthUserResponces {
    Status: number;
    Success: boolean;
    Status_Message: string;
    data: AuthUser;
}
