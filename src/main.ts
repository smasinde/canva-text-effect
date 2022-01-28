import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const header = document.createElement("header");
header.style.backgroundColor = "black";
header.style.width = "100vw";
header.style.height = "75px";
header.style.color = "white";
header.style.display = "grid";
header.style.justifyContent = "space-between";
header.style.gridTemplateColumns = "33.3% 33.3% 33.3%"
header.style.alignItems = "center";
header.style.position = "fixed";
const logo = document.createElement("h1");
logo.style.gridColumnStart = "2";
const socialMedia = document.createElement("div");
socialMedia.textContent = "Twitter | Facebook | IG";

const openerContainer = document.createElement("div");

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

logo.textContent = "Aesthetics";
header.appendChild(logo);
header.appendChild(socialMedia);
app.appendChild(header);

window.onload = async function () {
    canvas = document.createElement("canvas");
    canvas.id = "canvas1";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ratio = 0.45;
    let fontSize = canvas.height * ratio;

    ctx = canvas.getContext("2d")!;

    openerContainer.appendChild(canvas);
    app.appendChild(openerContainer);

    if (ctx !== null) {
        ctx.filter = "blur(0.5px)";
        ctx.font = (fontSize | 0) + "pt serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        const startTime = performance.now();

        const possibleColors = ["brown", "red", "green", "blue", "white", "gold", "#6667AB"];
        const colors = ['red', 'purple', 'teal', 'orange', 'indigo', "yellow", "black"];

        let currentIndex = 0;
        let textColor = possibleColors[0];
        let linesArray: Line[] = [];
        let boxesArray: Box[] = [];

        ctx.globalCompositeOperation = "xor";

        // refactor to use requestanimation???
        function animate() {
            // rotate through colors for the squares
            if (currentIndex !== possibleColors.length - 1) currentIndex++;
            else currentIndex = 0;

            textColor = possibleColors[currentIndex];

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "source-over"
            ctx.fillStyle = textColor;
            ctx.fillText("Aesthetics", canvas.width / 2, canvas.height / 1.8, canvas.width);

            ctx.globalCompositeOperation = "xor";
            setTimeout(() => renderLine({ context: ctx, canvasx: canvas, orientation: Orientation.Vertical, lines: linesArray }), 10);
            setTimeout(() => renderLine({ context: ctx, canvasx: canvas, orientation: Orientation.Horizontal, lines: linesArray }), 15);
            setTimeout(() => renderLine({ context: ctx, canvasx: canvas, orientation: Orientation.Horizontal, lines: linesArray }), 55);
            // renderLine({ context: ctx, canvasx: canvas, orientation: Orientation.Horizontal, lines: linesArray });
            setTimeout(() => renderLine({ context: ctx, canvasx: canvas, orientation: Orientation.Vertical, lines: linesArray }), 95);
            setTimeout(() => renderLine({ context: ctx, canvasx: canvas, orientation: Orientation.Vertical, lines: linesArray }), 135);
            setTimeout(() => renderLine({ context: ctx, canvasx: canvas, orientation: Orientation.Horizontal, lines: linesArray }), 275);
            // renderLine({ context: ctx, canvasx: canvas, orientation: Orientation.Vertical, lines: linesArray });
            // renderLine({ context: ctx, canvasx: canvas, orientation: Orientation.Vertical, lines: linesArray });

            linesArray.forEach(value => ctx.fillRect(value.x, value.y, value.w, value.h));

            ctx.globalCompositeOperation = "source-over";

            generateBoxes({ canvas: canvas, boxes: boxesArray, color: colors[Math.floor(Math.random() * colors.length - 1)] });
            boxesArray.forEach(value => {
                ctx.fillStyle = value.color;
                ctx.fillRect(value.x, value.y, value.w, value.h);
            });
            setTimeout(() => requestAnimationFrame(animate), Math.floor(Math.random() * (250 - 200) + 200));
        };
        animate();
        const endTime = performance.now();

        console.log(startTime, endTime);
    };
}
type Box = {
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
}
type Line = {
    x: number,
    y: number,
    w: number,
    h: number
};

enum Orientation {
    Horizontal,
    Vertical,
}

let getRandomNumber = (max: number) => Math.floor(Math.random() * max);
let generateBoxes = ({ canvas, color, boxes }: { canvas: HTMLCanvasElement, color: string, boxes: Box[] }) => {
    boxes.push({
        x: getRandomNumber(canvas.width), y: getRandomNumber(canvas.height), w: getRandomNumber(18), h: getRandomNumber(18), color: color
    })
}

function renderLine(
    { context, canvasx, orientation, lines }:
        { context: CanvasRenderingContext2D, canvasx: HTMLCanvasElement, orientation: Orientation, lines: Line[] }) {
    let lineData: ImageData;
    let startPointX = getRandomNumber(canvas.width);
    let startPointY = getRandomNumber(canvas.height);
    let lineWidth = orientation === Orientation.Horizontal ? getRandomNumber(95) : 2.4;
    let lineHeight = orientation === Orientation.Vertical ? getRandomNumber(75) : 2.4;

    if ((startPointX + lineWidth) > canvasx.width) {
        return;
    }
    if (startPointX < 30) {
        return;
    }
    if ((startPointY - lineHeight) < 0) {
        startPointY += (startPointY - lineHeight) + 35;
    }
    try {
        lineData = context.getImageData(startPointX, startPointY, lineWidth, lineHeight);
    } catch {
        return;
    }

    for (var i = 0; i < lineData.data.length; i += 4) {
        if (lineData.data[i] !== 0 || lineData.data[i + 1] !== 0 || lineData.data[i + 2] !== 0) {
            if ((startPointX + lineWidth) < canvas.width)
                lines.push({ x: startPointX, y: startPointY, w: lineWidth, h: lineHeight });
            break;
        }
    }
}