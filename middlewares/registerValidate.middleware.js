import { userRegister } from "../models/users.model.js"
import { usersCollection } from "../database/db.js"

export async function registerValidation(req, res, next) {
    const user = req.body;
    
    const validation = userRegister.validate(user, { abortEarly: false });
    if (validation.error) {
        const vlError = validation.error.details.map(
            (err) => err.message
        );
        return res.status(400).send(vlError);
    }

    const userValidate = await usersCollection.findOne({ email: user.email })
    if (userValidate) {
        return res.status(400).send({ message: "Email já cadastrado!" });
    }


    next();
}