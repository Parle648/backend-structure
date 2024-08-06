const requiredEnvVars = [
    'DATABASE_PORT',
    'DATABASE_HOST',
    'DATABASE_NAME',
    'DATABASE_USER',
    'DATABASE_ACCESS_KEY',
    'JWT_SECRET'
];

const validateEnv = () => {
    const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

    if (missingVars.length > 0) {
        console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
        process.exit(1);
    }
};

module.exports = validateEnv;