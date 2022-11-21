import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { balanceCollection, usersCollection } from "../database/db.js";

export async function register(req, res) {
    const user = req.body;

    try {

        const hashPassword = bcrypt.hashSync(user.password, 10);
        await usersCollection.insertOne({ ...user, password: hashPassword });

        res.send("OK")

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }
}

export async function signIn(req, res) {

    const { email } = req.body;

    try {


        const searchName = await usersCollection.findOne({ email: email });

        const user = {
            name: searchName.name,
            email: searchName.email
        }

        await balanceCollection.insertOne({...user})
        
        const newuser = await balanceCollection.findOne({email: searchName.email})


        res.status(200).send(newuser)

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }
}

export let userEmail;