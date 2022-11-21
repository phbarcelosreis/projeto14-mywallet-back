import express from "express"
import cors from "cors"
import router from "./routers/users.routes.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);


/* 
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

}) */

server.listen(5000, console.log("Server running at port: 5000"));
