const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

const colors = [
    '#55efc4',
    '#81ecec',
    '#74b9ff',
    '#fab1a0',
    '#b8e994',
    '#6a89cc',
    '#4a69bd',
    '#fad390',
    '#3c6382',
    '#0c2461',
    '#0a3d62',
]

var x, y = 0;

var color = colors[Math.floor(Math.random() * colors.length)];

function onDraw(event) {
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
}

function onclick(event) {
    x = event.offsetX;
    y = event.offsetY;
    color = colors[Math.floor(Math.random() * colors.length)];
}

canvas.addEventListener("mousemove", onDraw);
canvas.addEventListener("click", onclick);