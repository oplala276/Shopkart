import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-t7ozh6e-shard-00-00.awh4tvw.mongodb.net:27017,ac-t7ozh6e-shard-00-01.awh4tvw.mongodb.net:27017,ac-t7ozh6e-shard-00-02.awh4tvw.mongodb.net:27017/?ssl=true&replicaSet=atlas-r0znc7-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch (error) {
        console.log('Error: ', error.message);
    }
};

export default Connection;