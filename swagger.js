const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts'
    },
    host: 'localhost:3000/users',
    schemes: ['http']
};


const outputFile = './swagger_output.json';
const routes = ["./routes/user.js"];

swaggerAutogen(outputFile, routes, doc);