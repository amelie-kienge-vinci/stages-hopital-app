import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Stages Hopital API',
            version: '1.0.0',
            description: 'API REST pour gérer les demandes de stages dans un hôpital',
        },
        servers: [{ url: process.env.BASE_URL || 'http://localhost:3000' }],
    },
   
    apis: ['./src/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

export default function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
