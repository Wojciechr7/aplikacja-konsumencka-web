export interface User {
    id?: string;
    email: string;
    token?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    blocked?: boolean;
}
