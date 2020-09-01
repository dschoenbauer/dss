import { App } from "./Core/App.js";
import { MenuController } from "./Controller/MenuController.js";

let app = new App({ rootElement: document.querySelector("#app") });
app.accept(new MenuController("menu"));
app.trigger("show", "menu");