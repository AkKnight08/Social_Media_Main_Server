module.exports.profile=function(req,res)
{
    return res.render('user',{
        title:'Profile'
    });
};
module.exports.post=function(req,res)
{
    return res.render('user',
    {
        title:'Post'
    })
}