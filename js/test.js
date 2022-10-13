

var image1;
var image2;
var stego;
var stego1;
var image3;
var image4;
var test;

function stag(){

// alert("Processing data... this may take a while. Please be patient");

////////////////////test////////////////////////
var start = new SimpleImage(image2);
var hide = new SimpleImage(image1);



    var someImg = new SimpleImage(image1);
    var height = someImg.getHeight(); 
    var width = someImg.getWidth(); 

   
   var someImg2 = new SimpleImage(image2);
    var height2 = someImg2.getHeight(); 
    var width2 = someImg2.getWidth(); 

   
   if(height >= height2 && width >= width2){
       alert('stag can be performend')
       start = chop2hide(start);
        hide = shift(hide);
        stego = combine(start,hide);
        stego1 = combine(start,hide);
            test = true;

            
        var canvas1 = document.getElementById("canvas");

        var ctx1 = canvas1.getContext("2d");

        ctx1.clearRect(0,0,canvas1.width, canvas1.height);


        var canvas = document.getElementById("canvas1")
        stego.drawTo(canvas)
   }
   else{
       alert("stag cannot be performend")

       function crop(image, width, height){
        var n = new SimpleImage(width,height);
        for(var p of image.values()){
             var x = p.getX();
             var y = p.getY();
            if (x<width && y<height) {
                var np = n.getPixel(x,y);
                np.setRed(p.getRed());
                np.setGreen(p.getGreen());
                np.setBlue(p.getBlue());
            }
        }
        return n;
   }
        
        var start = new SimpleImage(image2);
        var hide = new SimpleImage(image1);

        var cropWidth = start.getWidth();
        if (hide.getWidth() < cropWidth) {
            cropWidth = hide.getWidth();
        }
        var cropHeight = start.getHeight();
        if (hide.getHeight() < cropHeight) {
            cropHeight = hide.getHeight();
        }
        
        start = crop(start, cropWidth, cropHeight);
        hide = crop(hide, cropWidth, cropHeight);
        start = chop2hide(start);
        hide = shift(hide);
        stego = combine(start,hide);

        var canvas1 = document.getElementById("canvas");

        var ctx1 = canvas1.getContext("2d");

        ctx1.clearRect(0,0,canvas1.width, canvas1.height);


        var canvas = document.getElementById("canvas1")
        stego.drawTo(canvas)

        }

}

//////////////crop test////////////////

var crop_test = function(){
    
   
}

function upload(){
    var fileinput1 = document.getElementById("finput")

     image1 = new SimpleImage(fileinput1)
     image3 = new SimpleImage(fileinput1)


    var canvas = document.getElementById("canvas")
    
    image1.drawTo(canvas)

}

function upload1(){
    var fileinput2 = document.getElementById("finput1")

     image2 =  new SimpleImage(fileinput2)
     image4 = new SimpleImage(fileinput2)

    var canvas1 = document.getElementById("canvas1")
    
    image2.drawTo(canvas1)

}

function clearbits(pixval){
    var x = Math.floor(pixval/16)*16;
    return x;
}

function chop2hide(Image){
    for (var px of Image.values()){
        px.setRed(clearbits(px.getRed()));
        px.setGreen(clearbits(px.getGreen()));
        px.setBlue(clearbits(px.getBlue()));
    }
    return Image;
}

function extrabits(pixval1){
    var x = Math.floor(pixval1%16)*16;
    return x;
}


function extractionMain(){

    extraction1();

    extraction();

}

function extraction(){
if(stego1!=null){
    for (var px of stego.values()){
        px.setRed(extrabits(px.getRed()));
        px.setGreen(extrabits(px.getGreen()));
        px.setBlue(extrabits(px.getBlue()));
    }
    

    var canvas1 = document.getElementById("canvas")
    stego.drawTo(canvas1)
}
else{
    for (var px of image3.values()){
        px.setRed(extrabits(px.getRed()));
        px.setGreen(extrabits(px.getGreen()));
        px.setBlue(extrabits(px.getBlue()));
    }
    

    var canvas1 = document.getElementById("canvas")
    image3.drawTo(canvas1)
}
}

function extraction1(){
if(stego!=null){

    for (var px of stego1.values()){
        px.setRed(clearbits(px.getRed()));
        px.setGreen(clearbits(px.getGreen()));
        px.setBlue(clearbits(px.getBlue()));
    }
    var canvas = document.getElementById("canvas1")
    stego1.drawTo(canvas)
    // extraction();
}
else{
    for (var px of image1.values()){    //image1
        px.setRed(clearbits(px.getRed()));
        px.setGreen(clearbits(px.getGreen()));
        px.setBlue(clearbits(px.getBlue()));
    }
    var canvas = document.getElementById("canvas1")
    image1.drawTo(canvas)   //image1
}

}

function clearbits1(pixval){
    var x = Math.floor(pixval/16);
    return x;
}

function shift(Image1){
    for (var px of Image1.values()){
        px.setRed(clearbits1(px.getRed()));
        px.setGreen(clearbits1(px.getGreen()));
        px.setBlue(clearbits1(px.getBlue()));
    }
    return Image1;
}

function combine(start,hide){
    var answer = new SimpleImage(start.getWidth(),start.getHeight());

    for (var px of answer.values()){
        var ansX = px.getX()
        var ansY = px.getY()
       var ansPixel = answer.getPixel(ansX,ansY)
       
       var startPixel = start.getPixel(ansX,ansY)
       var hidePixel = hide.getPixel(ansX,ansY)


          px.setRed(startPixel.getRed() + hidePixel.getRed()) 
          px.setBlue(startPixel.getBlue() + hidePixel.getBlue()) 
         px.setGreen(startPixel.getGreen() + hidePixel.getGreen())  
        

    }
    return answer;
}


function clearCanvas(){
    var canvas = document.getElementById("canvas");
    var canvas1 = document.getElementById("canvas1");

    var ctx = canvas.getContext("2d");
    var ctx1 = canvas1.getContext("2d");

    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx1.clearRect(0,0,canvas1.width, canvas1.height);

}




//////////////////////////alert//////////////////////////




$('.s1').click(function () {
    $('#alert_s1').show('fade');
});
$('#linkClose').click(function () {
        $('#alert_s1').hide('fade');
});    


$('.e1').click(function () {
    $('#alert_e1').show();
});
$('#linkClose1').click(function () {
    $('#alert_e1').hide();
});


$('.c1').click(function () {
    $('#alert_c1').show();
});
$('#linkClose2').click(function () {
    $('#alert_c1').hide();
});



//////////////////////download////////////////////////




var download_img = function() {
        var canvas = document.getElementById("canvas");
        var anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "image.png";
        anchor.click();

  };
  
  var download_img1 = function() {
        var canvas1 = document.getElementById("canvas1");
        var anchor = document.createElement("a");
        anchor.href = canvas1.toDataURL("image/png");
        anchor.download = "image.png";
        anchor.click();

  };

  


 