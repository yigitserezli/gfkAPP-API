import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
        console.log("MongoDB bağlantısı başarılı");
    } catch (error) {
        console.log("MongoDB bağlantısı başarısız", error);
        process.exit(1);
    }
}

export default connectDB;