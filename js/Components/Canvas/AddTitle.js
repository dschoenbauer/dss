export class AddTitle {

	constructor(setTitle, renderEvent, x, y) {
		this.params = { setTitle, renderEvent, x, y, headline: "" }
	}

	visitCanvas(entity) {

		entity.page.on(this.params.setTitle, title => {
			this.params.headline = title;
			this.draw(entity);
		});

		entity.on(this.params.renderEvent, () => {
			this.draw(entity);
		});

	}

	draw(entity) {
		let ctx = entity.canvas.context;
		ctx.font = "20px Arial";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.fillText(this.params.headline, this.params.x, this.params.y);
	}
}