export const authValidationHandler = ({username, email, password}) => {
    const error = {};
    if(!username || username.trim().length < 3) {
        error.username = "Username must be at least 3 character.";
    }

    if(!email){
        error.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        error.email = "Invalid email address.";
    }
    if(!password || password.length < 6){
        error.password = "Password must be at least 6 character."
    }
    return error;
};