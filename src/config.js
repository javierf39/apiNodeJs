const confirg = {
    appConfig: {
        port: process.env.APP_PORT
    },
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    }
}

module.exports = confirg