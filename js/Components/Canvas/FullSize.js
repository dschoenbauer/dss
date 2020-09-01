export class FullSize {
	visitCanvas(entity) {
		let resize = (node) => {
			let { width, height } = node.parentNode.getBoundingClientRect();
			Object.assign(node, { width, height })
		}

		resize(entity.canvas.dom);
	
		window.addEventListener("resize", () => {
			resize(entity.canvas.dom);
			entity.trigger("refresh");
		})
	}
}