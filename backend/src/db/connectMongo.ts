import mongo from 'mongoose'

const connectMongo = async () => {
    try{
        const connectionInstance = await mongo.connect(`${process.env.MONGODB_URI}`+`/`+`${process.env.DB_NAME}`);
        console.log(`MongoDB instance connected at ${connectionInstance.connection.host}`) 
    } catch (err) {
        console.log("Connection Error in MONGODB")
        process.exit(1) 
    }
}

export { connectMongo }