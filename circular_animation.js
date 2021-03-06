// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Modify to change color of particles
const particle_colors = ['#fc4a1a', '#ff6a00', '#ee0979'];
const particle_velocity = [0.01, 0.02, 0.03, 0.04, 0.05];

// Resize Canvas
addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

// Helper Functions
function num_in_range(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function randColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}
function randVelocity(velocities) {
	return velocities[Math.floor(Math.random() * velocities.length)];
}

// Particle Object
function particle(x, y, radius, color) {

	// Object Variables
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.radians = Math.random() * Math.PI * 2;
	this.velocity = randVelocity(particle_velocity);
	this.distanceFromCenter = num_in_range(canvas.width/10, canvas.width/8);

	// Movement Animation
	this.update = () => {
		const lastPoint = {x: this.x, y: this.y};
		this.radians += this.velocity;
		this.x = x + Math.cos(this.radians) * this.distanceFromCenter;
		this.y = y + Math.sin(this.radians) * this.distanceFromCenter;
		this.draw(lastPoint);
	};

	// Draw Function
	this.draw = lastPoint => {
		c.beginPath();
		c.strokeStyle = this.color;
		c.lineWidth = this.radius;
		c.moveTo(lastPoint.x, lastPoint.y);
		c.lineTo(this.x, this.y);
		c.stroke();
		c.closePath();
	}
}

// Implementation
let particles
function init() {
	particles = [];
	for (var i = 0; i < 150; i++) {
		const radius = (Math.random() * 2) +1;
		particles.push(new particle(canvas.width/2, canvas.height/2, num_in_range(2, 6), randColor(particle_colors)))
	}
}

// Animation Function
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(255, 255, 255, 0.04)';
	c.fillRect(0, 0, canvas.width, canvas.height);

	particles.forEach(particle => {
		particle.update();
	});
}

// Runs Program
init()
animate()