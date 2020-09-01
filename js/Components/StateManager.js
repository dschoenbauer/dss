export class StateManager {
	constructor(initialPullEvent, previousEvent, nextEvent, dataEventPullEvent) {
		this.params = { initialPullEvent, previousEvent, nextEvent, dataEventPullEvent };
		this.date = new Date();
		this.endDate = new Date();
	}

	visitPage(page) {
		let triggerCommonEvents = (offset) => {
			this.date.setDate(this.date.getDate() + offset);
			let now = new Date((new Date()).setHours(0, 0, 0, 0));
			this.date = this.date > now ? now : this.date;
			page.trigger(this.params.dataEventPullEvent, this.date);
		}

		page.on(this.params.initialPullEvent, () => {
			triggerCommonEvents(0);
		})

		page.on(this.params.nextEvent, () => {
			triggerCommonEvents(1);
		});

		page.on(this.params.previousEvent, () => {
			triggerCommonEvents(-1);
		});
	}
}