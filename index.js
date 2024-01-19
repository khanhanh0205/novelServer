process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { UserRoute, AuthRoute, NovelRoute, CommentRoute, AdminRoute, SavedRoute } from './routers/index.js'
import config from "./utils/config.js"
dotenv.config()


const app = express();
const PORT = process.env.PORT || 8000;
const URI = config.MONGODB_URL;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

mongoose.connect(URI)
    .then(() => {
        console.log('Connected')

    }).catch(err => {
        console.log('err', err)
    })



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
})
app.get('/', (req, res) => {
    res.send('SUCCESS');
});
app.use('/api', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/novels', NovelRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/admin', AdminRoute)
app.use('/api/saved', SavedRoute)