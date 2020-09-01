export class KeyCommands {
	constructor(keys) {
		this.params = { keys }
	}

	visitPage(page) {
		for (const key in this.params.keys) {
			document.addEventListener("keydown", e => {
				if (e.code === key) {
					page.trigger(this.params.keys[key]);
				}
			});
		}
	}
}
