if(process.env.NODE_ENV!== 'production') {
    require('dotenv').config();
     
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require(`./routes/index`);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     // useUnifiedTopology: true
// }).then(() => {
//     console.log('MongoDB connected');
// }).catch(err => {
//     console.log('MongoDB connection error:', err);
// });

mongoose.connect(process.env.DATABASE_URL , {
    useNewUrlParser:true});
    mongoose.connection.on('error',(err)=> console.log('MongoDB connection error:', err));
mongoose.connection.once('open',()=> console.log('MongoDB connected'));
// mongoose.on('error',(err)=> console.log('MongoDB connection error:', err));

// mongoose.once('open',()=> console.log('MongoDB connected'));

app.use('/',indexRouter);

app.listen(process.env.PORT||3000);