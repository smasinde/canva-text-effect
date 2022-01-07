import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const header = document.createElement("header");
const logo = document.createElement("h1");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.id = "canvas1";

logo.textContent = "Aesthetics";
header.appendChild(logo);

app.appendChild(header);
app.appendChild(canvas);

window.onload = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;

    if (ctx !== null) {
        ctx.font = "250px Ariel";
        ctx.fillStyle = "#fff";
        ctx.fillText("Aesthetics", 0, 250);
        let imgData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data: Uint8ClampedArray = imgData.data;
        console.log(data);
        
        const startTime = performance.now();
        // new ContrastLine(ctx, 90, 20);
        for(let y = 0; y <= canvas.height; y++){
            console.log(data[y])
            for(let x = 0; x <= canvas.width; x+=4){
                console.log(data[x]);
            }
        }
        const endTime = performance.now();

        // ctx.putImageData(ctx.getImageData(0, 0, 100, 5), 0, 150,);
        // ctx.putImageData(ctx.getImageData(0, 0, 100, 5), 0, 200,);
        console.log(startTime, endTime);
    };
}
window.onresize = function () {
    canvas.width = window.innerWidth;

    if (ctx !== null) {
        ctx.font = "250px Ariel";
        ctx.fillStyle = "#fff";
        ctx.fillText("Aesthetics", 0, 250);
    };

}

class ContrastLine {
    #ctx;
    #startX;
    #startY;
    constructor(ctx: CanvasRenderingContext2D, startX: number, startY: number) {
        this.#ctx = ctx;
        this.#startX = startX;
        this.#startY = startY;
        this.#ctx.strokeStyle = "white";
        this.#ctx.lineWidth = 2.0;
        this.#draw(this.#startX, this.#startY);
    }

    #draw(x: number, y: number) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + 100, y);
        this.#ctx.stroke();
    }
}