var fs = require('fs');
// scope-safe basic flash card constructor:

var Product = function Product(id,name,dept,price,quantity) {

  if (this instanceof Product) {
    this.id = id;
    this.name  = name;
    this.dept = dept;
    this.price = price;
    this.quantity = quantity;

  } else {

    return new Product(id,name,dept,price,quantity);
  }

};
//getter for name
Product.prototype.getId= function(){
   return this.id;
};

//getter for name
Product.prototype.getName= function(){
   return this.name;
};

//getter for dept
Product.prototype.getDept= function(){
   return this.dept;
};

//getter for price
Product.prototype.getPrice= function(){
   return this.price;
};

//getter for quantity
Product.prototype.getQuantity= function(){
   return this.quantity;
};

 //var myproduct = Product(1,"Screw Driver","Tools",50,501);
 //console.log(myproduct.getName());

module.exports = Product;



