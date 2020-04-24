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
        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        console.log(e.clientX, e.clientY);
    }

    onMouseMove(e) {
        console.log(e.clientX, e.clientY);
    }

    onMouseUp(e) {
        this.canvas.onmouseup = null;
        document.onmouseup = null;
    }
}