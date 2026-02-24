const asciiChars =
"@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

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


/* LINE用サイズ */

const width = 120;

const height =
img.height*(width/img.width)*0.55;


canvas.width = width;
canvas.height = height;


ctx.drawImage(
img,
0,
0,
width,
height
);


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

const i=(y*width+x)*4;

const r=imageData[i];
const g=imageData[i+1];
const b=imageData[i+2];

const gray=
0.299*r+
0.587*g+
0.114*b;


const index=
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

const text=
document
.getElementById("ascii")
.textContent;


navigator.clipboard
.writeText(text);

alert("LINEに貼れるASCIIコピーした");

}
