import { success, ZodError } from "zod";

export const validate = 
(schema) => 
(req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch(error) {
        if(error instanceof ZodError) {
            return res.status(400).json({
                success : false,
                errors : error.issues.map((err) => ({
                    field : err.path[0],
                    message : err.message,
                })),
            });
        }
        next(error) // pass non-zod error to global error handler
    }
}; 