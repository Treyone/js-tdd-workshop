/**
 * Created by form on 05/03/14.
 */
require(['objects'],function(webShop){

    var GenericProduct =new webShop.Product(),
        p = new GenericProduct();

    console.log(p.price);
})
