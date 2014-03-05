/**
 * Created by form on 03/03/14.
 */

var addElem = function(elemType,attrs,elemText,parent){
    parent = parent||document.body;
    var b= document.createElement(elemType);
    if(attrs){
        for(var a in attrs){
            b[a]=attrs[a];
        }
    }
    if(elemText){b.innerHTML=elemText;}
    parent.appendChild(b);
    return b;
}
var addEvent = function(element, evtType, callback, capture){
    if(element.addEventListener instanceof Function){
        element.addEventListener(evtType,callback,capture);
    }
    else{
        element.attachEvent('on'+evtType,callback);
    }
};
var Timer = function() {
    var start;
    this.end = function(){
        return new Date().getTime()-start;
    }
    //constructeur
    start = new Date().getTime();
};

/* TEST 1 : les boutons */
(function(nbButtons){
    nbButtons=nbButtons||10;
    var onButtonClick = function(num){
        return function(){
            console.log(num);
        }
    };
    for(var i=0;i<nbButtons;i++){
        var b= document.createElement('button');
        addEvent(b,'click',onButtonClick(i));
        b.innerHTML='Bouton '+i;
        document.body.appendChild(b);
    }
})();

/* TEST 2 : w3schools*/
(function(){
    addElem('a',{'id':'w3schools','href':'http://www.w3schools.com'},'w3schools');
    var changeLink=function(e){
        var evt= e ||window.event;
        if(this.href.indexOf('http://www.w3schools.com')==0){
            this.href='http://www.w3fools.com';
            if(evt.stopPropagation){
                evt.preventDefault();
                evt.stopPropagation();
            }
            else{
                evt.cancelBubble = true;
                return false;
            }
        }
    };
    var links = document.getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
        if(links[i].href&&links[i].href=='http://www.w3schools.com/'){
            addEvent(links[i],'click',changeLink,true);
        }
    }
})();
/*  TEST3 : hover */
(function(){
    var o=addElem('div',{'id':'changeHover'},'hello')
    var changeHover = function(e){
        e.target.innerHTML=(e.target.innerHTML=='hello'?'world':'hello');
    }

    addEvent(o,'mouseover',changeHover);
    addEvent(o,'mouseout',changeHover);
})();

 /*TEST4 : bubbling*/
(function(){
    var x=new Timer();
    addElem('a',{'id':'bubbling'},'hello',
        addElem('li',{},'',
            addElem('ul',{},'',
                addElem('div',{'id':'stopBubble'})
            )
        )
    );
    var p = document.getElementById('bubbling');
    var onBubblingClick = function(phase){
        return function(e){
            switch(event.eventPhase){
                case Event.CAPTURING_PHASE:
                    console.log('capturing '+ this.nodeName);
                    break;
                case Event.AT_TARGET:
                    console.log('at target '+ this.nodeName);
                    break;
                case Event.BUBBLING_PHASE:
                    console.log('bubbling '+ this.nodeName);
                    break;
            }
            //console.log(phase+' : '+ this.nodeName);
            //console.log(e)
        }

    }
    while(p){
        addEvent(p,'click',onBubblingClick('capture'),true);
        addEvent(p,'click',onBubblingClick('bubble'),false);
        p=(p.id=='stopBubble'?null: p.parentNode);

    }
    console.log(x.end())
})();