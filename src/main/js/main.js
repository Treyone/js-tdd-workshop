function returnTrue() {
    'use strict';
    return true;
}

function compare(a,b){
    return (a==b);
}

function extractDomaine(email){
    var re=/[A-Za-z0-9+_-]*@([A-Za-z0-9+\.]*)/i,
        domain = re.exec(email);
    if(domain &&domain.length>1){return domain[1];}
    return null;
}

function factorielle(num){
    factorielle.factoCache=factorielle.factoCache||{};
    if(num===undefined||typeof(num)!='number') return null;

    if (factorielle.factoCache[num])return factorielle.factoCache[num];

    if(num==0)return 1;

    return (factorielle.factoCache[String(num)] = num*factorielle(num-1));
}

returnTrue();

