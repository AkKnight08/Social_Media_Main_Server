const express=require('express');
const path=require('path');
const port=8000;
const app=express();

const db=require('./config/mongoose');
const Contact= require ('./models/cschema');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactlist = [
  {
    name: "Akshay",
    roll: 1,
  },
  {
    name: "Kumar",
    roll: 2,
  },
];


app.get('/',function(req,res)
{
    res.render('home',{title:"Welcome to Home", clist: contactlist});
});

app.get("/profile", function (req, res) {
  res.render('profile',{title:"Profile"});
});

app.post("/create",function(req,res)
{
  contactlist.push(
    {
      name:req.body.name,
      roll:req.body.roll
    }
  );
  return res.redirect('back');
});

app.get('/dc/',function(req,res)
{
  let roll= req.query.roll;
  let cind=contactlist.findIndex(i=>i.roll==roll)
  if(cind!=-1)
  {
    contactlist.splice(cind,1);
  }
  res.redirect('back');
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