
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'radiome', user: req.user });
};