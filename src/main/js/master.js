/**
 * Created by form on 05/03/14.
 */
require(['objects'],function(WebShop){
    var webShop = new WebShop();
    var GenericProduct =new webShop.Product(),
        p = new GenericProduct();

    console.log(p.price);
})
