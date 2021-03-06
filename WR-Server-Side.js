var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7755); //Site address: http://flip3.engr.oregonstate.edu/7754
app.use(express.static('public')); //Allows files from the public folder to be accessed

app.get('/',function(req,res,next){
    res.render('home');
});

// Does get request and sends the database entries to home_ajax where keywords match either the product title or description.
app.get('/search', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM Products WHERE title REGEXP ? OR artist REGEXP ?', [req.query.name, req.query.name], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.send(context);
  });
});

//--------------------------------------START SELECT QUERIES--------------------------------------------

//Go to http://flip3.engr.oregonstate.edu/7753/vendors to see vendors.handlebars
app.get('/vendors',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM Vendors', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.render('vendors', context);
    });
  });

//Go to http://flip3.engr.oregonstate.edu/7753/products to see products.handlebars
app.get('/products',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM Products', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.render('products', context);
    });
  });

//Go to http://flip3.engr.oregonstate.edu/7753/sales_orders to see sales_orders.handlebars
app.get('/sales_orders',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM SalesOrders', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.render('sales_orders', context);
    });
  });

//Go to http://flip3.engr.oregonstate.edu/7753/purchase_orders to see purchase_orders.handlebars
app.get('/purchase_orders',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM PurchaseOrders', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.render('purchase_orders', context);
    });
  });

  //Go to http://flip3.engr.oregonstate.edu/7753/purchase_orders to see purchase_orders_products.handlebars
  app.get('/purchase_orders_products',function(req,res,next){
    var context = {};
    mysql.pool.query('SELECT * FROM PurchaseOrders_Products', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows
      res.render('purchase_orders_products', context);
      });
    });


//Go to http://flip3.engr.oregonstate.edu/7753/customers to see customers.handlebars
app.get('/customers',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM Customers', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.render('customers', context);
    });
  });

//Go to http://flip3.engr.oregonstate.edu/7753/product?pid=x to see the product page for product with pid x
//Click on a product search result automatically links to this page
app.get('/product',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM Products WHERE pid=?', [req.query.pid], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
  res.render('product', context);
  });
});

//Go to http://flip3.engr.oregonstate.edu/7753/cart to see cart.handlebars
//cart comes from SalesOrders_Products table
app.get('/cart',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM SalesOrders_Products', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.render('cart', context);
    });
  });

app.get('/customers_salesorders',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT Customers.cid, Customers.f_name, Customers.l_name, SalesOrders.date, SalesOrders.cost FROM Customers LEFT JOIN SalesOrders ON Customers.cid = SalesOrders.cid', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.render('customers_salesorders', context);
    });
  });

//select query for individual cart
app.get('/cart_individual',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM SalesOrders_Products WHERE cid=? AND purchased=0', [req.query.cid], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows
    res.render('cart_individual', context);
    });
  });

//--------------------------------------END SELECT QUERIES--------------------------------------------

//--------------------------------------START INSERT QUERIES------------------------------------------

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

app.get('/purchase_orders_products_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO PurchaseOrders_Products( `vid`,`date`,`pid`, `quantity`) VALUES (?,?,?,?)", 
  [req.query.vid, req.query.date, req.query.pid, req.query.quantity], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query
    context.results = result
    res.send(context)
  });
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

app.get('/sales_orders_products_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO SalesOrders_Products( `cid`, `date`, `pid`, `quantity`, `purchased`) VALUES (?,?,?,?,?)", 
  [req.query.cid, req.query.date, req.query.pid, req.query.quantity, req.query.purchased], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query
    context.results = result
    res.send(context)
  });
});

//--------------------------------------END INSERT QUERIES--------------------------------------------

//--------------------------------------START UPDATE QUERIES------------------------------------------
app.get('/customers_update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE Customers SET `f_name`=?, `l_name`=?, `email`=? WHERE cid=?", 
  [req.query.f_name, req.query.l_name, req.query.email, req.query.cid], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result
    res.send(context)
  });
});
//--------------------------------------END UPDATE QUERIES------------------------------------------

//--------------------------------------START DELETE QUERIES------------------------------------------
app.get('/vendors_delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM Vendors WHERE vid=?", 
  [req.query.vid], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result
    res.send(context)
  });
});

app.get('/products_delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM Products WHERE pid=?", 
  [req.query.pid], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result
    res.send(context)
  });
});

app.get('/customers_delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM Customers WHERE cid=?", 
  [req.query.cid], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result
    res.send(context)
  });
});

app.get('/cart_delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM SalesOrders_Products WHERE cid=? AND pid=?", 
  [req.query.cid,req.query.pid], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result
    res.send(context)
  });
});
//--------------------------------------END DELETE QUERIES------------------------------------------

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
