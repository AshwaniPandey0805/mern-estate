import {z} from  "zod";

export const signUpSchema = z.object({
    username : z.string().min(3, "Username must be atleast 3 charater."),
    email : z.string().email('Invalid email address.'),
    password : z.string().min(6, "Password must be atleast 6 character. ")
});