import {TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_BUCKET, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER} from './tools.js'

document.querySelectorAll("[data-command").forEach(item => {
    item.addEventListener("click", e => {
        console.log(item.getAttribute("data-command"));
    });
});

document.querySelectorAll("[data-tool]").forEach(item => {
    item.addEventListener("click", e => {
        document.querySelector("[data-tool].active").classList.toggle("active");
        item.classList.toggle("active");

        let selectedTool = item.getAttribute("data-tool")

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
                document.querySelector(".group.for-lines").style.display = "none";
                document.querySelector(".group.for-brush").style.display = "block";
                break;
            default:
                document.querySelector(".group.for-brush").style.display = "none";
                document.querySelector(".group.for-lines").style.display = "none";
        }
    });
});

document.querySelectorAll("[data-line-width").forEach(item => {
    item.addEventListener("click", e => {
        document.querySelector("[data-line-width].active").classList.toggle("active");
        item.classList.toggle("active");
    });
});

document.querySelectorAll("[data-color").forEach(item => {
    item.addEventListener("click", e => {
        document.querySelector("[data-color].active").classList.toggle("active");
        item.classList.toggle("active");
    });
});