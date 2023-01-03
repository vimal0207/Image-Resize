function setCanvaText(text : String, canva_id : String) : void {
    var canvas = document.getElementById(canva_id) as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = 'center';
    ctx.fillText(text, (canvas.width / 2) - 17, (canvas.height / 2) + 8);
}

function adjustCanvaSize(width : Number, height : Number) : void {
    var canva = document.getElementById('input-canvas') as HTMLCanvasElement;
    canva.width = width;
    canva.height = height;
}

function updateSizeInput(width : Number, height : Number) : void {
    var width_input = document.getElementById('width-input') as HTMLInputElement;
    width_input.value = String(width);
    var height_input = document.getElementById('height-input') as HTMLInputElement;
    height_input.value = String(height);
}

function disableSizeInput() : void{
    let width = document.getElementById('width-input') as HTMLInputElement;
    width.disabled = false
    let height = document.getElementById('height-input') as HTMLInputElement;
    height.disabled = false
}

function displayImage([files]) : void{
    let button = document.getElementById("resize-button") as HTMLButtonElement;
    button.disabled = false;
    var canva = document.getElementById('input-canvas') as HTMLCanvasElement;
    var ctx = canva.getContext('2d');
    var img = new Image;
    img.src = URL.createObjectURL(files);
    img.onload = function() {
        const img_width = img.naturalWidth;
        const img_height = img.naturalHeight;
        disableSizeInput();
        updateSizeInput(img_width, img_height);
        adjustCanvaSize(img_width, img_height);
        ctx.drawImage(img, 0, 0, img_width, img_height);
        ctx.fill()
    }
}

function uploadFile(): void {
    document.getElementById('upload-file').click()
  }

function addDownloadLink() : void {
    var canva = document.getElementById('output-canvas') as HTMLCanvasElement;
    var image = canva.toDataURL("image/jpg");
    let anc = document.getElementById('download-link') as HTMLAnchorElement;
    anc.style.display = "block";
    anc.href = image;
} 

function changeSize(): void {
    let src = cv.imread('input-canvas');
    let dst = new cv.Mat();
    var width_input = document.getElementById('width-input') as HTMLInputElement;
    var height_input = document.getElementById('height-input') as HTMLInputElement;
    const img_width =  Number(width_input.value);
    const img_height = Number(height_input.value);
    let dsize = new cv.Size(img_width, img_height);
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA );
    cv.imshow('output-canvas', dst);
    src.delete(); 
    dst.delete();
    addDownloadLink()
}


setCanvaText('Input Canva', "input-canvas")
setCanvaText('Output Canva', "output-canvas")