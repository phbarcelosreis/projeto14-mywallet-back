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

export async function signInBodyValidation(req, res, next) {

    const { email } = req.body;

    const check = await usersCollection.findOne({ email: email });
    console.log(check);
    if (!check) {
        return res.status(404).send({ message: "User is not created" });
    }


    next();
}