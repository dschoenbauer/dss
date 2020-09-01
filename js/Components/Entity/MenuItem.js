import { cover } from "../../Core/Cover";

export class MenuItem {
	constructor(data, { context }) {
		this.params = { data, context };

		this.pImage = new Promise(resolve => {
			this.image = new Image();
			this.image.addEventListener("load", () => {
				resolve();
			})
		})
	}

	render(x, y, h, w, pos, idx) {
		if (!this.image.hasAttribute('src')) {
			let { src } = this.params.data;
			this.image.src = src;
		}
		this.pImage.then(() => {
			let ctx = this.params.context;
			let { height, width, headline, blurb } = this.params.data;
			let r = h < w ? { rh: h / w, rw: 1 } : { rw: w / h, rh: 1 };

			let tw = w * 1.5, th = h * 1.5, tx = x - ((tw - w) / 2), ty = y - ((th - h) / 2);

			if (pos === idx) {
				this.addTitle(ctx, headline, tx + (tw / 2), ty - 10);
				this.addDescription(ctx, blurb, tx, ty + th + 10, tw, 16);
				ctx.drawImage(this.image, 0, 0, r.rw * width, r.rh * height, tx, ty, tw, th);
				return;
			}
			let offset = (pos > idx) ? x - tx : tx - x;
			ctx.drawImage(this.image, 0, 0, r.rw * width, r.rh * height, x + offset, y, w, h);
		});
	}
	
	unload(){

	}

	addTitle(ctx, headline, x, y) {
		ctx.font = "16px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "bottom";
		ctx.fillStyle = "white";
		ctx.fillText(headline, x, y);
	}

	addDescription(ctx, text, x, y, maxWidth, lineHeight) {
		ctx.font = "12px Arial";
		ctx.textAlign = "start";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		this.wrapText(ctx, text, x, y, maxWidth, lineHeight);

	}

	wrapText(context, text, x, y, maxWidth, lineHeight) {
		let words = text.split(' ');
		let line = '';

		for (let n = 0; n < words.length; n++) {
			let testLine = line + words[n] + ' ';
			let metrics = context.measureText(testLine);
			let testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) {
				context.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
			}
			else {
				line = testLine;
			}
		}
		context.fillText(line, x, y);
	}
}