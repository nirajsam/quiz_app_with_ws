const express = require('express');
const config = require('./config');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const resultRoute = require('./routes/resultRoutes');
const subQuesRoute = require('./routes/subQuesRoute');
const subAnsRoute = require('./routes/subAnsRoute');

const port = process.env.PORT || 5001;

dotenv.config();

// MongoDB connection
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch((error) => console.error('MongoDB connection error:', error));

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://nirajsam-quiz-app-ai.netlify.app', // React app domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies/credentials
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// Parse incoming JSON requests
app.use(bodyParser.json());

// API Routes
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/subQues', subQuesRoute);
app.use('/api/subAns', subAnsRoute);
app.use('/api/results', resultRoute);

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});
