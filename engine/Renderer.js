import Container from './Container.js'

export default class Renderer {
    constructor(args = {}) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.background = args.background || 'black';
        this.canvas.width = args.width || 50;
        this.canvas.height = args.height || 50;
        this.update = args.update || (() => { });

        this.stage = new Container()

        requestAnimationFrame(timestamp => this.tick(timestamp), this.canvas);
    }
    get displayObjects() {
        return _getDisplayObjects(this.stage);

        function _getDisplayObjects(container, result = []) {
            for (const displayObject of container.displayObjects) {
                if (displayObject instanceof GameEngine.Container) {
                    _getDisplayObjects(displayObject, result)
                }
                else result.push(displayObject);
            }
            return result;
        }
    }

    tick(timestamp) {
        this.update(timestamp);

        this.clear();
        this.render();
        requestAnimationFrame(timestamp => this.tick(timestamp), this.canvas);
    }

    render() {
        this.stage.draw(this.canvas, this.context);
    }


    clear() {

        this.context.fillStyle = this.background;
        this.context.beginPath();
        this.context.rect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fill();
    }
}