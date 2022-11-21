import { balanceCollection } from "../database/db.js";


export async function entry(req, res) {
    const dados = req.body;
    c


    try {

        const find = await balanceCollection.findOne({email: dados.email});
        await balanceCollection.insertOne({...find, value:dados.value, description: dados.description});
        res.send("OK")

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }
}