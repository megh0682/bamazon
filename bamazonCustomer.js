var inquirer = require('inquirer');
var db = require('./db.js');
var Product = require('./product.js');
var fs = require('fs');

/**
 * User will presented will be presented 
 * with all the product name with user prompt to enter 
 * the product id and the quantity which they want to buy. 
 * If product exists with that quantity then user will be shown 
 * the total cost for the product purchased as product price * quantity
 * else they will be shown a message Insufficient Quantity
 * * */

//Display all products using promises
 var displayProducts = [];

//Customer array of products in the shopping cart
 var myShoppingCart = [];

 //Invoke customer view
customerview(); 

//customerview function to display list of products to customers for purchase

function customerview(){
    db.getAllProducts().then(function(data){
                        //console.log(JSON.stringify(data,null,3));          
                        //console.log(data["products"]);
                        var products = data["products"];
                        products.forEach(function(element,index,array){
                        // console.log("ID: " + element.item_id + " Name: "+ element.productname +" Price: "+ element.price);
                        var myproduct = Product(element.item_id,element.productname,element.departmentName,element.price,element.stock_quantity);
                        var myproductstr = "Product ID: "+ myproduct.getId() + " Product Name : "+myproduct.getName()+" Product Price: "+myproduct.getPrice();
                        displayProducts.push(myproductstr);
                        });  
                        //console.log(displayProducts);
                        inquirer.prompt([
                            {
                            type: "list",
                            name: "action",
                            message: "Below are the available products for sale.Please select the product you want to buy.",
                            choices:displayProducts
                            }                          
                            ]).then(function(answers){
                            console.log(answers.action);
                            inquirer.prompt([
                                {
                                    type: "input",
                                    name: "name",
                                    message: "enter the name of the product you want to purchase..."                                
                                },
                                {
                                    type: "input",
                                    name: "id",
                                    message: "enter the id of the product you want to purchase..."                                
                                },
                                {
                                    type: "input",
                                    name: "quantity",
                                    message: "enter the quantity of the product you want to purchase..."                                
                                }
                                
                            ]).then(function(answers){
                                var totalcost =0;
                                var productname = answers.name;
                                var id = answers.id;
                                var quantity = answers.quantity;
                                //check if product requirement can be met or not
                                db.getProductByID(id).then(function(data){
                                    //console.log(data["singleproduct"]);    
                                    //var shoppingCartObj = {};
                                    var singleproduct = data["singleproduct"];
                                    var myproduct = Product(singleproduct[0].item_id,singleproduct[0].productname,singleproduct[0].productDepartment,singleproduct[0].price,singleproduct[0].stock_quantity);                
                                    if(myproduct.getQuantity() >= quantity){
                                        totalcost = parseFloat(myproduct.getPrice()) * parseInt(quantity);
                                    //create a shopping cart object and push it to shopping cart array
                                        var shoppingCartObj = {
                                            "product name" : myproduct.getName(),
                                            "quantity purchased": quantity,
                                            "amount" : totalcost
                                        };
                                        //var str = JSON.stringify(shoppingCartObj);
                                        myShoppingCart.push(shoppingCartObj);
                                        var newproductcount = parseInt(myproduct.getQuantity()) - parseInt(quantity);
                                        updateproductcount(id,newproductcount);
                                        userresponse(true,totalcost);

                                    }else{
                                        userresponse(false,0);
                                    }
                                })
                                .catch(function(err){
                                    console.log(err);
                                });
                            })
                            })

    })
    .catch(function(err){
        console.log(err);
    });

 };

//updateproductcount
function updateproductcount(id,newproductcount){
    db.updateProductQuantity(newproductcount,id);
};

//userresponse function
function userresponse(isproductavailable,totalcost){
    if(isproductavailable){
        var totalAmount = 0;
        console.log("******************************BILL COPY************************************");
        console.log(myShoppingCart);
        console.log("***************************************************************************");
        //Get the total
        myShoppingCart.forEach(function(element){
          totalAmount = totalAmount + element.amount;
        });
        console.log("Your total bill amount is $"+ parseFloat(totalAmount)+" Thank you for your business!");
        resetProductView();
    }else{
        console.log("Sorry, insufficient quantity to process your order.Select another product...");
        resetProductView();
    }
};

//restart the customer view of the products

function resetProductView(){
  
  inquirer.prompt([
      {
          type: "rawlist",
          name: "action",
          message: "What would you like to do next?",
          choices:["I want to checkout", "I want to continue shopping"]
     }

  ]).then(function(answers){
      if(answers.action === "I want to checkout"){
        console.log("Good Bye, hope to see you again!");
      }else if (answers.action === "I want to continue shopping"){
        customerview();
      }
  });

};


    
                                       
                                       