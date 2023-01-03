function setCanvaText(text, canva_id) {
    var canvas = document.getElementById(canva_id);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = 'center';
    ctx.fillText(text, (canvas.width / 2) - 17, (canvas.height / 2) + 8);
}
function adjustCanvaSize(width, height) {
    var canva = document.getElementById('input-canvas');
    canva.width = width;
    canva.height = height;
}
function updateSizeInput(width, height) {
    var width_input = document.getElementById('width-input');
    width_input.value = String(width);
    var height_input = document.getElementById('height-input');
    height_input.value = String(height);
}
function disableSizeInput() {
    var width = document.getElementById('width-input');
    width.disabled = false;
    var height = document.getElementById('height-input');
    height.disabled = false;
}
function displayImage(_a) {
    var files = _a[0];
    var button = document.getElementById("resize-button");
    button.disabled = false;
    var canva = document.getElementById('input-canvas');
    var ctx = canva.getContext('2d');
    var img = new Image;
    img.src = URL.createObjectURL(files);
    img.onload = function () {
        var img_width = img.naturalWidth;
        var img_height = img.naturalHeight;
        disableSizeInput();
        updateSizeInput(img_width, img_height);
        adjustCanvaSize(img_width, img_height);
        ctx.drawImage(img, 0, 0, img_width, img_height);
        ctx.fill();
    };
}
function uploadFile() {
    document.getElementById('upload-file').click();
}
function addDownloadLink() {
    var canva = document.getElementById('output-canvas');
    var image = canva.toDataURL("image/jpg");
    var anc = document.getElementById('download-link');
    anc.style.display = "block";
    anc.href = image;
}
function changeSize() {
    var src = cv.imread('input-canvas');
    var dst = new cv.Mat();
    var width_input = document.getElementById('width-input');
    var height_input = document.getElementById('height-input');
    var img_width = Number(width_input.value);
    var img_height = Number(height_input.value);
    var dsize = new cv.Size(img_width, img_height);
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow('output-canvas', dst);
    src["delete"]();
    dst["delete"]();
    addDownloadLink();
}
setCanvaText('Input Canva', "input-canvas");
setCanvaText('Output Canva', "output-canvas");
