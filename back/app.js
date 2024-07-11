const express = require('express');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const cors = require('cors');


const app = express();

connectDB();


app.use(cors());


app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/productos', require('./src/routes/producto'));







app.listen(4000, () => {
  console.log('Server is running on port 4000');
})