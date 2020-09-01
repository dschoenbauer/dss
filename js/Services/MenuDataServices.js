export class MenuDataService {
	constructor(listenEvent, publishEvent) {
		this.params = { listenEvent, publishEvent };
	}


	visitPage(page) {
		page.on(this.params.listenEvent, () => {
			let url = "http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=2018-06-10&sportId=1";
			url = "http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=2020-08-28&sportId=1";
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
				console.error(error);
			}
		});
		return results;
	}
}