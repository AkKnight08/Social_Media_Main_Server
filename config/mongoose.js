const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/clist2',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error Connection to DB'));

db.once ('open',function()
{
    console.log('Database Connected');
});