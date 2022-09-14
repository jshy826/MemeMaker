const saveBtn = document.getElementById("save");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const lineWidth = document.getElementById("line-width");
const lineWidthValue = document.getElementById("lineWidthValue");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
lineWidthValue.innerText = lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(event) {
    isPainting = true;
}

function cancelPaintng(event) {
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthCange(event) {
    ctx.lineWidth = event.target.value;
    lineWidthValue.innerText = ctx.lineWidth;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color; // html의 data-color로 입력한게 dataset의 color로 저장됌
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick() {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "⬛Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick() {
    if(confirm("Are you sure you want to destroy?")){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "⬛Fill";
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image(); // javascript로 html의 img태그를 생성하는 것과 같음
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
        ctx.save(); // 실행한 현재 상태, 색상, 스타일 등 모든 것을 저장함
        ctx.lineWidth = 1;
        ctx.font = "32px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a"); // a 태그를 작성
    a.href = url; // 그림에서 생성된 가짜 url을 넣어줌
    a.download = "myDrawing.png"; // 파일 이름 설정
    a.click(); // 링크를 클릭
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown); // 마우스를 누르고 있을 때를 의미
canvas.addEventListener("mouseup", cancelPaintng); // 마우스를 뗐을 때를 의미
canvas.addEventListener("mouseleave", cancelPaintng);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthCange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);