var image1 = null;
var image2;
var stego;
var stego1;
var image3;
var image4;
var test;


//////////////crop test////////////////

async function stag() {
  const input = document.getElementById("finput");
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = async function () {
    const dataURL = reader.result;
    const image = new Image();

    if (image == null) {
      alert("Image1 is empty!");
    } else {
      alert("Processing data... this may take a while. Please be patient");

      image.onload = async function () {
        const canvas = document.getElementById("canvas_id");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const password = prompt("Enter password to recover image");

        const seedBuffer = await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(password)
        );
        const seedArray = new Uint8Array(seedBuffer);

        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const a = imageData.data[i + 3];

          const distortion =
            (seedArray[i % seedArray.length] +
              seedArray[(i + 1) % seedArray.length]) %
            256;
          const red = (r + distortion) % 256;
          const green = (g + distortion) % 256;
          const blue = (b + distortion) % 256;

          imageData.data[i] = red;
          imageData.data[i + 1] = green;
          imageData.data[i + 2] = blue;
        }

        ctx.putImageData(imageData, 0, 0);
        // console.log(imageData);
        // console.log(canvas);

        image1 = new SimpleImage(canvas);

        //   ////////////////////test////////////////////////

        var start = new SimpleImage(image2);
        var hide = new SimpleImage(image1);

        var someImg = new SimpleImage(image1);
        var height = someImg.getHeight();
        var width = someImg.getWidth();

        var someImg2 = new SimpleImage(image2);
        var height2 = someImg2.getHeight();
        var width2 = someImg2.getWidth();

        if (height == height2 && width == width2) {
          //    alert('stag can be performend')
          start = chop2hide(start);
          hide = shift(hide);
          stego = combine(start, hide);
          stego1 = combine(start, hide);
          test = true;

          var canvas1 = document.getElementById("canvas_id");

          var ctx1 = canvas1.getContext("2d");

          ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
          document.addEventListener("click", function handleClick(event) {
            event.target.classList.add("bg-yellow");
          });
          var clr1 = document.querySelector("#clr1");
          clr1.classList.add("s1");

          var canvas12 = document.getElementById("canvas1");
          stego.drawTo(canvas12);
          s1();
          // download_img1()
        } else {
          alert(
            "WARNING: Images are of different resolutons, cropping is being performed (some data may be lost in this process)"
          );

          crop_test();

          // download_img1()
        }
      };
    }

    image.src = dataURL;
  };

  reader.readAsDataURL(file);
}

var crop_test = function () {
  function crop(image, width, height) {
    var n = new SimpleImage(width, height);
    for (var p of image.values()) {
      var x = p.getX();
      var y = p.getY();
      if (x < width && y < height) {
        var np = n.getPixel(x, y);
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
  stego = combine(start, hide);
  stego1 = combine(start, hide);

  var canvas1 = document.getElementById("canvas_id");

  var ctx1 = canvas1.getContext("2d");

  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  var canvas = document.getElementById("canvas1");
  stego.drawTo(canvas);
};

function upload() {
  var fileinput1 = document.getElementById("finput");

  image1 = new SimpleImage(fileinput1);
  image3 = new SimpleImage(fileinput1);

  var canvas = document.getElementById("canvas_id");

  image1.drawTo(canvas);
}

function upload1() {
  var fileinput2 = document.getElementById("finput1");

  image2 = new SimpleImage(fileinput2);
  image4 = new SimpleImage(fileinput2);

  var canvas1 = document.getElementById("canvas1");

  image2.drawTo(canvas1);
}

function clearbits(pixval) {
  var x = Math.floor(pixval / 16) * 16;
  return x;
}

function chop2hide(Image) {
  for (var px of Image.values()) {
    px.setRed(clearbits(px.getRed()));
    px.setGreen(clearbits(px.getGreen()));
    px.setBlue(clearbits(px.getBlue()));
  }
  return Image;
}

function extrabits(pixval1) {
  let val = pixval1 % 16;
  var x = Math.floor(val) * 16;
  // x += val
  return x;
}

function extractionMain() {
  // const canvas = document.getElementById("canvas_id");
  // image1 = new SimpleImage(canvas);
  // image3 = image1
  if (image1 == null) {
    alert("Image1 cannot be empty");
  } else {
    extraction1();

    extraction();
    e1();
    // download_img()
  }
}

let val1;
function extraction() {

    for (var px of image3.values()) {
      px.setRed(extrabits(px.getRed()));
      px.setGreen(extrabits(px.getGreen()));
      px.setBlue(extrabits(px.getBlue()));
    }

    /////////////////////////////////////
    var canvas1 = document.getElementById("canvas_id");
    image3.drawTo(canvas1);
    // console.log(canvas1);

    recoverImage();


}

function extraction1() {
  if (stego != null) {
    for (var px of stego1.values()) {
      px.setRed(clearbits(px.getRed()));
      px.setGreen(clearbits(px.getGreen()));
      px.setBlue(clearbits(px.getBlue()));
    }
    var canvas = document.getElementById("canvas1");
    stego1.drawTo(canvas);
    // extraction();
  } else {
    for (var px of image1.values()) {
      //image1
      px.setRed(clearbits(px.getRed()));
      px.setGreen(clearbits(px.getGreen()));
      px.setBlue(clearbits(px.getBlue()));
    }
    var canvas = document.getElementById("canvas1");
    image1.drawTo(canvas); //image1
  }
}

function clearbits1(pixval) {
  var x = Math.floor(pixval / 16);
  return x;
}

function shift(Image1) {
  for (var px of Image1.values()) {
    px.setRed(clearbits1(px.getRed()));
    px.setGreen(clearbits1(px.getGreen()));
    px.setBlue(clearbits1(px.getBlue()));
  }
  return Image1;
}

function combine(start, hide) {
  var answer = new SimpleImage(start.getWidth(), start.getHeight());

  for (var px of answer.values()) {
    var ansX = px.getX();
    var ansY = px.getY();
    var ansPixel = answer.getPixel(ansX, ansY);

    var startPixel = start.getPixel(ansX, ansY);
    var hidePixel = hide.getPixel(ansX, ansY);

    px.setRed(startPixel.getRed() + hidePixel.getRed());
    px.setBlue(startPixel.getBlue() + hidePixel.getBlue());
    px.setGreen(startPixel.getGreen() + hidePixel.getGreen());
  }
  return answer;
}

function clearCanvas() {
  var canvas = document.getElementById("canvas_id");
  var canvas1 = document.getElementById("canvas1");

  var ctx = canvas.getContext("2d");
  var ctx1 = canvas1.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
}

//////////////////////////alert//////////////////////////

function s1() {
  // console.log("s1 triggered");
  $("#alert_s1").show("fade");

  $("#linkClose").click(function () {
    $("#alert_s1").hide("fade");
  });
}

function e1() {
  $("#alert_e1").show();

  $("#linkClose1").click(function () {
    $("#alert_e1").hide();
  });
}

$(".c1").click(function () {
  $("#alert_c1").show();
});
$("#linkClose2").click(function () {
  $("#alert_c1").hide();
});

//////////////////////download////////////////////////

var download_img = function () {
  var canvas = document.getElementById("canvas_id");
  var anchor = document.createElement("a");
  anchor.href = canvas.toDataURL("image/png");
  anchor.download = "image.png";
  anchor.click();
};

var download_img1 = function () {
  var canvas1 = document.getElementById("canvas1");
  var anchor = document.createElement("a");
  anchor.href = canvas1.toDataURL("image/png");
  anchor.download = "hidden_img.png";
  anchor.click();
};

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

async function recoverImage() {
  const canvas = document.getElementById("canvas_id");
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const password = prompt("Enter password to recover image");

  const seedBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  const seedArray = new Uint8Array(seedBuffer);

  // Check if entered password matches password used to distort image
  const inputSeedBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  const inputSeedArray = new Uint8Array(inputSeedBuffer);
  if (JSON.stringify(inputSeedArray) !== JSON.stringify(seedArray)) {
    alert("Wrong password entered. Image cannot be recovered.");
    return;
  }

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];

    const distortion =
      (seedArray[i % seedArray.length] +
        seedArray[(i + 1) % seedArray.length]) %
      256;
    const red = (r - distortion + 256) % 256;
    const green = (g - distortion + 256) % 256;
    const blue = (b - distortion + 256) % 256;

    imageData.data[i] = red;
    imageData.data[i + 1] = green;
    imageData.data[i + 2] = blue;
  }

  ctx.putImageData(imageData, 0, 0);
}
