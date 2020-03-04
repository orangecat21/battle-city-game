import DisplayObject from './DisplayObject.js'


export default class Container extends DisplayObject {
    constructor() {
        super();
        this.displayObjects = [];
    }

    add(displayObject) {
        !this.displayObjects.includes(displayObject) && this.displayObjects.push(displayObject);
    }

    remove() { }

    draw(canvas, context) {
        for (const displayObject of this.displayObjects) {
            displayObject.draw(canvas, context);
        }
    }
}
