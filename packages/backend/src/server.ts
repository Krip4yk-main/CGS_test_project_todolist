import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import AppRouter from './routes';

import connectDB from './config/database';
const app = express();

const router = new AppRouter(app);
connectDB();

app.set('port', process.env.PORT || 4200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());

router.init();

/*
import { AES, enc } from 'crypto-ts'
const qwe = AES.encrypt('Password1', 'test2@email.uaau.liame@2tset').toString();
console.log("qwe")
console.log(qwe)
const ewq = AES.decrypt(qwe, 'test2@email.uaau.liame@2tset').toString(enc.Utf8);
console.log("ewq")
console.log(ewq)
*/

const port = app.get('port');
const server = app.listen(port, () => console.warn(`Server started on port ${port}`));

export default server;
