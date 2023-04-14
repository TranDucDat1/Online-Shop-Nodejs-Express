const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const { join } = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

dotenv.config({
    path: join(__dirname, '../.env'),
});

const ROUTE = require('./routes');
const PORT = process.env.PORT || 3000;

try {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Successfully connected to the mongo database!');
} catch (error) {
    console.log('Lỗi server');
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use(morgan('combined'));

app.get('/', (req, res) => {
    var a = 1;
    var b = 1;
    c = a + b;
    res.send(` ${c}ok`);
})

app.use('/app', ROUTE)


app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
}); 