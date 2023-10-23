//using this file to break it down comment wise w/o touching src file
findDomElementGoogle = function(x,y){
    
    var domelement = document.elementFromPoint(x,y);
    if (domelement!=null) {

      // go up the dom tree (document.elementFromPoint(x,y) puts us at a leaf node)
      // stop until we hit a stopping point (at root) or we hit a match for 
      // elements that are known from google's search results
      while(domelement!= null && domelement.parentNode!=null && (domelement.className!="rso" && domelement.className!="g" && domelement.className!="_KBh" && domelement.id!="brs" && domelement.id!="hdtbSum" && domelement.className!="ads-ad" && domelement.className!="c _oc commercial-unit-desktop-rhs rhsvw" && domelement.className!="_OKe")){
        domelement = domelement.parentNode;
      }
      //no dom element, or while going up we did not find a known dom element 
      // #document represents hitting the as far up high the dom tree we should go 
      if(domelement == null || domelement.nodeName=="#document"){
        return "unknown";
      }
      //
      var value = domelement.

      //organic results
      if(value.match("rso") || value.match("g")){
        domelement = domelement.parentNode;
        var olddomelement = domelement;
        //within the same _NId block
        var i = 0;
        while( (domelement = domelement.previousSibling) != null ){
          i++;
        }
        //add the previous results
        var j=0;
        olddomelement = olddomelement.parentNode.parentNode;
        while( (olddomelement = olddomelement.previousSibling) != null ){
          if(olddomelement.className == "_NId" && olddomelement.firstChild.className == "srg"){
            j+= olddomelement.firstChild.childNodes.length;
          }
        }
        return "result " + (i+j+1);
      }
      else if(value.match("_KBh")){
        return "top stories";
      }
      else if(domelement.id.match("hdtbSum")){
        return "top bar";
      }
      else if(domelement.id.match("brs")){
        return "bottom related searches";
      }
      else if(value.match("ads-ad")){
        var number = domelement.dataset.hveid;
        if (number!=undefined)
          return "ad " + number;
        return "ad";
      }
      else if(value.match("c _oc commercial-unit-desktop-rhs rhsvw")){
        return "right ad";
      }
      else if(value.match("_OKe")){
        return "right info panel";
      }
      else{
        return "unknown";
      }
    }
    else return "out of bounds";
};