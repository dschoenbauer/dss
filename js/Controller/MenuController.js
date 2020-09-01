import { Page } from "../Core/Page.js";
import { DefaultPageLayout } from "../Components/DefaultPageLayout.js";
import { MenuView } from "../View/MenuView.js";
import { MenuDataService } from "../Services/MenuDataServices.js";

export class MenuController {
	constructor(name) {
		this.params = { name }
	}
	visitApp(app) {
		const page = app.accept(new Page(this.params.name));
		page.accept(new MenuView("menuDataObjects"));
		page.accept(new MenuDataService("render", "menuDataObjects"));
	}
}