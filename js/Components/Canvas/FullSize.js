export class FullSize {
	visitCanvas(entity) {
		let resize = (node) => {
			let { clientWidth : width, clientHeight: height } = node.parentNode;
			Object.assign(node, { width, height })
		}

		resize(entity.canvas.dom);

		window.addEventListener("resize", () => {
			resize(entity.canvas.dom);
			entity.trigger("refresh");
		})
	}
}