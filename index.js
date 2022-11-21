import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import Joi from "joi";


const server = express();

dotenv.config();
server.use(cors());
server.use(express.json());
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {

    await mongoClient.connect();
    db = mongoClient.db("MyWallet");

} catch (err) {

    console.log(err);

}

const users = db.collection("users");

const userRegister = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(3).required()
});

server.post("/register", async (req, res) => {

    const user = req.body;

    try {

        const validation = userRegister.validate(user, { abortEarly: false });
        if (validation.error) {
            const vlError = validation.error.details.map(
                (err) => err.message
            );
            return res.status(400).send(vlError);
        }

        const userValidate = await users.findOne({ email: user.email })
        if (userValidate) {
            return res.status(400).send({ message: "Email já cadastrado!" });
        }

        await users.insertOne(user);

        res.send("OK")

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }


})

server.post("/users", async (req, res) => {

    const { email } = req.body;

    const check = await users.findOne({ email: email });
    console.log(check);
    if (!check) {
        return res.status(404).send({ message: "User is not created" });
    }

    try {

        res.status(200).send(check)

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }

})

server.listen(5000, console.log("Server running at port: 5000"));
