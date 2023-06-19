const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./mongodb/connect');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', require('./routes/postRoutes'));
app.use('/api/v1/dalle', require('./routes/dalleRoutes'));

app.get('/', async (req, res) => {
    res.send("This is DALL-E API");
})

try {
    connectDB(process.env.MONGODB_URL);
} catch (err) {
    console.log("mongodb Error ");
}

app.listen(8080, () => console.log('Server Started on port 8080'));