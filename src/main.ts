import './style.css'
// @ts-ignore
import pic from './assets/pic.jpg';

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
        // const textWidth = ctx.measureText("Aesthetics").width;
        let linesArray: Array<Contrastline> = [];
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        const startTime = performance.now();
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

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const possibleColors = ["white", "red", "green", "blue"];
        let textColor = "white";

        ctx.fillStyle = textColor;
        ctx.fillText("Aesthetics", canvas.width / 2, canvas.height / 2);

        setInterval(() => {
            textColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
            console.log(textColor);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = textColor;
            ctx.fillText("Aesthetics", canvas.width / 2, canvas.height / 2);
        }, 1000);
        // setTimeout(() => {
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
        //     ctx.fillRect(0, 0, canvas.width, canvas.height);
        //     ctx.fillStyle = "red";
        //     ctx.fillText("Aesthetics", canvas.width / 2, canvas.height / 2);

        //     console.log("change");
        // }, 1000)
        // init();

        async function animate() {

            // for (let i = 0; i < linesArray.length; i++) {
            //     linesArray[i].update();
            //     linesArray[i].draw();
            // }
            requestAnimationFrame(animate);
        }
        // animate();
        const endTime = performance.now();

        // ctx.putImageData(ctx.getImageData(0, 0, 100, 5), 0, 150,);
        // ctx.putImageData(ctx.getImageData(0, 0, 100, 5), 0, 200,);
        console.log(startTime, endTime);
    };
}