var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7754); //Site address: http://flip3.engr.oregonstate.edu/7754
app.use(express.static('public')); //Allows files from the public folder to be accessed

app.get('/',function(req,res,next){
    res.render('home');
});

// Does get request and sends the database entries to home_ajax where keywords match either the product title or description.
app.get('/search', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM Products WHERE name REGEXP ? OR description REGEXP ?', [req.query.name, req.query.name], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.send(context);
  });
});

//Go to http://flip3.engr.oregonstate.edu/7754/vendors to see vendors.handlebars
app.get('/vendors',function(req,res,next){
      res.render('vendors');
});

app.get('/vendors_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Vendors( `company`, `email`, `phone`) VALUES (?,?,?)", 
  [req.query.company, req.query.email, req.query.phone], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query
    context.results = result
    res.send(context)
  });
});

//Go to http://flip3.engr.oregonstate.edu/7754/products to see products.handlebars
app.get('/products',function(req,res,next){
  res.render('products');
});

app.get('/products_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Products( `vid`, `title`, `artist`, `genre`, `year`, `stock`, `price`,`link`) VALUES (?,?,?,?,?,?,?,?)", 
  [req.query.vid, req.query.title, req.query.artist,req.query.genre,req.query.year,req.query.stock,req.query.price,req.query.link], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query
    context.results = result
    res.send(context)
  });
});

//Go to http://flip3.engr.oregonstate.edu/7754/sales_orders to see sales_orders.handlebars
app.get('/sales_orders',function(req,res,next){
  res.render('sales_orders');
});

app.get('/sales_orders_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO SalesOrders( `cid`,`date`,`cost`) VALUES (?,?,?)", 
  [req.query.cid, req.query.date, req.query.cost], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query
    context.results = result
    res.send(context)
  });
});

//Go to http://flip3.engr.oregonstate.edu/7754/purchase_orders to see purchase_orders.handlebars
app.get('/purchase_orders',function(req,res,next){
  res.render('purchase_orders');
});

app.get('/purchase_orders_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO PurchaseOrders( `vid`,`date`,`cost`) VALUES (?,?,?)", 
  [req.query.vid, req.query.date, req.query.cost], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query
    context.results = result
    res.send(context)
  });
});

//Go to http://flip3.engr.oregonstate.edu/7754/customers to see customers.handlebars
app.get('/customers',function(req,res,next){
  res.render('customers');
});

app.get('/customers_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Customers( `f_name`, `l_name`, `email`) VALUES (?,?,?)", 
  [req.query.f_name, req.query.l_name, req.query.email], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query
    context.results = result
    res.send(context)
  });
});

app.get('/products_table',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Products( `price`, `stock`, `description`, `image`, `cart`) VALUES (?,?,?,?,?,?)", 
  [req.query.name, req.query.price, req.query.stock, req.query.description, req.query.image, req.query.cart], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query
    context.results = result
    res.send(context)
  });
});

//Go to http://flip3.engr.oregonstate.edu/7754/product?id=x to see the product page for product with id x
//Click on a product search result automatically links to this page
app.get('/product',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM products WHERE id=?', [req.query.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
  res.render('product', context);
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu/' + app.get('port') + '; press Ctrl-C to terminate.');
});
