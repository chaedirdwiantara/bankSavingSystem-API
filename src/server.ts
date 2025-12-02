import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { testConnection } from './config/supabase';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// API Routes
app.use('/api', routes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Root - Get API information
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API information and available endpoints
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 endpoints:
 *                   type: object
 */
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Bank Saving System API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            documentation: '/api-docs',
            customers: '/api/customers',
            depositoTypes: '/api/deposito-types',
            accounts: '/api/accounts',
            transactions: '/api/transactions',
        },
    });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        // Test database connection
        console.log('🔄 Testing Supabase connection...');
        await testConnection();

        app.listen(PORT, () => {
            console.log(`\n🚀 Server running on port ${PORT}`);
            console.log(`📍 Local: http://localhost:${PORT}`);
            console.log(`📍 API: http://localhost:${PORT}/api`);
            console.log(`📍 Health: http://localhost:${PORT}/api/health`);
            console.log(`📚 API Docs: http://localhost:${PORT}/api-docs\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;
