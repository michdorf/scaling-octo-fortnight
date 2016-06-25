<?php
$diffDelimeter = " ";

function indexOf($needle, $haystack, $offset=0){
 for ($i = $offset; $i < sizeof($haystack); $i++){
  if ($haystack[$i] == $needle){
   return $i;
  }
 }

 return -1;
}

function diff($old,$ny){
  	$oldExp = explode($diffDelimeter,$old);
  	$newExp = explode($diffDelimeter,$ny);

  	$newOffset = 0; $index = 0;
  	$diffStr = "";
  	for ($i = 0; $i < strlen($oldExp); $i++){
  	  if (($index=indexOf($oldExp[i],$newExp,$newOffset))!=-1){
  	  	if ($newOffset<$index){
  	  	 $diffStr += ($i-1)+"[";
  	  	 while (newOffset<index){
  	  	  $diffStr += strreplace($newExp[$newOffset],";","\\;")+$diffDelimeter;
  	  	  $newOffset++;
  	  	 }
  	  	$diffStr = substr($diffStr,0,strlen($diffStr)-strlen($diffDelimeter))+";";
  	    }
  	  	$newOffset = $index+1;
  	  }
  	  else{
  	  	$diffStr += i+"]"+";"; //Deleted part //You could add +oldExp[i]
  	  }
  	}

  	if ($newOffset<strlen($newExp)){
  	$diffStr += ($i-1)+"[";
  	while ($newOffset < strlen($newExp)){
  	  $diffStr += strreplace($newExp[$newOffset],";","\\;")+$diffDelimeter;
  	  $newOffset++;
  	}
  	$diffStr = substr($diffStr,0,strlen($diffStr)-strlen($diffDelimeter))+";";
    }

  	return $diffStr;
  }

function diffsplit($str,$delim){
			$lastPos = 0;
			$retArr = [];
			while (1){
				$inx = strpos($str,$delim,offset);
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

function update($diffStr,$evidenzia){
		$changesExp = diff.split(diffStr,";");
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
