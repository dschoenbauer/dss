import { Element } from "../Core/Element.js";
import { EventManager } from "../Core/EventManager.js";

export class Canvas extends EventManager {
	constructor(target, visitors = []) {
		super();
		this.params = { target, visitors };
		this.promises = [];
	}

	visitPage(page) {
		this.page = page;
		page.on(this.params.target, parent => {
			this.canvas = this.render(parent);
			this.params.visitors.forEach(visitor => {
				this.accept(visitor);
			});
			this.trigger("init");
		})
	}

	accept(visitor) {
		visitor.visitCanvas(this);
		return visitor;
	}

	render(parent) {
		const dom = Element("canvas", { classes: "canvas", parent });
		const context = dom.getContext('2d');
		return { dom, context };
	}
}