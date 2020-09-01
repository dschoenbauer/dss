import { Element } from "../Core/Element.js";

export class DefaultPageLayout {
	constructor(parent) {
		this.params = { parent };
	}

	visitPage(page) {
		page.on("render", () => {
			page.trigger(DefaultPageLayoutTargets.body, this.render(this.params.parent));
		});
		page.on("clear", () => {
			this.params.parent.querySelectorAll("*").forEach((n) => n.remove());
		});
	}

	render(parent) {//There could a more complicated layout our built here... but not today);
		return parent;
	}
}

export const DefaultPageLayoutTargets = {
	body: "addToBody"
}