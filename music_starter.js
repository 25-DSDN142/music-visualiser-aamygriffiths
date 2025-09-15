let stars, planets;
let speed = 2;

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(11, 6, 69);

  if (!stars || !planets) {
    stars = [];
    planets = [];
    // lots of stars
    for (let i = 0; i < 1000; i++) {
      stars.push({
        x: random(-width, width),
        y: random(-height, height),
        z: random(width)
      });
    }
    // fewer planets
    for (let i = 0; i < 60; i++) {
      planets.push({
        x: random(-width, width),
        y: random(-height, height),
        z: random(width),
        size: random(12, 50),
        col: color(random(100, 255), random(100, 255), random(100, 255))
      });
    }
  }

  translate(width / 2, height / 2);
  noStroke();

  // audio-reactive speed
  speed = map(bass, 0, 100, 2, 20);

  // --- draw stars ---
  fill(255);
  for (let s of stars) {
    s.z -= speed;
    if (s.z < 1) {
      s.x = random(-width, width);
      s.y = random(-height, height);
      s.z = width;
    }

    let sx = (s.x / s.z) * width;
    let sy = (s.y / s.z) * height;

    let r = map(s.z, 0, width, 4, 0.5); // depth size
    circle(sx, sy, r);
  }

  // --- draw planets ---
  for (let p of planets) {
    p.z -= speed * 0.8; // planets drift a bit slower than stars
    if (p.z < 1) {
      p.x = random(-width, width);
      p.y = random(-height, height);
      p.z = width;
      p.size = random(12, 50);
      p.col = color(random(100, 255), random(100, 255), random(100, 255));
    }

    let sx = (p.x / p.z) * width;
    let sy = (p.y / p.z) * height;

    let r = map(p.z, 0, width, p.size, 2);

    fill(p.col);
    circle(sx, sy, r);

    // glow
    fill(red(p.col), green(p.col), blue(p.col), 100);
    circle(sx, sy, r * 1.6);
  }
}
