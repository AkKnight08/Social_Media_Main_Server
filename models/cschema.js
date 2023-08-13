const mongoose=require('mongoose');
const cscheme= new mongoose.Schema(
    {
        name:
        {
            type:String,
            required: true
        },
        roll:
        {
            type:String,
            required:true
        }
    }
);
const Contact=mongoose.model('Contact',cscheme);
module.exports=Contact;