import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const header = document.createElement("header");
const logo = document.createElement("h1");
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

logo.textContent = "Aesthetics";
header.appendChild(logo);

app.appendChild(header);

window.onload = function () {
    canvas = document.createElement("canvas");
    canvas.id = "canvas1";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;

    const ratio = 0.80;
    let fontSize = canvas.height * ratio;

    ctx = canvas.getContext("2d")!;

    app.appendChild(canvas);

    if (ctx !== null) {
        ctx.font = (fontSize | 0) + "px serif";
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const textWidth = ctx.measureText("Aesthetics").width;
        let linesArray: Array<Contrastline> = [];
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        const startTime = performance.now();
        let mappedImage = [];
        
        for (let y = 0; y < canvas.height; y++) {
            let row = [];
            for (let x = 0; x < canvas.width; x++) {
                const black = pixels.data[(y * 4 * pixels.width) + (x * 4)];
            }
        }
        class Contrastline {
            x: number;
            y: number;
            size: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = 0;
                this.size = Math.random() * 1.5 + 1
            }

            update() {
                this.y += Math.random() * 3.5;
                if (this.y >= canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'white';
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + 50, this.y);
                ctx.stroke();
            }
        }
        async function init() {
            for (let i = 0; i < 500; i++) {
                linesArray.push(new Contrastline());
            }
        }
        init();
        async function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#fff";
            ctx.fillText("Aesthetics", canvas.width / 2, canvas.height / 2);
            for (let i = 0; i < linesArray.length; i++) {
                linesArray[i].update();
                linesArray[i].draw();
            }
            requestAnimationFrame(animate);
        }
        animate();
        const endTime = performance.now();

        // ctx.putImageData(ctx.getImageData(0, 0, 100, 5), 0, 150,);
        // ctx.putImageData(ctx.getImageData(0, 0, 100, 5), 0, 200,);
        console.log(startTime, endTime);
    };
}