const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts'
    },
    host: 'project1-ykh5.onrender.com/users',
    schemes: ['https', 'http']
};


const outputFile = './swagger_output.json';
const routes = ["./routes/user.js"];

swaggerAutogen(outputFile, routes, doc);