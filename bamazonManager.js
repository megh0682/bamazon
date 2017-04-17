var inquirer = require('inquirer');
var db = require('./db.js');
var Product = require('./product.js');
var fs = require('fs');

/**
 * This is a manager's view where a manager will be able to perform below actions
 * 1) view products for sale
 * 2) view low inventory
 * 3) add to inventory
 * 4) add new product
 * * */

//Display all products using promises
 var displayProducts = [];

//Customer array of products in the shopping cart
 var lowInventoryProducts = [];

 //Invoke customer view
managerview(); 

//allProductsView function to display list of products to manager

function allProductsView(){
    db.getAllProducts().then(function(data){
                        //console.log(JSON.stringify(data,null,3));          
                        //console.log(data["products"]);
                        var products = data["products"];
                        products.forEach(function(element,index,array){
                        // console.log("ID: " + element.item_id + " Name: "+ element.productname +" Price: "+ element.price);
                        var myproduct = Product(element.item_id,element.productname,element.departmentName,element.price,element.stock_quantity);
                        var myproductstr = "Product ID: "+ myproduct.getId() + " Product Name : "+myproduct.getName()+" Product Price: "+myproduct.getPrice();
                        myproductstr = myproductstr + " Product Quantity: "+myproduct.getQuantity()+" Product Department: "+myproduct.getDept();
                        displayProducts.push(myproductstr);
                        });  
                        //console.log(displayProducts);
                        inquirer.prompt([
                            {
                            type: "list",
                            name: "action",
                            message: "*********INVENTORY PRODUCT SNAPSHOT************",
                            choices:displayProducts
                            }                          
                            ]).then(function(answers){
                            //console.log(answers.action);
                            resetProductView();
                            })

    })
    .catch(function(err){
        console.log(err);
    });

 };//allProductsView function ends

 //lowCountProductsView function
function lowCountProductsView(){
    db.getLowCountProducts().then(function(data){
        //console.log(JSON.stringify(data,null,3));          
       // console.log(data["lowcountproducts"]);
        var products = data["lowcountproducts"];
        products.forEach(function(element,index,array){
            // console.log("ID: " + element.item_id + " Name: "+ element.productname +" Price: "+ element.price);
            var myproduct = Product(element.item_id,element.productname,element.departmentName,element.price,element.stock_quantity);
            var myproductstr = "Product ID: "+ myproduct.getId() + " Product Name : "+myproduct.getName()+" Product Price: "+myproduct.getPrice();
            myproductstr = myproductstr + " Product Quantity: "+myproduct.getQuantity()+" Product Department: "+myproduct.getDept();
            lowInventoryProducts.push(myproductstr);
        });  
        //console.log(displayProducts);
        inquirer.prompt([
            {
            type: "list",
            name: "action",
            message: "********* PRODUCT SNAPSHOT OF LOW INVENTORY ************",
            choices:lowInventoryProducts
            }                          
            ]).then(function(answers){
            //console.log(answers.action);
            resetProductView();
            })

    })
    .catch(function(err){
        console.log(err);
    });  

};//lowCountProductsView function ends

//addToInventory function here
function addToInventory(){
   inquirer.prompt([
    {
      name:"id",
      message:"Which product is being replenished? (Please enter the product id)",
      type:"input"
    },
     {
      name:"count",
      message:"What many of these products are being added to the inventory?",
      type:"input"
    }
   ]).then(function(answers){
      var id = answers.id;
      var count = answers.count;
      db.getProductByID(id).then(function(data){
        //console.log(data["singleproduct"]);    
        //var shoppingCartObj = {};
        var singleproduct = data["singleproduct"];
        var myproduct = Product(singleproduct[0].item_id,singleproduct[0].productname,singleproduct[0].productDepartment,singleproduct[0].price,singleproduct[0].stock_quantity);                
        var newproductcount = parseInt(myproduct.getQuantity()) + parseInt(count);
        updateproductcount(id,newproductcount);
        console.log("Product with id - "+id+ " updated successfully!");
        })
        .catch(function(err){
            console.log(err);
        });
      resetProductView();        
    });

};//End of addToInventory function

//updateproductcount
function updateproductcount(id,newproductcount){
    db.updateProductQuantity(newproductcount,id);
};

//addProduct function here
function addProduct(){
   inquirer.prompt([
    {
      name:"name",
      message:"What is the name of the product?",
      type:"input"
    },
     {
      name:"price",
      message:"What is the price for each product unit?",
      type:"input"
    },
     {
      name:"quantity",
      message:"How many units are being added?",
      type:"input"
    },
     {
      name:"dept",
      message:"Which department the product is being added?",
      type:"input"
    }
   ]).then(function(answers){
      var name = answers.name;
      var price = answers.price;
      var quantity = answers.quantity;
      var dept = answers.dept;
      db.addNewProduct(name,dept,price,quantity);
      resetProductView();
   });

};//End of addToInventory function

//restart the customer view of the products

function resetProductView(){
  
        inquirer.prompt([
        {
            type: "rawlist",
            name: "action",
            message: "What would you like to do next?",
            choices:["I want to sign out", "I want view manager options again"]
        }

    ]).then(function(answers){
        if(answers.action === "I want to sign out"){
            console.log("Good Bye, see you again!");
        }else if(answers.action === "I want view manager options again"){
            console.log("I am inside");
            managerview();
        }
    });

};

//manager view to display all manager's functions
function managerview(){
    inquirer.prompt([
                {
                    type: "rawlist",
                    name: "action",
                    message: "What activity would you like to review?",
                    choices:["view products for sale", "view low inventory","add to inventory", "add new product"]
                }

            ]).then(function(answers){
                if(answers.action === "view products for sale"){
                    allProductsView();
                }else if (answers.action === "view low inventory"){
                    lowCountProductsView();
                }else if (answers.action === "add to inventory"){
                    addToInventory();
                }else if (answers.action === "add new product"){
                    addProduct();
                }
            });
}//managerview function ends
    
                                       
                                       