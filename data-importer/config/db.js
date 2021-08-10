const config = require('config');
const { Client } = require('pg')

const connectDB = async () => {
    try {
        const postgres  = config.get('postgres');

        const client = new Client({...postgres})
          
        await client.connect();

        console.log("Connected to postgres database");

        return client;
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = connectDB;