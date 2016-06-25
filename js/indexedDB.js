//Usi quello in /dechiffre.dk/webApp/indexedDB/indexedDB.js

if (typeof m != "object"){
    alert("Devi includere js/std.js");
}

//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

var iDB = {
    /*db_HDL:0,*/
    compat:true,
    db_name:"de_data",
};

if (!window.indexedDB) {
    iDB.compat = false;
    md.warn("Your browser doesn't support a stable version of IndexedDB.");
}

iDB.creaTabella = function iDBInitFunc(nomeTabella,JSON_args){
    if (iDB.compat == false){
     	md.error("Non è riuscito a creare la tabella - iDB.creaTabella()");
     	return false;
     }

     var primary_key = JSON_args.primary_key ? JSON_args.primary_key : "id";
     var databasenavn = JSON_args.databasenavn ? JSON_args.databasenavn : standardDBNavn;
     var callBackFunc = JSON_args.callBackFunc ? JSON_args.callBackFunc : function (){return true};

     //Man skal bruge databasen version (2nd argument) og forøge det for at trigge onupgradeneeded, som er det eneste sted, man kan skabe en tabel
     var request = window.indexedDB.open(databasenavn, 1);
     //Versionen kan i onsucces-eventen som parseInt(db.version) - se skabNyTabel()

     request.onerror = function(event) {
      console.log("error: med at requeste");
     };

     request.onsuccess = function(event) {
      db = request.result;
      console.log("success: "+ db);
      callBackFunc("success");
     };
    
     request.onupgradeneeded = function(event) {
      var db = event.target.result;

      var tabeller = makeArray(JSON_args.tabeller);
      if (JSON_args.index)
        var indexer = makeArray(JSON_args.index);
      else
        var indexer = [];

      //Skab tabellerne, der skal bruges
      var i, j;
      for (i = 0; i < tabeller.length; i++)
      {
          //Tabeller array af keys med en SQL syntax som: "brugere(id int unique,navn varchar(255),...)
          if (tabeller[i].strpos("(") !== false){
           tabeller[i] = String(tabeller[i]).substr(0,String(tabeller[i]).strpos("("));
           var objectStore = db.createObjectStore(tabeller[i], {keyPath: primary_key, autoIncrement:true });
           j = 0;
           while ((indexer) && (indexer[i][j] != undefined)){
             objectStore.createIndex(indexer[i][j],indexer[i][j],{unique: false});// (objectIndexName,objectKeypath, optionalObjectParameters)
             j++;
           }
          }
          else
            console.log("Tabel kunne ikke oprettes grundet manglende paranteser");
      }
      console.log("database upgraderet");
      callBackFunc("upgraded");
     };
}