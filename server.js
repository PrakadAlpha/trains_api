const express = require('express');
require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDb = require('./config/db');
const auth = require('./routes/auth');
const sanitize = require('express-mongo-sanitize')
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const trains = require('./routes/trains');
const bookings = require('./routes/bookings');
const passengers = require('./routes/passengers');


const app = express();

dotenv.config({path:'./config/config.env'});

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

connectDb();

app.use(sanitize());

app.use(helmet());

app.use(xss());

app.use(hpp());

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/api/auth', auth);
app.use('/api/trains', trains);
app.use('/api/bookings', bookings);
app.use('/api/passengers', passengers);


if(process.env.NODE_ENV === 'production'){
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => console.log(`Server running in "${process.env.NODE_ENV}" mode on port "${PORT}"`.yellow.bold));

process.on('unhandledRejection', (err, promise) => {
  console.log('Error: '.red.bold, err.message);
  server.close(() => process.exit(1));
})