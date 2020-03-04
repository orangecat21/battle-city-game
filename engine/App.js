import Container from './Container.js';
import Loader from './Loader.js';
import Renderer from './Renderer.js';
import Sprite from './Sprite.js';


let sprite = null;
const loader = new Loader;
const renderer = new Renderer(
    {
        width: 1000,
        height: 500,
        background: 'gray',
        update(timestamp) {
            if (!sprite) return;
        }
    }
);
loader.addImage('night', 'static/night.jpg');
loader.addJSON('persons', 'static/persons.json')
loader.load(() => {
    sprite = new Sprite(loader.getImage('night'), {
        scale:0.45,
    });
    const container = new Container;
    container.add(sprite);
    renderer.stage.add(container);
});

document.body.appendChild(renderer.canvas);