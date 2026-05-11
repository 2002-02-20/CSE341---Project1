const express = require('express');

const mongoodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongoodb.initDb((err) => {
    if (err) {
        console.log('Unable to connect to MongoDB');
    }
    else {
        app.listen(port, () => { console.log(`Server is running on port ${port}`) });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});