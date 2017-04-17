var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'kuttu040109',
  database : 'bamazon'
});
 
//OPEN A CONNECTION - A self executing anonymous function

(function(){
    connection.connect(function(err){
    if(err)
    throw  err;
    //console.log("Connected as id: "+ connection.threadId);
    });
})();

//INSERT NEW PRODUCT 
var addNewProduct = function(pname,depname,unitprice,quantity){
    var newProduct = {item_id:null,productname:pname, departmentName:depname,price:unitprice,stock_quantity:quantity};
    var query = connection.query('INSERT INTO products SET ?', newProduct, function (error, results, fields) {
    if (error) throw error;
   // console.log("Product " + results +" added");
    });
};
//addNewProduct("Diapers","Nursery",5,501);

//GET ALL PRODUCTS
var getAllProducts = function(){
return new Promise( function (resolve, reject) {
    var query = 'select * from products';
    connection.query(query, function (error, results, fields) {
    if (error) throw error;
    //console.log('READING ', JSON.stringify(results,null,2));
    resolve({'products': results});
    });
  });
};
//invoke the getAllProducts
//  getAllProducts().then(function(resultObj){
//                     //console.log(JSON.stringify(resultObj,null,3));                    
//                    })
//                    .catch(function(err){
//                     console.log(err);
//                    });


//GET THE PRODUCT BY ID
var getProductByID = function(item_id){
  return new Promise( function (resolve, reject) {
    var query = 'select * from products where item_id=?';
    connection.query(query,[item_id], function (error, results, fields) {
    if (error) throw error;
    //console.log('READING ', JSON.stringify(results,null,2));
    resolve({'singleproduct': results});
    });
  });
};

//invoke the getAllProducts
//  getProductByID(12).then(function(resultObj){
//                     console.log(resultObj);                    
//                    })
//                    .catch(function(err){
//                     console.log(err);
//                    });

//GET ALL PRODUCTS WITH LOW INVENTORY COUNT i.e. < 5
var getLowCountProducts = function(){
return new Promise( function (resolve, reject) {
    var query = 'select * from products where stock_quantity < 5';
    connection.query(query, function (error, results, fields) {
    if (error) throw error;
    //console.log('READING ', JSON.stringify(results,null,2));
    resolve({'lowcountproducts': results});
    });
  });
};

//  getLowCountProducts().then(function(resultObj){
//                     console.log(JSON.stringify(resultObj,null,3));                    
//                    })
//                    .catch(function(err){
//                     console.log(err);
//                    });


//UPDATE PRODUCT NAME
var updateProductName = function(newname,item_id){
connection.query('UPDATE products SET productname= ? WHERE item_id= ?', [newname,item_id], function (error, results, fields) {
  if (error) throw error;
  console.log("updated product name for item_id: "+ item_id);
});
};
// updateProductName("Samsung 4k TV",12);

//UPDATE PRODUCT stock_quantity
var updateProductQuantity = function(quantity,item_id){
connection.query('UPDATE products SET stock_quantity= ? WHERE item_id= ?', [quantity,item_id], function (error, results, fields) {
  if (error) throw error;
  //console.log("Updated quantity for item_id: "+ item_id+ " successfully!");
});
};
// updateProductQuantity("1000",12);

//UPDATE PRODUCT price
var updateProductPrice = function(price,item_id){
connection.query('UPDATE products SET price= ? WHERE item_id= ?', [price,item_id], function (error, results, fields) {
  if (error) throw error;
  console.log("updated product price for item_id: "+ item_id);
});
};
// updateProductPrice (2000,12);

//UPDATE PRODUCT departmentname
var updateProductDept = function(depname,item_id){
connection.query('UPDATE products SET departmentName= ? WHERE item_id= ?', [depname,item_id], function (error, results, fields) {
  if (error) throw error;
   console.log("updated product dept for item_id: "+ item_id);
});
};
// updateProductDept("Consumer Electronics",12);

// //UPDATE ITEM's top_bid
// var updateTopBid = function(name,top_bid){
// connection.query('UPDATE items SET top_bid= ? WHERE name ?', [top_bid,name], function (error, results, fields) {
//   if (error) throw error;
//   console.log("updated top_bid of item");
// });
// };

//CLOSE THE CONNECTION
var closeConnection = function(){
    connection.end();
};

module.exports = {
    closeConnection:closeConnection,
    addNewProduct:addNewProduct,
    getAllProducts:getAllProducts,
    getProductByID:getProductByID,
    updateProductName:updateProductName,
    updateProductQuantity:updateProductQuantity,
    updateProductPrice:updateProductPrice,
    updateProductDept:updateProductDept,
    getLowCountProducts:getLowCountProducts
};