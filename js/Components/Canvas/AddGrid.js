export class AddGrid {

	constructor(config) {
		this.config = {
			...{
				wide: 2,
				tall: 2,
				gap: 10
			}, ...config
		}
	}

	addImage(ctx, width, height) {
		return new Promise((resolve => {
			let img = new Image();
			let cover = (container, image) => {
				const imgRatio = image.height / image.width;
				const containerRatio = container.height / container.width;
				if(containerRatio > imgRatio){
					return {
						height: container.height,
						width: Math.floor(image.width * (container.height / image.height))
					}
				}
				return {
					height: Math.floor(image.height * (container.width / image.width)),
					width: container.width
				}
			}

			img.src = "http://mlb.mlb.com/mlb/images/devices/ballpark/1920x1080/1.jpg";;
			img.onload = () => {
				let pos = cover({width, height}, img);
				let y = (height / 2) - (pos.height / 2)
				let x = (width / 2) - (pos.width / 2)
				ctx.drawImage(img, x, y, pos.width, pos.height);
				resolve();
			}
		}))
	}

	visitCanvas(entity) {
		let c = entity.canvas.context;
		let { gap, wide } = this.config;
		let { width, height } = entity.canvas.dom;
		let itemWidth = (width - (wide + 1 ) * gap) / wide;
		let itemHeight = itemWidth * (6 / 9);
		let yPos = (height / 2) - (itemHeight / 2);

		this.addImage(c, width, height).then(() => {
			for (let x = 0; x < wide; x++) {
				let xPos = (x * (gap + itemWidth)) + gap;
				c.globalAlpha = 0.2;
				c.fillStyle = "white";
				c.fillRect(xPos, yPos, itemWidth, itemHeight);
				c.globalAlpha = 1.0;
			}
		})
	}
}