 // Canvas setup
 const canvas = document.getElementById('rayCanvas');
 const ctx = canvas.getContext('2d');
 
 // Speed display elements
 const speedDisplay = document.getElementById('speedDisplay');
 const speedValue = document.getElementById('speedValue');
 const speedDetails = document.getElementById('speedDetails');
 
 // Set canvas to full window size
 function resizeCanvas() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
 }
 
 // Call resize initially and on window resize
 resizeCanvas();
 window.addEventListener('resize', () => {
   resizeCanvas();
   initScene(); // Reinitialize scene on resize
 });
 
 // Scene parameters
 let earth, sun, rays = [];
 let animationId;
 let isAnimating = true;
 let rotationAngle = 0; // Current orbit rotation angle in degrees
 let earthRotationAngle = 0; // Earth's own rotation angle
 
 // Real-world relative speeds
 const baseOrbitSpeed = 0.9856 / 86400; // Degrees per frame for orbit (1 year)
 const baseRotationSpeed = 360 / 86400; // Degrees per frame for earth's rotation (1 day)
 let speedMultiplier = 1000; // Speed multiplier to make animation visible
 let rayInterval = 1; // Angle between rays in degrees
 
 // Earth continents data with India prominently featured
 const continents = [
   // India (featured prominently)
   {
     path: [
       [0.45, -0.15], [0.5, -0.05], [0.45, 0.1], [0.4, 0.15],
       [0.35, 0.05], [0.4, -0.1]
     ],
     color: '#FF9800' // Orange (for India)
   },
   // Rest of Asia
   {
     path: [
       [0.3, -0.3], [0.5, -0.4], [0.7, -0.3], [0.7, -0.1],
       [0.6, 0.1], [0.5, -0.05], [0.45, -0.15], [0.4, -0.1],
       [0.35, -0.2], [0.3, -0.2]
     ],
     color: '#FFC107' // Amber
   },
   // Sri Lanka (small island south of India)
   {
     path: [
       [0.42, 0.18], [0.45, 0.2], [0.42, 0.22], [0.4, 0.2]
     ],
     color: '#FF5722' // Deep Orange
   },
   // North America
   {
     path: [
       [-0.3, -0.5], [-0.1, -0.7], [0.1, -0.6], [0.2, -0.4],
       [0.1, -0.2], [-0.1, -0.1], [-0.3, -0.3]
     ],
     color: '#4CAF50' // Green
   },
   // South America
   {
     path: [
       [-0.1, 0.1], [0.1, 0.1], [0.2, 0.3], [0.1, 0.5],
       [-0.1, 0.6], [-0.2, 0.4], [-0.1, 0.2]
     ],
     color: '#8BC34A' // Light Green
   },
   // Europe
   {
     path: [
       [0.1, -0.4], [0.3, -0.5], [0.4, -0.4], [0.3, -0.3],
       [0.2, -0.3]
     ],
     color: '#CDDC39' // Lime
   },
   // Africa
   {
     path: [
       [0.2, -0.2], [0.4, -0.2], [0.5, 0.0], [0.4, 0.3],
       [0.2, 0.4], [0.1, 0.2], [0.2, 0.0]
     ],
     color: '#FFEB3B' // Yellow
   },
   // Australia
   {
     path: [
       [0.6, 0.2], [0.8, 0.2], [0.8, 0.4], [0.6, 0.4]
     ],
     color: '#FF5722' // Deep Orange
   },
   // Antarctica
   {
     path: [
       [-0.3, 0.7], [0.3, 0.7], [0.5, 0.8], [0.0, 0.9],
       [-0.5, 0.8]
     ],
     color: '#EEEEEE' // Light Gray
   }
 ];
 
 // Update the speed display with current values
 function updateSpeedDisplay() {
   const currentOrbitSpeed = baseOrbitSpeed * speedMultiplier;
   const currentRotationSpeed = baseRotationSpeed * speedMultiplier;
   const orbitDaysPerFrame = (currentOrbitSpeed * 86400 / 0.9856).toFixed(6);
   const rotationHoursPerFrame = (currentRotationSpeed * 24).toFixed(4);
   
   speedValue.textContent = `${speedMultiplier}x`;
   speedDetails.innerHTML = `
     ${rotationHoursPerFrame} hours/frame<br>
     ${orbitDaysPerFrame} days/frame
   `;
 }
 
 // Initialize the scene
 function initScene() {
   // Clear any existing animation
   if (animationId) {
     cancelAnimationFrame(animationId);
   }
   
   // Calculate center of the canvas
   const centerX = canvas.width / 2;
   const centerY = canvas.height / 2;
   
   // Sun is at the center
   sun = {
     x: centerX,
     y: centerY,
     r: Math.min(canvas.width, canvas.height) * 0.08 // Responsive sizing
   };
   
   // Initial earth position (will be updated during rotation)
   const earthOrbitRadius = Math.min(canvas.width, canvas.height) * 0.3;
   earth = {
     orbitRadius: earthOrbitRadius,
     r: Math.min(canvas.width, canvas.height) * 0.15, // Responsive sizing
     x: centerX + earthOrbitRadius, // Initial position (0 degrees)
     y: centerY,
     rotationAngle: 0 // Earth's own rotation
   };
   
   // Reset rotation angles
   rotationAngle = 0;
   // Set initial earth rotation to show India
   earthRotationAngle = 90; // Start with India visible
   
   // Generate rays
   generateRays();
   
   // Initialize ray endpoints
   updateEarthPosition();
   updateRayEndpoints();
   
   // Update speed display
   updateSpeedDisplay();
   
   // Start animation
   animate();
 }
 
 // Convert degrees to radians
 function degToRad(deg) {
   return (deg * Math.PI) / 180;
 }
 
 // Circle-Line intersection
 function lineCircleIntersection(S, D, C, R) {
   const dx = S.x - C.x;
   const dy = S.y - C.y;
   const a = D.x * D.x + D.y * D.y;
   const b = 2 * (dx * D.x + dy * D.y);
   const c = dx * dx + dy * dy - R * R;
   
   const disc = b * b - 4 * a * c;
   if (disc < 0) return null; // no intersection
   
   const sqrtDisc = Math.sqrt(disc);
   const t1 = (-b - sqrtDisc) / (2 * a);
   const t2 = (-b + sqrtDisc) / (2 * a);
   
   // we want the smallest positive t
   let tMin = null;
   if (t1 > 0 && t2 > 0) {
     tMin = Math.min(t1, t2);
   } else if (t1 > 0) {
     tMin = t1;
   } else if (t2 > 0) {
     tMin = t2;
   }
   return tMin;
 }
 
 // Calculate intersection with canvas edges
 function getCanvasIntersection(S, D) {
   // Check intersection with all 4 edges of the canvas
   const W = canvas.width;
   const H = canvas.height;
   
   // Top edge (y=0)
   let tTop = null;
   if (Math.abs(D.y) > 1e-6) {
     tTop = (0 - S.y) / D.y;
   }
   
   // Bottom edge (y=H)
   let tBottom = null;
   if (Math.abs(D.y) > 1e-6) {
     tBottom = (H - S.y) / D.y;
   }
   
   // Left edge (x=0)
   let tLeft = null;
   if (Math.abs(D.x) > 1e-6) {
     tLeft = (0 - S.x) / D.x;
   }
   
   // Right edge (x=W)
   let tRight = null;
   if (Math.abs(D.x) > 1e-6) {
     tRight = (W - S.x) / D.x;
   }
   
   // Find the smallest positive t
   let tMin = Infinity;
   if (tTop !== null && tTop > 0 && tTop < tMin) tMin = tTop;
   if (tBottom !== null && tBottom > 0 && tBottom < tMin) tMin = tBottom;
   if (tLeft !== null && tLeft > 0 && tLeft < tMin) tMin = tLeft;
   if (tRight !== null && tRight > 0 && tRight < tMin) tMin = tRight;
   
   if (tMin === Infinity) return null;
   
   return tMin;
 }
 
 // Generate rays at specified intervals
 function generateRays() {
   rays = [];
   const numRays = Math.floor(360 / rayInterval);
   
   for (let i = 0; i < numRays; i++) {
     const angleDeg = i * rayInterval;
     const angleRad = degToRad(angleDeg);
     
     // Direction vector from the Sun
     const dir = {
       x: Math.cos(angleRad),
       y: Math.sin(angleRad)
     };
     
     // Start point is the center of the sun
     const start = {
       x: sun.x,
       y: sun.y
     };
     
     // Create ray with initial end point (will be updated)
     rays.push({
       start: start,
       dir: dir,
       end: { x: start.x, y: start.y }, // Initial value, will be updated
       angle: angleDeg,
       color: `rgba(255, 215, 0, ${0.2 + 0.1 * Math.random()})` // Slight randomness in opacity
     });
   }
 }
 
 // Update earth position based on rotation angle
 function updateEarthPosition() {
   const angleRad = degToRad(rotationAngle);
   earth.x = sun.x + earth.orbitRadius * Math.cos(angleRad);
   earth.y = sun.y + earth.orbitRadius * Math.sin(angleRad);
   earth.rotationAngle = earthRotationAngle;
 }
 
 // Calculate ray endpoints based on current earth position
 function updateRayEndpoints() {
   for (const ray of rays) {
     // Intersection with Earth
     const tEarth = lineCircleIntersection(ray.start, ray.dir, earth, earth.r);
     
     // Intersection with canvas edges
     const tCanvas = getCanvasIntersection(ray.start, ray.dir);
     
     // Decide final endpoint
     let tFinal = null;
     if (tEarth !== null && tEarth > 0) {
       // If we have Earth intersection, see if canvas edge is closer
       if (tCanvas !== null) {
         tFinal = Math.min(tEarth, tCanvas);
       } else {
         tFinal = tEarth;
       }
     } else {
       // No Earth intersection => use canvas edge
       tFinal = tCanvas;
     }
     
     // Calculate end point
     if (tFinal !== null && tFinal > 0) {
       ray.end = {
         x: ray.start.x + tFinal * ray.dir.x,
         y: ray.start.y + tFinal * ray.dir.y
       };
     } else {
       ray.end = { x: ray.start.x, y: ray.start.y };
     }
   }
 }
 
 // Draw the Earth with continents
 function drawEarth() {
   // Draw base Earth (ocean)
   ctx.fillStyle = '#1565C0'; // Deep blue for oceans
   ctx.beginPath();
   ctx.arc(earth.x, earth.y, earth.r, 0, Math.PI * 2);
   ctx.fill();
   
   // Draw grid lines for reference (optional)
   ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
   ctx.lineWidth = 1;
   
   // Longitude lines
   for (let i = 0; i < 12; i++) {
     const angle = (i / 12) * Math.PI * 2 + degToRad(earth.rotationAngle);
     ctx.beginPath();
     ctx.arc(earth.x, earth.y, earth.r, angle, angle);
     ctx.lineTo(earth.x + Math.cos(angle) * earth.r, earth.y + Math.sin(angle) * earth.r);
     ctx.stroke();
   }
   
   // Latitude lines
   for (let i = 1; i < 6; i++) {
     const radius = earth.r * Math.sin(i * Math.PI / 6);
     const y = earth.r * Math.cos(i * Math.PI / 6);
     ctx.beginPath();
     ctx.arc(earth.x, earth.y - y, radius, 0, Math.PI * 2);
     ctx.stroke();
     ctx.beginPath();
     ctx.arc(earth.x, earth.y + y, radius, 0, Math.PI * 2);
     ctx.stroke();
   }
   
   // Draw continents
   const earthRotRad = degToRad(earth.rotationAngle);
   const scale = earth.r * 0.8; // Scale factor for continent size
   
   continents.forEach(continent => {
     ctx.fillStyle = continent.color;
     ctx.beginPath();
     
     // Transform and draw each continent path
     for (let i = 0; i < continent.path.length; i++) {
       const [x, y] = continent.path[i];
       
       // Apply earth rotation to the point
       const rotatedX = x * Math.cos(earthRotRad) - y * Math.sin(earthRotRad);
       const rotatedY = x * Math.sin(earthRotRad) + y * Math.cos(earthRotRad);
       
       // Scale and position the point
       const worldX = earth.x + rotatedX * scale;
       const worldY = earth.y + rotatedY * scale;
       
       if (i === 0) {
         ctx.moveTo(worldX, worldY);
       } else {
         ctx.lineTo(worldX, worldY);
       }
     }
     
     ctx.closePath();
     ctx.fill();
   });
   
   // Add a subtle atmosphere glow
   const glowGrad = ctx.createRadialGradient(
     earth.x, earth.y, earth.r * 0.9,
     earth.x, earth.y, earth.r * 1.1
   );
   glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
   glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
   
   ctx.fillStyle = glowGrad;
   ctx.beginPath();
   ctx.arc(earth.x, earth.y, earth.r * 1.1, 0, Math.PI * 2);
   ctx.fill();
   
   // Highlight India with a subtle glow when it's visible
   // Calculate the position of India based on earth rotation
   const indiaAngle = earthRotRad;
   const indiaX = earth.x + Math.cos(indiaAngle) * earth.r * 0.5;
   const indiaY = earth.y + Math.sin(indiaAngle) * earth.r * 0.05;
   
   // Add a subtle highlight
   const indiaGlow = ctx.createRadialGradient(
     indiaX, indiaY, 0,
     indiaX, indiaY, earth.r * 0.2
   );
   indiaGlow.addColorStop(0, 'rgba(255, 165, 0, 0.3)');
   indiaGlow.addColorStop(1, 'rgba(255, 165, 0, 0)');
   
   ctx.fillStyle = indiaGlow;
   ctx.beginPath();
   ctx.arc(indiaX, indiaY, earth.r * 0.2, 0, Math.PI * 2);
   ctx.fill();
 }
 
 // Draw the scene
 function drawScene() {
   // Clear canvas
   ctx.fillStyle = '#000';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   
   // Draw rays
   ctx.lineWidth = 1;
   for (const ray of rays) {
     ctx.strokeStyle = ray.color;
     ctx.beginPath();
     ctx.moveTo(ray.start.x, ray.start.y);
     ctx.lineTo(ray.end.x, ray.end.y);
     ctx.stroke();
   }
   
   // Draw Earth with continents
   drawEarth();
   
   // Draw Sun (yellow circle with gradient)
   const sunGrad = ctx.createRadialGradient(
     sun.x, sun.y, 0,
     sun.x, sun.y, sun.r
   );
   sunGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
   sunGrad.addColorStop(0.2, 'rgba(255, 255, 0, 1)');
   sunGrad.addColorStop(1, 'rgba(255, 165, 0, 0.8)');
   
   ctx.fillStyle = sunGrad;
   ctx.beginPath();
   ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
   ctx.fill();
   
   // Optional: Draw orbit path
   ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
   ctx.beginPath();
   ctx.arc(sun.x, sun.y, earth.orbitRadius, 0, Math.PI * 2);
   ctx.stroke();
 }
 
 // Animation loop
 function animate() {
   if (isAnimating) {
     // Apply speed multiplier to both rotation speeds
     const currentOrbitSpeed = baseOrbitSpeed * speedMultiplier;
     const currentRotationSpeed = baseRotationSpeed * speedMultiplier;
     
     // Update earth orbit position
     rotationAngle = (rotationAngle + currentOrbitSpeed) % 360;
     
     // Update earth's own rotation
     earthRotationAngle = (earthRotationAngle + currentRotationSpeed) % 360;
     
     // Update positions
     updateEarthPosition();
     updateRayEndpoints();
     
     // Subtle animation: slightly adjust ray colors for a shimmering effect
     for (const ray of rays) {
       ray.color = `rgba(255, 215, 0, ${0.2 + 0.1 * Math.random()})`;
     }
   }
   
   // Draw the scene
   drawScene();
   
   // Continue animation
   animationId = requestAnimationFrame(animate);
 }
 
 // Set up event listeners
 document.addEventListener('DOMContentLoaded', () => {
   const toggleBtn = document.getElementById('toggleAnimation');
   const resetBtn = document.getElementById('resetView');
   const multiplierSlider = document.getElementById('speedMultiplier');
   
   // Toggle animation
   if (toggleBtn) {
     toggleBtn.addEventListener('click', () => {
       isAnimating = !isAnimating;
       toggleBtn.textContent = isAnimating ? 'Pause' : 'Resume';
     });
   }
   
   // Reset view
   if (resetBtn) {
     resetBtn.addEventListener('click', initScene);
   }
   
   // Speed multiplier control
   if (multiplierSlider) {
     multiplierSlider.addEventListener('input', () => {
       speedMultiplier = parseFloat(multiplierSlider.value);
       updateSpeedDisplay();
     });
   }
 });
 
 // Initialize the scene
 initScene();