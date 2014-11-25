// From http://abduzeedo.com/water-drop-effect-html-css
$(document).ready(function(){

  ndrops = 400;
  addDrops();
  // moveDrops();
  
  function addDrops(){
    for(i=0; i<= ndrops; i++){
      dp = "<li class='d" + i + "''></li>"
      dX =  Math.floor((Math.random()*100)) + "vw";
      dY =  Math.floor((Math.random()*100)) + "vh";

      dS = Math.floor((Math.random()*10)+1) * 0.3;

      dB = (Math.floor((Math.random()*2)+1) * 0.5)+ "px";
      dO = (Math.floor((Math.random()*2)+1) * 0.5);
      dW = Math.floor((Math.random()*30))*0.5 + "px";
      dH = dW;
      //goingDown = ".d" + Math.floor((Math.random()*100)+50);
      $("ul").append(dp);
      $(".d" + i).css("opacity",dO)
        .css("width",dW)
        .css("height",dH)
        .css("left",dX)
        .css("top",dY);
    }

    xxx = setInterval(function(){
      moveDrops();  
    },90000);
    
  }
  function moveDrops(){
    for(i=0; i<=ndrops; i++){
      goingDown = ".d" + Math.floor((Math.random()*100)+1);
      $(goingDown).addClass("move").transition({y:"+=" + Math.floor((Math.random()*40)+1) + "px"},Math.floor((Math.random()*1000)+800), "ease");
    };
    /*$("ul li").each(function(i){
      dO = (Math.floor((Math.random()*2)+1) * 0.5);
      $(this).transition({opacity: dO, delay:(i*10)},50);
    })*/
    
  }
//.css("-webkit-filter","blur(" + dB +")")

});