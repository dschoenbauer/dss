export class DependencyManager {

	constructor(listenEvent, triggerEvent) {
		this.params = { listenEvent, triggerEvent }
		this.promises = []
	}

	visitCanvas(entity) {
		entity.on(this.params.listenEvent, promise => {
			this.promises.push(promise);
		});

		entity.on("init", () => {
			Promise.all(this.promises).then(data => {
				entity.trigger(this.params.triggerEvent);
			})
		});
	}
}