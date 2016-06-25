/* Functions to find and merge two different files
 * Copyright © 2016 Michele
 */


var diff = function diff(old,ny){
		var oldExp = old.split(diff.delim);
		var newExp = ny.split(diff.delim);

		var newOffset = 0, index = 0;
		var diffStr = "";
		for (var i = 0; i < oldExp.length; i++){
			if ((index=newExp.indexOf(oldExp[i],newOffset))!=-1){
				if (newOffset<index){
				diffStr += (i-1)+"[";
				while (newOffset<index){
					diffStr += newExp[newOffset].replace(";","\\;")+diff.delim;
					newOffset++;
				}
				diffStr = diffStr.substr(0,diffStr.length-diff.delim.length)+";";
				}
				newOffset = index+1;
			}
			else{
				diffStr += i+"]"+";"; //Deleted part //You could add +oldExp[i]
			}
		}

		if (newOffset<newExp.length){
		diffStr += (i-1)+"[";
		while (newOffset < newExp.length){
			diffStr += newExp[newOffset].replace(";","\\;")+diff.delim;
			newOffset++;
		}
		diffStr = diffStr.substr(0,diffStr.length-diff.delim.length)+";";
		}

		return diffStr;
	}
diff.delim=" ";

	diff.split = function(str,delim){
			var inx, offset, lastPos = 0, retArr = [];
			while (1){
				inx = str.indexOf(delim,offset);
				if (inx==-1){
					retArr.push(str.substr(lastPos).replace("\\"+delim,delim))
					break;
				}
				if (str[inx-1]!="\\"){
					retArr.push(str.substr(lastPos,inx-lastPos).replace("\\"+delim,delim));
					lastPos = inx+1;
				}

				offset = inx+1;
			}

			return retArr;
		}

	diff.nextChange = function(changeStr){
			var offset = 0, maxRuns = 12, i = 0;
			while (i < maxRuns){
				i++;
				if (changeStr.indexOf("]",offset)!=-1){
					if (changeStr.substr(changeStr.indexOf("]",offset)-1,1)!="\\"){
						return {i:parseInt(changeStr.substr(0,changeStr.indexOf("]",offset))),
										delim:changeStr.substr(changeStr.indexOf("]",offset),1),
										str:changeStr.substr(changeStr.indexOf("]",offset)+1)}
					}
				}else{
					if (changeStr.indexOf("[",offset)!=-1){
						if (changeStr.substr(changeStr.indexOf("[",offset)-1,1)!="\\"){
						return {i:parseInt(changeStr.substr(0,changeStr.indexOf("[",offset))),
										delim:changeStr.substr(changeStr.indexOf("[",offset),1),
										str:changeStr.substr(changeStr.indexOf("[",offset)+1)}
						}
					}
				}
				}

				return {i:-1,delim:"",str:""};
		}
	
	diff.evidenza = function (str,aggiunto,tipo){
		tipo = tipo?tipo:"";
		switch (tipo.toLowerCase()){
			case "html":
			 return '<span class="diff '+(aggiunto?"agg":"rim")+'">'+str+'</span>';
			default:
			 return "";
		}
	}

	String.prototype.update = function (diffStr,evidenzia){
		var changesExp = diff.split(diffStr,";");
		var oldExp = this.split(diff.delim);

		var j = 0, ret = "", nextChange={}, curI = 0, cancParola = false, agg = "";
		for (var i = 0; i < oldExp.length; i++){
		cancParola = false;
		agg = "";
			nextChange = diff.nextChange(changesExp[j]);
			while (diff.nextChange(changesExp[j]).i==i){
				if (nextChange.delim=="]")//Cancellato
					cancParola = true;
				if (nextChange.delim=="["){//Aggiunto
					agg += nextChange.str+diff.delim;
				}
				j++;
				nextChange = diff.nextChange(changesExp[j]);
					if (typeof changesExp[j] == "undefined"){break;}
			}

			if (!cancParola)
				ret += oldExp[i]+diff.delim;
			else if (evidenzia)
			  ret += diff.evidenza(oldExp[i]+diff.delim,false,evidenzia);
			ret += diff.evidenza(agg,true,evidenzia);
		}
		
		if (!evidenzia)
		  return ret.substr(0,ret.length-diff.delim.length);
		else
		  return ret;
	}
