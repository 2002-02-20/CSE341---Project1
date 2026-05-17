const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');


const mongoodb = require('./data/database');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes'));

const port = process.env.PORT || 3000;

mongoodb.initDb((err) => {
    if (err) {
        console.log('Unable to connect to MongoDB');
    }
    else {
        app.listen(port, () => { console.log(`Server is running on port ${port}`) });
    }
});