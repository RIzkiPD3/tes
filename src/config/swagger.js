// src/config/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TodoApp API",
      version: "1.0.0",
      description: "API Documentation for TodoApp (Users, Categories, Tasks, Reminders)"
    },
    servers: [
      {
        url: "http://localhost:3000/api"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/routes/*.ts", "./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
