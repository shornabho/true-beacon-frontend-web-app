import { API } from "./index";

const urlSlug = "/user";

// Register new user
export const registerUser = (username: string, name: string, password: string) =>
    API.post(`${urlSlug}/register`, {
        username,
        name,
        password,
    });

// Login existing user
export const loginUser = (username: string, password: string) =>
    API.post(`${urlSlug}/login`, {
        username,
        password,
    });

// Get User Profile
export const getUserProfile = () => API.get(`${urlSlug}/profile`);
