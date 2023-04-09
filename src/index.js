const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

const user = require('./routes/user.route');


app.use(morgan('combined'));

app.get('/', (req, res) => {
    var a = 1;
    var b = 1;
    c = a + b;
    res.send(` ${c}ok`);
})

app.use('/user', user)


app.listen(port, () => {
    console.log(`App listening on ${port}`);
});