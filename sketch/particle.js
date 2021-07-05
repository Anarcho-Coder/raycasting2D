class Particle {
    constructor() {
        let angle = 3;

        this.pos = createVector(width / 2, height / 2);
        this.rays = [];

        for (let a = 0; a < 360; a += angle) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }


    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 1);

        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].show();
        }
    }

    cast(walls) {

        let pts = [];

        for (let i = 0; i < this.rays.length; i++) {
            let closest;
            let record = Infinity;
            for (let wall of walls) {
                let pt = this.rays[i].cast(wall);

                if (pt) {
                    let ptd = p5.Vector.dist(this.pos, pt);
                    if (closest) {
                        if (ptd < record) {
                            closest = pt;
                            record = ptd;
                        }
                    } else {
                        closest = pt;
                        record = ptd;
                    }
                }
            }

            if (closest) {
                pts.push(closest);
            }
        }

        if (pts.length == 0) return;

        return pts;

    }

    update(x, y) {
        this.pos.set(x, y);
    }
}