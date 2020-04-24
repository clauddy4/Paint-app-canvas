import Point from "../js/point.model.js";
import {TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH} from '../js/tools.js'

export function getMouseCoordinates(e, canvas) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    return new Point(x, y); //{x:x, y:y}
}

export function findDistance(startPoint, endPoint) {
    let exp1 = Math.pow(endPoint.x - startPoint.x, 2);
    let exp2 = Math.pow(endPoint.y - startPoint.y, 2);

    return Math.sqrt(exp1 + exp2);
}