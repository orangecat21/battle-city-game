(function () {

    class Loader {
        constructor() {
            this.loadOrder = {
                images: [],
                jsons: []
            };
            this.resources = {
                images: {},
                jsons: {}
            };
        }

        addImage(name, src) {
            this.loadOrder.images.push({ name, src });
        }

        addJSON(name, src) {
            this.loadOrder.jsons.push({ name, src });
        }

        load(callback) {
            const promises = [];
            for (const imageData of this.loadOrder.images) {
                const { name, src } = imageData;
                const promise = Loader.loadImage(src)
                    .then(image => {
                        this.resources.images[name] = image;

                        if (this.loadOrder.images.includes(imageData)) {
                            const index = this.loadOrder.images.indexOf(imageData);
                            this.loadOrder.images.splice(index, 1);
                        }
                    })
                promises.push(promise);
            }

            for (const JSONData of this.loadOrder.jsons) {
                const { name, src } = JSONData;
                const promise = Loader.loadJSON(src)
                    .then(json => {
                        this.resources.jsons[name] = json;

                        if (this.loadOrder.jsons.includes(JSONData)) {
                            const index = this.loadOrder.jsons.indexOf(JSONData);
                            this.loadOrder.jsons.splice(index, 1);
                        }
                    })
                promises.push(promise);
            }
            Promise.all(promises)
                .then(callback);
        }

        static loadImage(src) {
            return new Promise((resolve, reject) => {
                try {
                    const image = new Image;
                    image.onload = () => resolve(image);
                    image.src = src;
                }
                catch (error) {
                    reject(error);
                }
            })
        }

        static loadJSON(src) {
            return new Promise((resolve, reject) => {
                fetch(src)
                    .then(response => {
                        if(response.status !== 200){
                            console.error(response.status + ':'+ response.statusText);
                            reject(response.status);
                        }
                        response.json()
                            .then(data => resolve(data))
                    })
                    .catch(err => reject(err));
            })
        }
    }


    window.GameEngine = window.GameEngine || {};
    GameEngine.Loader = Loader;

}());