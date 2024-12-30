import dotenv from 'dotenv'
import app from './app.js'
import { connectMongo } from './db/connectMongo.js'; // just add the fucking .js in the import otherwise compiler goes shit
import https from 'https'
import fs from 'fs'

dotenv.config();

const start = async () => {
    try {
        await connectMongo();


        const options = {
            key: fs.readFileSync('/etc/letsencrypt/live/api.nirdhansewasansthan.com/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/api.nirdhansewasansthan.com/fullchain.pem')
        };

        const port = parseInt(process.env.PORT as any) || 8000;


        const displayURL = `https://api.nirdhansewasansthan.com:${port}`;
        https.createServer(options, app).listen(port, '0.0.0.0', () => {
            console.log(`App listening on ${displayURL}`);
        });

    } catch (err) {
        console.log("Error starting the app" + err);
        process.exit(1);
    }
};

start()