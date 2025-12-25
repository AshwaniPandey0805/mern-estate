import api from "./axios";

export const signUpUser = (data) => {
    return api.post("auth/signup", data);
};

export const signInUser = (data) => {
    return api.post("auth/signin", data, {withCredentials : true});
}