export class AddText {

	constructor(renderEvent, text, config) {
		//Would build this out more
		config = {
			...{
				placement: "lr",
				font: "20px Arial",
				textAlign: "right",
				textBaseline: "bottom",
				fillStyle: "white",
				globalAlpha: 0.2
			}, ...config
		};
		this.params = { renderEvent, text, config }
	}

	visitCanvas(entity) {
		entity.on(this.params.renderEvent, () => {
			this.draw(entity);
		});
	}

	draw(entity) {
		let ctx = entity.canvas.context;
		Object.assign(ctx, this.params.config);

		let x = entity.canvas.dom.width - 10;
		let y = entity.canvas.dom.height - 10;

		ctx.fillText(this.params.text, x, y);
		ctx.globalAlpha = 1;
	}
}