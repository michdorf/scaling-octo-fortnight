var modello = {};
modello.ins = function (templateElem, contElem, parametri) {
    var str = templateElem.innerHTML;
    var regex;
    for (key in parametri){
        regex = new RegExp("=\\["+key+"\\]","g");
        str = str.replace(regex,parametri[key]);
    }
    contElem.innerHTML = str;
    return true;
};