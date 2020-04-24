import Point from "./point.model.js";
import {TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH} from './tools.js';
import {getMouseCoordinates, findDistance} from '../utils/utils.js';

export default class Paint {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext("2d")
    }

    set activeTool(tool){
        this.tool = tool;
    }

    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e) {
        this.saveData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.height);

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPosition = getMouseCoordinates(e, this.canvas);
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
}