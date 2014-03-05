/* global returnTrue */
describe('Test Suite', function () {
    'use strict';

    it('Should return true', function () {
        expect(returnTrue()).to.be.true;
    });

    it('Should NOT return false', function () {
        expect(returnTrue()).not.to.be.false;
    });


});

describe('Compare ',function(){
    it('should behave like ==',function(){
        expect(compare('','0')).to.be.false;
        expect(compare(0,'')).to.be.true;
        expect(compare(0,'0')).to.be.true;
        expect(compare(false,'false')).to.be.false;
        expect(compare(false,'0')).to.be.true;
        expect(compare(false,undefined)).to.be.false;
        expect(compare(false,null)).to.be.false;
        expect(compare(null,undefined)).to.be.true;
        expect(compare(' \t\r\n',0)).to.be.true;
    });

});

describe('Extraction de nom de domaine',function(){
    'use strict';
    it('Should work on basic domains',function(){
        expect(extractDomaine('pipo@domaine.com')).to.equal('domaine.com');
    });
    it('should accept IPs',function(){
        expect(extractDomaine('pipo@123.123.123.123')).to.equal('123.123.123.123');
    });
    it('should accept localhost',function(){
        expect(extractDomaine('pipo@localhost')).to.equal('localhost');
    });
    it('should return null if no domain',function(){
        expect(extractDomaine('toto')).to.be.null;
    });
});

describe('Factorielle',function(){
    'use strict';
    it('should be right :)',function(){
        expect(factorielle(5)).to.equal(120);
    });
    it('should return 1 for arg 0',function(){
        expect(factorielle(0)).to.equal(1);
    });
    it('should handle extreme cases',function(){
        expect(factorielle(300)).to.equal(Number.POSITIVE_INFINITY);
    });
    it('should return null with no arg',function(){
        expect(factorielle()).to.be.null;
    });
    it('should return null if arg is no a number',function(){
        expect(factorielle('yo')).to.be.null;
    });
});

describe('Web Shop',function(){
    'use strict';
    describe('Generic Product',function(){
        var product,
            genericProduct=WebShop.Product();

        beforeEach(function(){
            product =new genericProduct('Shining','Stanley Kubrick',753);
        });
        afterEach(function(){
            product =undefined;
        });
        it('should have a title',function(){
            expect(product).to.have.ownProperty('title');
        });
        it('should have an author',function(){
            expect(product).to.have.ownProperty('author');
        });
        it('should have a price',function(){
            expect(product).to.have.ownProperty('price');
        });
        it('should have a default title',function(){
            var product =new genericProduct();
            expect(product.title).to.equal('No title');
        });
        it('should have a default author',function(){
            var product =new genericProduct();
            expect(product.author).to.equal('No author');
        });

        it('should have a default price',function(){
            var product =new genericProduct();
            expect(product.price).to.equal(0);
        });

    });
    describe('Book',function(){
        var book,Book= WebShop.Product('Book');
        beforeEach(function(){
            book = new Book()
        });
        afterEach(function(){
            book=undefined;
        });
        it('should have a title',function(){
            expect(book).to.have.property('title');
        });
        it('should have an author',function(){
            expect(book).to.have.property('author');
        });
        it('should have a price',function(){
            expect(book).to.have.property('price');
        });
        it('should be a book',function(){
            expect(book).to.be.an.instanceof(Book);
        });
        it('should have a page Number',function(){
            expect(book).to.have.ownProperty('pageNumber');
        });
        it('should have a default page Number value',function(){
            expect(book.pageNumber).to.equal(0);
        });
        it('should take page number from constructor',function(){
            var book =new Book('Shining','Stanley Kubrick',753,1);
            expect(book.pageNumber).to.equal(1);
        });
        it('should accept addPage',function(){
            var book =new Book('Shining','Stanley Kubrick',753,0);
            book.addPages(5);
            expect(book.pageNumber).to.equal(5);
        });
        it('should accept addPage with default value :1',function(){
            var book =new Book('Shining','Stanley Kubrick',753,0);
            book.addPages();
            expect(book.pageNumber).to.equal(1);
        });


    });
    describe('DVD',function(){
        var dvd,
            Dvd = WebShop.Product('Dvd');
        beforeEach(function(){
            dvd =new Dvd('Shining','Stanley Kubrick',753);
        });
        afterEach(function(){
            dvd = undefined;
        });
        it('should have a title',function(){
            expect(dvd).to.have.property('title');
        });
        it('should have the correct title',function(){
            expect(dvd.title).to.equal('Shining');
        });
        it('should have an author',function(){
            expect(dvd).to.have.property('title');
        });
        it('should have a price',function(){
            expect(dvd).to.have.property('title');
        });
        it('should have actors',function(){
            expect(dvd).to.have.ownProperty('actors');
        });
        it('should take actors from constructor',function(){
            dvd =new Dvd('Shining','Stanley Kubrick',753,['Bozo']);
            expect(dvd.actors).to.have.length(1);
        });
        it('should accept addActors',function(){
            dvd.addActor('Bozo');
            expect(dvd.actors).to.have.length(1);
        });
        it('should require a name in addActor',function(){
            expect(function(){dvd.addActor()}).to.throw(Error,'actor required');
        });

    });
    /*
     describe('Line',function(){
     var line;
     beforeEach(function(){
     line=new Line(new Product,1);
     });
     afterEach(function(){
     line=undefined;
     });
     it('should have a quantity',function(){
     expect(line).to.have.ownProperty('quantity');
     expect(line.quantity).to.be.a('number');
     });
     it('should have a product',function(){
     expect(line).to.have.ownProperty('product');
     expect(line.product).to.be.an.instanceOf(Product);
     });

     });
     */

    describe('Cart',function(){
        var cart,
            Dvd =new WebShop.Product('Dvd'),
            Book =new WebShop.Product('Book'),
            GenericProduct=new WebShop.Product();

        beforeEach(function(){
            cart=WebShop.Cart;
        });
        afterEach(function(){
            cart=undefined;
        });
        it('should have property lines',function(){
            expect(cart).to.have.ownProperty('lines');
            expect(cart.lines).to.be.a('Array');
        });
        it('should be able to add products',function(){
            cart.addProduct(new GenericProduct(),1);
            expect(cart.lines).to.have.length(1);
        });
        it('should require a product in addProduct',function(){
            expect(function(){cart.addProduct()}).to.throw(Error,'product is required');
        });
        it('should expect a product',function(){
            expect(function(){
                cart.addProduct('toto');
            }).to.throw(Error,'I want a product !');
        });
        it('should have a default quantity : 1',function(){
            cart.addProduct(new GenericProduct());
            expect(cart.lines[0].quantity).to.equal(1);
        });
        it('should calculate total',function(){
            var book = new Book('a','b',10);
            var dvd = new Dvd('c','d',20);
            cart.addProduct(book,1);
            cart.addProduct(dvd,2);
            expect(cart.getTotal()).to.equal(50);
        });
    });

    describe('Product',function(){
        it('should return the required type',function(){
            var Book= WebShop.Product('Book');
            var book = new Book();
            expect(book.typeName).to.equal('Book');
        });
        it('should return Product when no argument is passed',function(){
            var GenericProduct= WebShop.Product(),
                product = new GenericProduct();
            expect(product.typeName).to.equal('GenericProduct');
        });
    });
    /*
     describe('Cart - Singleton',function(){
     'use strict';
     it('should create a new instance to start',function(){
     expect(Cart).not.to.be.undefined;
     expect(Cart).to.have.ownProperty('lines');
     expect(Cart.lines.length).to.equal(0);
     });

     it('should reuse instance then',function(){

     var instance = Cart;
     instance.addProduct(new (Product()));
     var cart2 = Cart;
     expect(cart2.lines.length).to.equal(1);
     });


     });
     */
});
