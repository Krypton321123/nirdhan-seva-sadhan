import dotenv from 'dotenv'
import app from './app.js'
import { connectMongo } from './db/connectMongo.js'; // just add the fucking .js in the import otherwise compiler goes shit

dotenv.config(); 

const start = async () => {
    try{
        await connectMongo(); 
        const displayURL = `http://localhost:${process.env.PORT}`
        app.listen(process.env.PORT, () => {
            console.log(`App listening on ${displayURL}`)
        })

    } catch(err) {
        console.log("Error starting the app" + err)
        process.exit(1)
    }
    
}


start()