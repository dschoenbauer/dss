export class Animation {

	visitCanvas(entity) {
		entity.on("animateScene", (config) => {
			config = {
				...{ scene: 'default', totalFrames: 100 },
				...config
			};
			const {totalFrames, scene} = config;
			let currentFrame = 0;
			const runAnimation = () => {
				entity.trigger("clear");
				entity.trigger('animate', { scene, currentFrame, totalFrames, progress: currentFrame / totalFrames });
				if (currentFrame < totalFrames) requestAnimationFrame(runAnimation);
				currentFrame++;
			};
			runAnimation();

		});

		let { width, height } = entity.canvas.dom;
		entity.on("clear", () => {
			entity.canvas.context.clearRect(0, 0, width, height);
		});
	}
}