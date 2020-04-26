import {TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_BUCKET, TOOL_ERASER} from './tools.js';
import {getMouseCoordinates, findDistance} from '../utils/utils.js';
import Fill from "./fill.class.js";

export default class Paint {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext("2d")
    }

    set activeTool(tool) {
        this.tool = tool;
    }

    set lineWidth(linewidth) {
        this._lineWidth = linewidth;
        this.context.lineWidth = this._lineWidth;
    }

    set brushSize(brushsize) {
        this._brushSize = brushsize;
    }

    set selectedColor(color) {
        this.color = color;
        this.context.strokeStyle = this.color;
    }

    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e) {
        this.saveData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.height);

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPosition = getMouseCoordinates(e, this.canvas);

        if (this.tool == TOOL_PENCIL || this.tool == TOOL_BRUSH) {
            this.context.beginPath();
            this.context.moveTo(this.startPosition.x, this.startPosition.y);
        } else if (this.tool == TOOL_BUCKET) {
            new Fill(this.canvas, this.startPosition, this.color);
        } else if (this.tool == TOOL_ERASER) {
            this.context.clearRect(this.startPosition.x, this.startPosition.y, this._brushSize, this._brushSize)
        }
    }

    onMouseMove(e) {
        this.currentPosition = getMouseCoordinates(e, this.canvas);

        switch(this.tool) {
            case TOOL_LINE:
            case TOOL_RECTANGLE:
            case TOOL_CIRCLE:
            case TOOL_TRIANGLE:
                this.drawShape();
                break;
            case TOOL_PENCIL:
                this.drawFreeLine(this._lineWidth);
                break;
            case TOOL_BRUSH:
                this.drawFreeLine(this._brushSize);
                break;
            case TOOL_ERASER:
                this.context.clearRect(this.currentPosition.x, this.currentPosition.y, this._brushSize, this._brushSize)
            default:
                break;
        }
    }

    onMouseUp(e) {
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    drawShape() {
        this.context.putImageData(this.saveData, 0, 0);
        this.context.beginPath();

        if (this.tool == TOOL_LINE) {
            this.context.moveTo(this.startPosition.x, this.startPosition.y);
            this.context.lineTo(this.currentPosition.x, this.currentPosition.y);

        } else if (this.tool == TOOL_RECTANGLE) {
            this.context.rect(this.startPosition.x, this.startPosition.y, this.currentPosition.x - this.startPosition.x, this.currentPosition.y - this.startPosition.y);

        } else if (this.tool == TOOL_CIRCLE) {
            let distance = findDistance(this.startPosition, this.currentPosition);
            this.context.arc(this.startPosition.x, this.startPosition.y, distance, 0, 2 * Math.PI, false);

        } else if (this.tool == TOOL_TRIANGLE) {
            this.context.moveTo(this.startPosition.x + (this.currentPosition.x - this.startPosition.x) / 2, this.startPosition.y)
            this.context.lineTo(this.startPosition.x, this.currentPosition.y);
            this.context.lineTo(this.currentPosition.x, this.currentPosition.y);
            this.context.closePath();
        }
        this.context.stroke();
    }

    drawFreeLine(lineWidth) {
        this.context.lineWidth = lineWidth;
        this.context.lineTo(this.currentPosition.x, this.currentPosition.y);
        this.context.stroke();
    }
}