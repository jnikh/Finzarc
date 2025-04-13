require('dotenv').config();

module.exports ={
    PORT : process.env.PORT || 3000,
    MONGODB_URL : process.env.MONGO_URI || 'mongodb+srv://root:root@book-store.xgtdd.mongodb.net/?retryWrites=true&w=majority&appName=Book-Store',
    JWT_SECRET: process.env.JWT_SECRET ,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h'
}