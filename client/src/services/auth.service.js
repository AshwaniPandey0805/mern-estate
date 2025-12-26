import api from "./axios";

export const signUpUser = (data) => {
    return api.post("auth/signup", data);
};

export const signInUser = (data) => {
    return api.post("auth/signin", data, {withCredentials : true});
}

export const signInUserWithGoogleAuthProvider = (data) => {
    console.log("data >>>>>> ", data.user.displayName);
    const requetsData = {
        name : data.user.displayName,
        email : data.user.email,
        photo : data.user.photoURL
    }
    return api.post("auth/google", requetsData);
}