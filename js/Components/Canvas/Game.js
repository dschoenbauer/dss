export class Game {

	visitCanvas(entity) {
		let c = entity.canvas.context;
		let { width, height } = entity.canvas.dom;
		let radius = 10;
		let circles = [];
		let randomPosition = (minPos, maxPos) => Math.random() * (maxPos - minPos * 2) + minPos;
		let randomDirection = () => ((Math.random() - 0.5) * 8);

		let mouse = {
			x: undefined,
			y: undefined
		}

		window.addEventListener("mousemove", event => {
			let { x, y } = event;
			mouse = { x, y }
		})

		let colors = [
			"#1C3C61",
			"#B69867",
			"#A7C9E3",
			"#FFFFFF",
			"#5C4E37",
		];


		function Circle(x, y, dx, dy, radius, color, maxRadius = 50) {
			Object.assign(this, { x, y, dx, dy, radius, minRadius: radius, maxRadius });
			this.draw = () => {
				c.beginPath();
				c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
				c.fillStyle = color;
				c.fill();
			}

			this.update = () => {

				if (this.x + this.radius > width || this.x - this.radius < 0) { this.dx = -this.dx; };
				if (this.y + this.radius > height || this.y - this.radius < 0) { this.dy = -this.dy; };

				if (
					mouse.x - this.x < 50 && mouse.x - this.x > - 50 &&
					mouse.y - this.y < 50 && mouse.y - this.y > - 50 &&
					this.maxRadius > this.radius
				) {
					this.radius += 1;
				} else if (this.radius > this.minRadius) {
					this.radius -= 1;
				}

				this.x += this.dx;
				this.y += this.dy;

				this.draw();
			}
		}
		circles.push(new Circle(randomPosition(radius, width),
			randomPosition(radius, height),
			randomDirection(),
			randomDirection(),
			radius,
			"red",
		))
		for (let i = 0; i < 2000; i++) {
			circles.push(new Circle(
				randomPosition(radius, width),
				randomPosition(radius, height),
				randomDirection(),
				randomDirection(),
				radius,
				colors[Math.floor(Math.random() * colors.length)],
			));
		}

		let animate = () => {
			requestAnimationFrame(animate)
			c.clearRect(0, 0, width, height);
			circles.forEach(circle => {
				circle.update();
			});
		}
		animate();

	}
}