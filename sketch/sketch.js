let wall = [];
let particle;

let xoff = 0;
let yoff = 100;

function setup() {
	createCanvas(windowHeight, windowWidth);

	wall.push(new Boundary(0, 0, 0, windowHeight));
	wall.push(new Boundary(0, 0, windowWidth, 0));
	wall.push(new Boundary(0, windowHeight, windowWidth, windowHeight));
	wall.push(new Boundary(windowWidth, 0, windowWidth, windowHeight));

	let wallcount = 5;
	for (let i = 0; i < wallcount; i++) {
		wall.push(new Boundary(Math.random() * windowHeight, Math.random() * windowWidth, Math.random() * windowHeight, Math.random() * windowWidth));
	}

	particle = new Particle();

	background(0);
	for (let w of wall) {
		w.show();
	}
}

function draw() {
	background(0);
	particle.update(noise(xoff) * width, noise(yoff) * height);

	xoff += 0.01;
	yoff += 0.01;


	for (let w of wall) {
		w.show();
	}

	particle.show();

	let pts = particle.cast(wall);
	if (pts) {

		for (let i = 0; i < pts.length; i++) {

			fill(255);
			line(particle.pos.x, particle.pos.y, pts[i].x, pts[i].y);
			ellipse(pts[i].x, pts[i].y, 2, 2);
		}
	}

}