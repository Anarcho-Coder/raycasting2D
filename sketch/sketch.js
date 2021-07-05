let wall = [];
let particle;

let xoff = 0;
let yoff = 100;

let info = "Click mouse to swap between follow mode and auto-walk mode";
let text_alignment = 0;

let clicked = false;

function setup() {
	createCanvas(windowHeight, windowHeight);

	wall.push(new Boundary(0, 0, 0, height));
	wall.push(new Boundary(0, 0, width, 0));
	wall.push(new Boundary(0, height, width, height));
	wall.push(new Boundary(width, 0, width, height));

	let wallcount = 5;
	for (let i = 0; i < wallcount; i++) {
		wall.push(new Boundary(Math.random() * width, Math.random() * width, Math.random() * height, Math.random() * width));
	}

	particle = new Particle();

	background(0);
	for (let w of wall) {
		w.show();
	}

	text_alignment = width/2 - (28 * 6) /*half the characters times an estimated font width ;D */;
}

function mouseClicked() {
	clicked = !clicked;
}

function draw() {
	background(0);
	fill(255,255,255);
	text(info, text_alignment, 30);
	if (!clicked) {
		particle.update(noise(xoff) * width-1, noise(yoff) * height-1);

		xoff += 0.01;
		yoff += 0.01;
	} else {
		particle.update(mouseX, mouseY);
	}

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