import Point from "./point.model.js";

export default class Fill {
    constructor(canvas, point, color) {
        this.context = canvas.getContext("2d");
        this.imageData = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);

        const targetColor = this.getPixel(point);
        const fillColor = this.hexToRgba(color);

        this.fillStack = [];
        this.floodFill(point, targetColor, fillColor);
        this.fillColor();
    }

    floodFill(point, targetColor, fillColor) {
        if (this.colorsMatch(targetColor, fillColor)) return;

        const currentColor = this.getPixel(point);
        if (this.colorsMatch(currentColor, targetColor)) {
            this.setPixel(point, fillColor);

            this.fillStack.push([new Point(point.x + 1, point.y), targetColor, fillColor]);
            this.fillStack.push([new Point(point.x - 1, point.y), targetColor, fillColor]);
            this.fillStack.push([new Point(point.x, point.y + 1), targetColor, fillColor]);
            this.fillStack.push([new Point(point.x, point.y - 1), targetColor, fillColor]);
        }
    }

    fillColor() {
        if(this.fillStack.length) {
            let range = this.fillStack.length;

            for(let i = 0; i < range; i++) {
                this.floodFill(this.fillStack[i][0], this.fillStack[i][1], this.fillStack[i][2]);
            }
            this.fillStack.splice(0, range)
            this.fillColor();
        } else {
            this.context.putImageData(this.imageData, 0, 0);
            this.fillStack = [];
        }
    }

    getPixel(point) {
        if (point.x < 0 || point.y < 0 || point.x >= this.imageData.width || point.y >= this.imageData.height) {
            return [-1, -1, -1, -1]
        } else {
            const offset = (point.y * this.imageData.width + point.x) * 4;
            return [
                this.imageData.data[offset + 0], //red
                this.imageData.data[offset + 1], //green
                this.imageData.data[offset + 2], //blue
                this.imageData.data[offset + 3] //alpha
            ]
        }
    }

    setPixel(point, fillColor) {
        const offset = (point.y * this.imageData.width + point.x) * 4;
        this.imageData.data[offset + 0] = fillColor[0],
        this.imageData.data[offset + 1] = fillColor[1],
        this.imageData.data[offset + 2] = fillColor[2],
        this.imageData.data[offset + 3] = fillColor[3]
    }

    colorsMatch(colorA, colorB) {
        return colorA[0] === colorB[0] && colorA[1] === colorB[1]
            && colorA[2] === colorB[2] && colorA[3] === colorB[3]
    }

    hexToRgba(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            255
        ] : null;
    }
}