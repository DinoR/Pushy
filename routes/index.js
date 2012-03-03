
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.foo = function(req, res){
  res.render('index', { title: req.params.bar })
};