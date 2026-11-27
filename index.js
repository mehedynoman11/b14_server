import express from 'express'
import dotenv from 'dotenv/config'
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors'


const app = express()
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000;
const date = new Date();

const client = new MongoClient(process.env.MONGODB_URL);
export const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log("MongoDB connected successfully!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}
const connectToClient = await connectToMongoDB();
const db = connectToClient.db("b14_client");
const user = db.collection("users");

app.get('/', (req, res) => {
    res.send({ msg: `Pizza Hub is running at ${date.toTimeString()}` })
})

app.listen(port, () => {
    console.log(`Pizza Hub listening on port ${port} at ${date.toTimeString()}`)
})

export default app;