import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://Cluster35002:YlhGcVleTUpM@cluster35002.btn4x.mongodb.net/test?retryWrites=true&w=majority", {
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