const express=require('express');
const path=require('path');
const port=8000;
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',function(req,res)
{
    res.render('home',{title:"Welcome to Home"});
});

app.get("/profile", function (req, res) {
  res.render('profile');
});

app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in Connecting to the Server');
        return;
    }
    else
    console.log('Server Connected Sucessfully to the Port: ',port);
})