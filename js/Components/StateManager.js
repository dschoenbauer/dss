export class StateManager {
	constructor(initialPullEvent,  previousEvent, nextEvent, dataEventPullEvent) {
		this.params = { initialPullEvent, previousEvent, nextEvent, dataEventPullEvent };
		this.date = new Date();
		this.endDate = new Date();
	}

	visitPage(page) {
		page.on(this.params.initialPullEvent, () => {
			console.log("test");
			page.trigger(this.params.dataEventPullEvent, this.date);
		})

		page.on(this.params.nextEvent, () => {
			this.date.setDate(this.date.getDate() + 1);
			page.trigger(this.params.dataEventPullEvent, this.date);
		});

		page.on(this.params.previousEvent, () => {
			this.date.setDate(this.date.getDate() - 1);
			page.trigger(this.params.dataEventPullEvent, this.date);
		});

	}
}