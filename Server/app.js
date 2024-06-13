const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();
const PORT = 3000 || process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Client/views'));

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../Client/public')));

app.use(require('./route/route'));

app.get('/', (req, res) => {res.render('home')});

app.listen(PORT, async() => {
   try {
    console.log(`Server started on PORT: ${PORT}`);
   } catch (error) {
    console.log(error);
   }
})