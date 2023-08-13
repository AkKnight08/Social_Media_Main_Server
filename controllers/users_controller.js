module.exports.profile=function(req,res)
{
    return res.render('home',{
        title:'Profile'
    });
};
module.exports.post=function(req,res)
{
    return res.render('home',
    {
        title:'Post'
    })
}