import { EventManager } from "./EventManager.js";

export class App extends EventManager {

	constructor(config) {
		super();

		this.config = {
			...{ rootElement: false },
			...config
		};
	}

	accept(visitor) {
		visitor.visitApp(this);
		return visitor;
	}
}
