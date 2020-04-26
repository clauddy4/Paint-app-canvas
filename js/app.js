import Paint from "./paint.class.js";
import {TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER} from './tools.js'

var paint = new Paint("canvas");
paint.activeTool = TOOL_LINE;
paint.lineWidth = 1;
paint.brushSize = 4;
paint.selectedColor = "#000000";
paint.init();

document.querySelectorAll("[data-command").forEach(item => {
    item.addEventListener("click", e => {
        console.log(item.getAttribute("data-command"));
    });
});

document.querySelectorAll("[data-tool]").forEach(item => {
    item.addEventListener("click", e => {
        document.querySelector("[data-tool].active").classList.toggle("active");
        item.classList.toggle("active");

        let selectedTool = item.getAttribute("data-tool");
        paint.activeTool = selectedTool;

        switch(selectedTool){
            case TOOL_LINE:
            case TOOL_RECTANGLE:
            case TOOL_TRIANGLE:
            case TOOL_CIRCLE:
            case TOOL_PENCIL:
                document.querySelector(".for-lines").style.display = "block";
                document.querySelector(".for-brush").style.display = "none";
                break;
            case TOOL_BRUSH:
            case TOOL_ERASER:
                document.querySelector(".group.for-lines").style.display = "none";
                document.querySelector(".group.for-brush").style.display = "block";
                break;
            default:
                document.querySelector(".group.for-brush").style.display = "none";
                document.querySelector(".group.for-lines").style.display = "none";
        }
    });
});

document.querySelectorAll("[data-line-width]").forEach(item => {
    item.addEventListener("click", e => {
        document.querySelector("[data-line-width].active").classList.toggle("active");
        item.classList.toggle("active");

        paint.lineWidth = item.getAttribute("data-line-width");

    });
});

document.querySelectorAll("[data-brush-size]").forEach(item => {
    item.addEventListener("click", e => {
        document.querySelector("[data-brush-size].active").classList.toggle("active");
        item.classList.toggle("active");

        paint.brushSize = item.getAttribute("data-brush-size");
    });
});

document.querySelectorAll("[data-color").forEach(item => {
    item.addEventListener("click", e => {
        document.querySelector("[data-color].active").classList.toggle("active");
        item.classList.toggle("active");

        let color = item.getAttribute("data-color");
        paint.selectedColor = color;
    });
});