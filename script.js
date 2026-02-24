const asciiChars = "@%#*+=-:. ";

document.getElementById("upload")
.addEventListener("change", function(e){

const file = e.target.files[0];

const img = new Image();

img.src = URL.createObjectURL(file);

img.onload = function(){

const canvas =
document.createElement("canvas");

const ctx =
canvas.getContext("2d");

const width = 200;

const height =
img.height * (width/img.width);

canvas.width = width;
canvas.height = height;

ctx.drawImage(img,0,0,width,height);

const imageData =
ctx.getImageData(
0,
0,
width,
height
).data;

let ascii="";

for(let y=0;y<height;y++){

for(let x=0;x<width;x++){

const i =
(y*width + x)*4;

const r=imageData[i];
const g=imageData[i+1];
const b=imageData[i+2];

const gray =
(r+g+b)/3;

const index =
Math.floor(
gray/255*
(asciiChars.length-1)
);

ascii+=
asciiChars[
asciiChars.length
-1-index
];

}

ascii+="\n";

}

document
.getElementById("ascii")
.textContent
=ascii;

}

});

function copyText(){

const text =
document.getElementById("ascii")
.textContent;

navigator.clipboard
.writeText(text);

alert("コピーした！LINEに貼れるよ");

}
