import api from "./axios";

export const signUpUser = (data) => {
    return api.post("auth/signup", data);
};

export const signInUser = (data) => {
    return api.post("auth/signin", data, {withCredentials : true});
}

export const signInUserWithGoogleAuthProvider = (idToken) => {
    
    return api.post(
        "auth/google", 
        {idToken },
        {withCredentials : true}
    );
}