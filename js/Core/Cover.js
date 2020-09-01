export function cover(container, image) {
	const imgRatio = image.height / image.width;
	const containerRatio = container.height / container.width;
	if (containerRatio > imgRatio) {
		return {
			height: container.height,
			width: Math.floor(image.width * (container.height / image.height))
		}
	}
	return {
		height: Math.floor(image.height * (container.width / image.width)),
		width: container.width
	}
}
