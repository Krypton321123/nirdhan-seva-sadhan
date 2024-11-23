import mongoose from 'mongoose'

const connectMongo = async () => {
    try{
        console.log(`${String(process.env.MONGODB_URI)}`+`/`+`${String(process.env.DB_NAME)}`)
        const connectionInstance = await mongoose.connect(`${String(process.env.MONGODB_URI)}`+`/`+`${String(process.env.DB_NAME)}`);
        console.log(`MongoDB instance connected at ${connectionInstance.connection.host}`) 
    } catch (err) {
        console.log(err); 
        console.log("Connection Error in MONGODB")
        process.exit(1) 
    }
}

export { connectMongo }