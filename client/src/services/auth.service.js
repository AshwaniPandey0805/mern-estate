import api from "./axios";

export const signUpUser = (data) => {
    return api.post("auth/signup", data);
};