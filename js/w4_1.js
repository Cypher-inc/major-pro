var GreyImage1;
var RedImage1;
var BlueImage1;
var GreenImage1;
var Rainbowimage1

function upload(){
    var fileinput1 = document.getElementById("finput")

     image1 = new SimpleImage(fileinput1)
     RedImage1 =  new SimpleImage(fileinput1)
     GreenImage1 =  new SimpleImage(fileinput1)
     BlueImage1 =  new SimpleImage(fileinput1)
     GreyImage1 = new SimpleImage(fileinput1)
     Rainbowimage1 = new SimpleImage(fileinput1)


    canvas1 = document.getElementById("canvas")
    
    image1.drawTo(canvas1)

}

function removeFilter(){
    var fileinput1 = document.getElementById("finput")
    image1 = new SimpleImage(fileinput1)
    image1.drawTo(canvas1)
}

function doGreyScale(){
    
       
    for(var pixel of GreyImage1.values()){
       var red = pixel.getRed()
        var blue = pixel.getBlue()
        var green = pixel.getGreen()

        var avg = (red + blue + green)/3

        pixel.setRed(avg)
        pixel.setBlue(avg)
        pixel.setGreen(avg)
        
    }

    GreyImage1.drawTo(canvas1)
  

}


function doRedScale(){

    
    for(var pixel of RedImage1.values()){
        // var red = pixel.getRed()
        // var blue = pixel.getBlue()
        // var green = pixel.getGreen()
        pixel.setRed('150')
 
        //  pixel.setBlue('0')
        // pixel.setGreen('0')

    }

    RedImage1.drawTo(canvas1)
   

}

function doBlueScale(){
    
    for(var pixel of BlueImage1.values()){

        pixel.setBlue('150')

    }

    BlueImage1.drawTo(canvas1)
   
}


function doGreenScale(){
    
    for(var pixel of GreenImage1.values()){

        var red = pixel.getRed()
        var blue = pixel.getBlue()
        var green = pixel.getGreen()

        var avg = (red + blue + green)/3
        if(avg<128){
            pixel.setRed('0')
            pixel.setGreen('2'* avg)
            pixel.setBlue('0')
        }
        else if(avg >= 128){
            pixel.setRed('2'* avg - '255')
            pixel.setGreen('255')
            pixel.setBlue('2'* avg - '255')
        }

    }

    GreenImage1.drawTo(canvas1)
   
}


function clearCanvas(){
    var canvas1 = document.getElementById("canvas");

    var ctx1 = canvas1.getContext("2d");

    ctx1.clearRect(0,0,canvas1.width, canvas1.height);

}

function Custom(){
    
    for(var pixel of image1.values()){

      if(pixel.getX() > (image1.getWidth()/2.02) && pixel.getX() < (image1.getWidth()/1.98)){
          pixel.setRed('0')
          pixel.setGreen('0')
          pixel.setBlue('0')

      }
      else if(pixel.getY() > (image1.getHeight()/2.03) && pixel.getY() < (image1.getHeight()/1.97)){
        pixel.setRed('0')
        pixel.setGreen('0')
        pixel.setBlue('0')

    }
    else if(pixel.getX() < (image1.getWidth()/2) && pixel.getY() < (image1.getHeight()/2)){
        pixel.setGreen('150')
    }

    else if(pixel.getX() > (image1.getWidth()/2) && pixel.getY() < (image1.getHeight()/2)){
        pixel.setBlue('150')
    }

    else if(pixel.getX() < (image1.getWidth()/2) && pixel.getY() > (image1.getHeight()/2)){
        pixel.setRed('150')
    }

    else if(pixel.getX() > (image1.getWidth()/2) && pixel.getY() > (image1.getHeight()/2)){
        var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen())/3

        pixel.setRed(avg)
        pixel.setBlue(avg)
        pixel.setGreen(avg)
    }

    }
    image1.drawTo(canvas1)
}


function Rainbow(){
    
    for(var pixel of Rainbowimage1.values()){

         var red = pixel.getRed()
        var blue = pixel.getBlue()
        var green = pixel.getGreen()

        var avg = (red + blue + green)/3

        var height1 = image1.getHeight()/7


        if(pixel.getY() < height1){
            if(avg<128){
                pixel.setRed(2*avg)
                pixel.setGreen('0')
                pixel.setBlue('0')
            }
            else if(avg >= 128){
                pixel.setRed('255')
                pixel.setGreen('2'* avg - '255')
                pixel.setBlue('2'* avg - '255')
            }
        }
         else if(pixel.getY() > height1 && pixel.getY() < 2*height1){
            if(avg<128){
                pixel.setRed(2*avg)
                pixel.setGreen('0.8'* avg)
                pixel.setBlue('0')
            }
            else if(avg >= 128){
                pixel.setRed('255')
                pixel.setGreen('1.2'* avg - '51')
                pixel.setBlue('2'* avg - '255')
            }
        }
         else if(pixel.getY() > 2*height1 && pixel.getY() < 3*height1){
                if(avg<128){
                    pixel.setRed(2*avg)
                    pixel.setGreen(2*avg)
                    pixel.setBlue('0')
                }
                else if(avg >= 128){
                    pixel.setRed('255')
                    pixel.setGreen('255')
                    pixel.setBlue('2' * avg - '255')
                }
            }
         else if(pixel.getY() > 3*height1 && pixel.getY() < 4*height1){
            if(avg<128){
                pixel.setRed('0')
                pixel.setGreen('2'* avg)
                pixel.setBlue('0')
            }
            else if(avg >= 128){
                pixel.setRed('2'* avg - '255')
                pixel.setGreen('255')
                pixel.setBlue('2'* avg - '255')
            }
        }
        else if(pixel.getY() > 4*height1 && pixel.getY() < 5*height1){
            if(avg<128){
                pixel.setRed('0')
                pixel.setGreen('0')
                pixel.setBlue('2'* avg)
            }
            else if(avg >= 128){
                pixel.setRed('2'* avg - '255')
                pixel.setGreen('2'* avg - '255')
                pixel.setBlue('255')
            }
        }
        else if(pixel.getY() > 5*height1 && pixel.getY() < 6*height1){
            if(avg<128){
                pixel.setRed('0.8'*avg)
                pixel.setGreen('0')
                pixel.setBlue('2'*avg)
            }
            else if(avg >= 128){
                pixel.setRed('1.2'* avg - '51')
                pixel.setGreen('2'* avg - '255')
                pixel.setBlue('255')
            }
        }
        else if(pixel.getY() > 6*height1 && pixel.getY() < 7*height1){
            if(avg<128){
                pixel.setRed('1.6' * avg)
                pixel.setGreen('0')
                pixel.setBlue('1.6' * avg)
            }
            else if(avg >= 128){
                pixel.setRed('0.4'* avg + '153')
                pixel.setGreen('2'* avg - '255')
                pixel.setBlue('0.4'*avg + '153')
            }
        }
    
    }
    Rainbowimage1.drawTo(canvas1)
   
}


//////////////////download////////////////////

var download_img2 = function() {
    var canvas = document.getElementById("canvas");
    var anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "f_image.png";
    anchor.click();

};