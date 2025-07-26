import mongoose from 'mongoose'
import { app } from '../server/server.js';

const PORT = process.env.PORT || 8000;;
export const ServerConnection = async () => {
    try {
        const MDB_URL = process.env.MONGODB_URL;
        const server =   app.listen(PORT, () => {
                    console.log(`Server Listening at the port ${PORT}`);
                })
        mongoose
            .connect(MDB_URL).then(() => {
                server;
            })
    } catch (error) {
        console.log(`${error} did not connect. `);
    }
}