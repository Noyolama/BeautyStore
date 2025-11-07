import { createContext } from "react";

export type CurrentUser = {
    _id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    [key: string]: any;
}

export const AuthContext = createContext({
    currentUser: {} as CurrentUser | null,
    login: (_: CurrentUser) => { },
    logout: () => { },
});