import { EventManager } from "../Core/EventManager.js";

export class Page extends EventManager {
	constructor(name) {
		super();
		this.params = { name, app: false };
		this.isRendered = false;
	}

	visitApp(app) {
		this.setApp(app);
		app.on("show", (pageName) => {
			if (this.params.name !== pageName) return;
			this.trigger("render");
			this.isRendered = true;
		});

		app.on("clear", () => {
			if (!this.isRendered) return;
			this.trigger("clear");
			this.isRendered = false;
		});
	}

	accept(visitor) {
		visitor.visitPage(this);
		return visitor;
	}

	setApp(app) {
		this.params.app = app;
		return this;
	}

	getApp() {
		if (!this.params.app) throw new Error("App not set");
		return this.params.app;
	}
}
