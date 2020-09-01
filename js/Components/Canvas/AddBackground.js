import { cover } from "../../Core/Cover.js";

export class AddBackground {
	constructor(imgPath, dependencyPromiseEvent) {
		this.params = { dependencyPromiseEvent };
		this.imagePromise = this.loadImage(imgPath);
	}

	loadImage(imgPath) {
		this.image = new Image();
		return new Promise((resolve, reject) => {
			this.image.addEventListener("load", () =>{
				resolve(imgPath);
			});
			this.image.addEventListener("error", ()=>{
				reject();
			})
			this.image.src = imgPath;
		})
	}

	visitCanvas(entity) {
		entity.trigger(this.params.dependencyPromiseEvent, this.imagePromise);

		entity.on("initialDraw", () => {
			this.draw(entity);
		})
		entity.on("refresh", ()=>{
			this.draw(entity);
		})
	}

	draw(entity){
		let { width, height } = entity.canvas.dom;
		let pos = cover({ width, height }, this.image);
		let y = (height / 2) - (pos.height / 2)
		let x = (width / 2) - (pos.width / 2)
		entity.canvas.context.drawImage(this.image, x, y, pos.width, pos.height);
	}

}