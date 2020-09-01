export class EventManager {
	constructor() {
		this.events = {};
	}

	on(event, callback) {
		if (!this.events.hasOwnProperty(event)) this.events[event] = [];
		this.events[event].push(callback);
	}

	trigger(event, payload) {
		if (!this.events.hasOwnProperty(event)) return false;
		this.events[event].forEach(event => {
			event(payload);
		});
		return true;
	}
}