export class AddCircleGrid {

	constructor(config) {
		this.config = {
			...{
				wide: 2,
				tall: 2,
				gap: 10
			}, ...config
		}
	}

	visitCanvas(entity) {
		let { gap, wide, tall } = this.config;
		let { width, height } = entity.canvas.dom;

		let calcDistance = (distance, count, gap) => (distance - (gap * (count + 1))) / count
		let itemWidth = calcDistance(width, wide, gap);
		let itemHeight = calcDistance(height, tall, gap);

		let c = entity.canvas.context;
		for (let y = 0; y < tall; y++) {
			for (let x = 0; x < wide; x++) {
				let xPos = (x * (gap + itemWidth)) + gap;
				let yPos = (y * (gap + itemHeight)) + gap;
				// c.fillRect(xPos, yPos, itemWidth, itemHeight);
				c.beginPath();
				c.arc(xPos, yPos, itemWidth / 2, 0, Math.PI * 2);
				c.fill();
			}
		}
	}
}