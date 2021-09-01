const express = require('express');
const path = require('path');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cors());

const {authRouter} = require('./controllers/authController'); 
const {userRouter} = require('./controllers/userController'); 
const {gameRouter} = require('./controllers/gameController'); 

const {authMiddleware} = require('./middlewares/authMiddleware'); 

const staticPath = path.join(__dirname + '../../../dist/steam');


app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static(staticPath));

app.get('', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

app.use('/api/auth', authRouter);
app.use('/api/games', gameRouter);

app.use(authMiddleware);

app.use('/api/user', userRouter);






const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://alext:test1@cluster0.8zekx.mongodb.net/steam?retryWrites=true&w=majority', {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        app.listen(process.env.PORT || 8081);
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
}

start();
