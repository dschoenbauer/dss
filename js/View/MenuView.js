import { DefaultPageLayout, DefaultPageLayoutTargets } from "../Components/DefaultPageLayout.js";
import { Canvas } from "../Components/Canvas.js";
import { FullSize } from "../Components/Canvas/FullSize.js";
import { Animation } from "../Components/Canvas/Animation.js";
import { AddBackground } from "../Components/Canvas/AddBackground.js";
import { DependencyManager } from "../Components/Canvas/DependencyManager.js";
import { MenuItems } from "../Components/Canvas/MenuItems.js";
import { KeyCommands } from "../Components/KeyCommands.js";
import { StateManager } from "../Components/StateManager.js";

export class MenuView {
	constructor(dataEvent, dataTrigger) {
		this.params = { dataEvent, dataTrigger }
	}
	visitPage(page) {
		const url = "http://mlb.mlb.com/mlb/images/devices/ballpark/1920x1080/1.jpg";
		page.accept(new DefaultPageLayout(page.params.app.config.rootElement));
		page.accept(new Canvas(DefaultPageLayoutTargets.body, [
			new DependencyManager("registerDependency", "initialDraw"),
			new FullSize(),
			new Animation(100),
			new AddBackground(url, "registerDependency"),
			new MenuItems(this.params.dataEvent, "nextItem", "previousItem")
		]));
		page.accept(new KeyCommands({
			"ArrowUp": "previousDay",
			"ArrowDown": "nextDay",
			"ArrowLeft": "previousItem",
			"ArrowRight": "nextItem",
		}));
		page.accept(new StateManager("render", "previousDay", "nextDay", this.params.dataTrigger))
	}
}