
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'soundcast', user: req.user });
};