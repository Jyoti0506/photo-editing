// document.addEventListener('DOMContentLoaded', () =>{
//     const canvas = new fabric.Canvas('canvas');
//     const image = document.getElementById('file');
//     const brightness = document.getElementById('brightness');
//     const contrast = document.getElementById('contrast');
//     const saturation = document.getElementById('saturation');
//     const hue = document.getElementById('hue');
//     const blur = document.getElementById('blur');
//     const shadow = document.getElementById('shadow');
//     const download = document.getElementById('download');

//     function handleImage (e){
//         const file = e.target.file[0] //[img0,img1,imd2,img3]
//         if (file) {
//             // const render = new fabric.Image(file);
//             console.log(file)
//         }
//     }
// })


// function editRange(){
//     const bright = document.getElementById('bright');
//     const con = document.getElementById('con');
//     const sat = document.getElementById('sat');
//     const blu = document.getElementById('blu');
//     const hu = document.getElementById('hu');
//     const sha = document.getElementById('sha');
// }

var brightnessClick = false;
var contrastClick = false;
var saturationClick = false;
var blurClick = false;
var hueClick = false;
var shadowClick = false;

function brightnessHandler() {
    const brightnessInput = document.getElementById('brightness');
    brightnessClick = !brightnessClick;
    if (brightnessClick) {
        brightnessInput.style.display = "block"
    } else {
        brightnessInput.style.display = "none"
    }
}

function contrastHandler() {
    const contrastInput = document.getElementById('contrast');
    contrastClick = !contrastClick;
    if (contrastClick) {
        contrastInput.style.display = "block"
    } else {
        contrastInput.style.display = "none"
    }
}

function saturationHandler() {
    const saturationInput = document.getElementById('saturation');
    saturationClick = !saturationClick;
    if (saturationClick) {
        saturationInput.style.display = "block"
    } else {
        saturationInput.style.display = "none"
    }
}

function blurHandler() {
    const blurInput = document.getElementById('blur');
    blurClick = !blurClick;
    if (blurClick) {
        blurInput.style.display = "block"
    } else {
        blurInput.style.display = "none"
    }
}

function hueHandler() {
    const hueInput = document.getElementById('hue');
    hueClick = !hueClick;
    if (hueClick) {
        hueInput.style.display = "block"
    } else {
        hueInput.style.display = "none"
    }
}

function shadowHandler() {
    const shadowInput = document.getElementById('shadow');
    shadowClick = !shadowClick;
    if (shadowClick) {
        shadowInput.style.display = "block"
    } else {
        shadowInput.style.display = "none"
    }
}

// var containerClick = false;
// function navbarHandler() {
//     const navInput = document.getElementById('navbar')
//     containerClick = !containerClick;
//     if (containerClick) {
//         navInput.style.display = "block"
//     } else {
//         navInput.style.display ="none"
//     }
// }

// steps for editing
document.addEventListener('DOMContentLoaded', ()=> {

    // step1: get all html elements using id for reference

    const fileInput = document.getElementById('file');
    const canvas = document.getElementById('canvas');
    const download = document.getElementById('download');
    const brightnessInput = document.getElementById('brightness');
    const contrastInput = document.getElementById('contrast');
    const saturation = document.getElementById('saturation');
    const hue = document.getElementById('hue');
    const blur = document.getElementById('blur');
    const shadow = document.getElementById('shadow');
    const ctx = canvas.getContext('2d');

    let img;

    fileInput.addEventListener('change', getImage);

    brightnessInput.addEventListener('input', applyEffects);
    contrastInput.addEventListener('input', applyEffects);
    saturation.addEventListener('input', applyEffects);
    hue.addEventListener('input', applyEffects);
    download.addEventListener('click', downloadImage)

    // step3: for select files
    function getImage(e){
        const file = e.target.files[0]; // [img0,img1,....]
        const reader = new FileReader(); // reading selected file
        reader.onload = function (event){
            img = new Image(); // craeting image tag
            img.onload = function (){
                canvas.width = img.width; // decalring image width for canvas
                canvas.height = img.height; // decalring image height for canvas
                ctx.drawImage(img, 0, 0)
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);  // read the selected files dataURL
    
    }

    function applyEffects (){
            if(!img) return

            const brightnessValue = brightnessInput.value;
            const contrastValue = contrastInput.value;
            const saturationValue = saturation.value;
            const hueValue = hue.value;
            ctx.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%) saturate(${saturationValue}%) hue-rotate(${hueValue}deg)`;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    function downloadImage(){
        if (!img) return; 
        var imagename = prompt('enter image name');
            
        const imageURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = imageURL;   // <a href="hjgfjg"></a>
        link.download = imagename +'.png';document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
})

