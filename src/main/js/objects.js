/**
 * Created by form on 04/03/14.
 */

(function (WebShop) {
    'use strict';

    // Module systems magic dance.
    // thanks to domenic - https://github.com/domenic/sinon-chai

    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // NodeJS
        module.exports = WebShop();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(function () {
            return WebShop()
        });
    } else {
        // Other environment (usually <script> tag)
        window.WebShop=WebShop();
    }
})(function(){
    'use strict';
    /**
     * Produit non spécifié, n'a que les propriétés de base
     * @param [title]
     * @param [author]
     * @param [price]
     */
    function defaultProductConstructor(title,author,price){
        this.typeName='GenericProduct';
        this.title=title||'No title';
        this.author=author||'No author';
        this.price=price||0;
    }

    /**
     * Crée un produit non spécifié
     * @param [title]
     * @param [author]
     * @param [price]
     * @constructor
     */
    function GenericProduct(title,author,price){
        defaultProductConstructor.call(this,title,author,price);
    }

    /**
     * retourne un DVD
     * @param [title]
     * @param [author]
     * @param [price]
     * @param [actors]
     * @constructor
     */
    function Dvd(title,author,price,actors){
        defaultProductConstructor.call(this,title,author,price);
        this.typeName='Dvd';
        this.actors=actors||[];
        /**
         * Ajoute un acteur au DVD
         * @param actor
         */
        this.addActor = function(actor){
            if(!actor)throw new Error('actor required');
            this.actors.push(actor);
        };
    }
    Dvd.prototype = new GenericProduct();
    Dvd.prototype.constructor=Dvd;
    /**
     * Renvoie un nouveau livre
     * @param [title='No title']
     * @param [author='No author']
     * @param [price=0]
     * @param [pageNumber=0
     * @constructor
     */
    function Book(title,author,price,pageNumber){
        defaultProductConstructor.call(this,title,author,price);
        this.typeName='Book';
        this.pageNumber=pageNumber||0;
        /**
         * Add pages to the book.
         * @param [nb=1]
         */
        this.addPages = function(nb){
            nb=nb||1;
            this.pageNumber+=nb;
        };
    }
    Book.prototype=new GenericProduct();
    Book.prototype.constructor=Book;

    /**
     * Cart Singleton
     */
    var Cart = (function (){
        /**
         * Cart object constructor
         * @constructor
         */
        function InnerCart(){
            /**
             * Cart Line
             * @param product [Product}
             * @param quantity {number
             * @constructor
             */
            function Line(product,quantity){
                this.product=product;
                this.quantity=quantity;
                /**
                 * Calculate the price of this line (PU * quantity)
                 * @returns {number}
                 */
                this.total = function(){
                    return this.product.price * this.quantity;
                }
            }

            /**
             * All lines in this cart
             * @type {Array}
             */
            this.lines=[];
            /**
             * Add a product to the Cart
             * @param product {Product} Product to add
             * @param [quantity=1]
             */
            this.addProduct = function(product,quantity){
                if(!product){throw  new Error('product is required');}
                if(!(product instanceof GenericProduct)){throw new Error('I want a product !')}
                quantity = quantity||1;
                var line = new Line(product,quantity);
                this.lines.push(line);
            };
            /**
             * Calculates total price of the cart
             * @returns {number}
             */
            this.getTotal = function(){
                var somme=0;
                for(var i= 0,linesLength=this.lines.length;i<linesLength;i++){
                    somme+=this.lines[i].total();
                }
                return somme;
            };
        }
        var instance;
        return {
            getInstance : function(){
                if(!instance){
                    instance=new InnerCart();
                }
                return instance;
            }
        }
    })();

    /**
     * Product Factory
     * @param {string} [type] : Book, DVD
     * @returns {*}
     * @constructor
     */
    function Product(type){
        switch(type){
            case 'Book':{
                return Book;
            }
            case 'Dvd':{
                return Dvd;
            }
            default:{
                return GenericProduct;
            }
        }
    }

    /**
     * Exposed object
     */
    return{
        "Cart" : Cart.getInstance(),
        "Product" : Product
    };
})