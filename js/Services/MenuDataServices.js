export class MenuDataService {
	constructor(listenEvent, publishEvent) {
		this.params = { listenEvent, publishEvent };
	}

	visitPage(page) {
		page.on(this.params.listenEvent, date => {
			if (!date) date = new Date();
			this.date = date;
			let url = `http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=${this.formatDate(date)}&sportId=1`;
			fetch(url).then(r => r.json()).then(data => {
				page.trigger(this.params.publishEvent, this.parseData(data));
			});
		})
	}

	parseData(data) {
		let results = [];
		let [date] = data.dates;
		date.games.forEach(game => {
			try {
				let { headline, blurb, image: { cuts: [{ src, width, height }] } } = game.content.editorial.recap.mlb;
				results.push({ headline, blurb, src, width, height });
			} catch (error) {
				//console.error(error);
			}
		});
		let title = this.getTitle(results);
		return { title, results };
	}


	getTitle(results) {
		let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return `${new Intl.DateTimeFormat('en-US', options).format(this.date)} - ${results.length} stories`;
	}

	formatDate(date) {
		let mm = date.getMonth() + 1; // getMonth() is zero-based
		let dd = date.getDate();

		return [date.getFullYear(),
		(mm > 9 ? '' : '0') + mm,
		(dd > 9 ? '' : '0') + dd
		].join('-');
	}
}