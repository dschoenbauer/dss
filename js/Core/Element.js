export function Element(tag, config = {}) {
	let props = ['innerText', 'innerHTML', 'title', 'textContent', 'id', 'draggable', 'href', 'src', 'value', "type", "target"];
	config = {
		...{ classes: "", classList: [], events: {}, style: {}, parent: false, children: [], data: {}, },
		...config
	};
	let ele = document.createElement(tag);
	props.forEach(prop => {
		if (config.hasOwnProperty(prop)) ele.setAttribute(prop, config[prop]);
	});
	let classes = config.classes.split(" ").filter(x => x.length > 0);
	[...classes, ...config.classList].forEach(cls => {
		ele.classList.add(cls);
	});
	for (let event in config.events) {
		ele.addEventListener(event, e => config.events[event](e, ele))
	}
	for (let key in config.data) {
		ele.setAttribute(`data-${key}`, config.data[key])
	}
	for (let s in config.style) {
		ele.style[s] = config.style[s];
	}
	if (config.parent) config.parent.appendChild(ele);
	config.children.forEach(child => {
		ele.append(child);
	})
	return ele;
}