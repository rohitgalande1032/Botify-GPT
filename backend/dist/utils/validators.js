import { body, validationResult } from 'express-validator';
export const validate = (validations) => {
    return async (req, res, next) => {
        // Run all validations first
        await Promise.all(validations.map(validation => validation.run(req)));
        // Check for validation errors
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next(); // No errors, proceed to next middleware
        }
        // If there are errors, respond with a 422 and the error details
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Invalid email format"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should be at least 6 characters long")
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];
//# sourceMappingURL=validators.js.map