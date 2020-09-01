import { MenuItem } from "../Entity/MenuItem.js";

export class MenuItems {
	constructor(dataService, nextItemEvent, previousEvent) {
		this.params = { dataService, nextItemEvent, previousEvent }
		this.visibleItems = [null, null, 0, 1, 2];
		this.selectedItem = 2;
	}

	visitCanvas(entity) {
		let promise = new Promise(resolve => {
			entity.on("initialDraw", () => {
				resolve();
			})
		})

		entity.page.on(this.params.nextItemEvent, () => {
			let max = Math.max(...this.visibleItems) + 1;
			if (max > this.visibleItems.length + 1) {
				if (this.visibleItems[this.selectedItem + 1] === null) return;
				max = null;
			}
			this.visibleItems.push(max);
			this.visibleItems.shift();
			entity.trigger("refresh");
		})

		entity.page.on(this.params.previousEvent, () => {
			let min = Math.min(...this.visibleItems.filter(x => {
				return x !== null;
			})) - 1;
			if (min < 0) {
				if (this.visibleItems[this.selectedItem - 1] === null) return;
				min = null;
			}
			this.visibleItems.unshift(min);
			this.visibleItems.pop();
			entity.trigger("refresh");
		})

		entity.page.on(this.params.dataService, items => {
			promise.then(() => {
				this.dom = entity.canvas.dom;
				this.canvas = entity.canvas;
				this.collectItems(items, entity);
				this.renderItems();
			})
		});

		entity.on("refresh", () => {
			this.renderItems();
		})

	}
	collectItems(items) {
		this.items = [];
		items.forEach(item => {
			this.items.push(new MenuItem(item, this.canvas));
		});
		return this;
	}

	renderItems() {
		let pos = 0;
		this.visibleItems.forEach(visibleIdx => {
			let item = this.items[visibleIdx];
			if (visibleIdx !== null) {
				let { x, y, h, w } = this.getPostition(pos, item, this.dom);
				item.render(x, y, h, w, pos, this.selectedItem);
			}
			pos++;
		});
	}

	getPostition(position, item, dom) {
		let x = 0, y = 0, h = 0, w = 0, gap = 10, i = this.visibleItems.length;
		let { height: cHeight, width: cWidth } = dom;
		let { height: iHeight, width: iWidth } = item.params.data;
		h = cHeight * 0.25;
		y = (cHeight / 2) - (h / 2);
		w = (cWidth - (i * gap)) / (i - 1);
		x = (w * position) + (gap * position) - (w/2);
		return { h, w, x, y };
	}
}