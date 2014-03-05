/**
 * Created by form on 05/03/14.
 */
var WebCart = require('./objects'),
    webCart = new WebCart();

var GenericProduct =new webCart.Product(),
    p = new GenericProduct();

console.log(p.price);
