const dotenv = require('dotenv');
dotenv.config();

const { appConfig } = require('./config');
const app = require('./app');

app.listen(appConfig.port, () => {
    console.log("conectado a puerto 3000");
});