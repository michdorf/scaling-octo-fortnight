/*
* Copyright © 2016 Michele De Chiffre
* */

m = {
 log: console.log.bind(console),
 error: console.error.bind(console),
 warn: console.warn.bind(console),
 info: console.info.bind(console)
};

function elem(DOMSelectStr){
  return document.querySelector(DOMSelectStr);
}

//Questo sarebbe bello se funzionasse non solo con se stesso
function func_Name(){
    var myName = arguments.callee.toString();
    myName=myName.substr(9,myName.indexOf('(')-9);
    alert(myName);
}