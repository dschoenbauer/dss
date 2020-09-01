import { MenuItem } from "../Entity/MenuItem.js";

export class MenuItems {
	constructor(dataService, nextItemEvent, previousEvent, renderTitleEvent, setTitleEvent) {
		this.params = { dataService, nextItemEvent, previousEvent, renderTitleEvent, setTitleEvent, title: "" }
		this.initialVisibleItems = [null, null, 0, 1, 2];
		this.selectedItem = 2;
	}

	visitCanvas(entity) {
		this.entity = entity;
		entity.page.on(this.params.nextItemEvent, () => {
			let max = Math.max(...this.visibleItems) + 1;
			if (max > this.items.length - 1) {
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

		let promise = new Promise(resolve => {
			entity.on("initialDraw", () => {
				resolve();
			})
		})

		entity.page.on(this.params.dataService, ({title, results:items }) => {
			promise.then(() => {
				this.dom = entity.canvas.dom;
				this.canvas = entity.canvas;
				
				this.collectItems(items, entity);
				entity.page.trigger(this.params.setTitleEvent, title);
				entity.trigger("refresh");
			})
		});

		entity.on("refresh", () => {
			this.renderItems();
		})

	}
	collectItems(items) {
		this.items = [];
		this.visibleItems = [...this.initialVisibleItems];
		items.forEach(item => {
			this.items.push(new MenuItem(item, this.canvas));
		});
		return this;
	}

	renderItems() {
		let pos = 0;
		this.visibleItems.forEach(visibleIdx => {
			let item = this.items[visibleIdx];
			if (visibleIdx !== null & !!item) {
				let { x, y, h, w } = this.getPostition(pos, item, this.dom);
				item.render(x, y, h, w, pos, this.selectedItem);
			}
			pos++;
		});
		this.entity.trigger(this.params.renderTitleEvent);
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