export default interface User {
    // User Info
    name: string;
    username: string,
    email: string;
    password?: string;
    googleId?: string;
    facebookId?: string;

    // Acount Status
    active?: boolean;
    lock?: boolean;
    token?: string
}