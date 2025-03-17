// Canvas setup
 const canvas = document.getElementById('rayCanvas');
 const ctx = canvas.getContext('2d');
 
 // Speed display elements
 const speedDisplay = document.getElementById('speedDisplay');
 const speedValue = document.getElementById('speedValue');
 const speedDetails = document.getElementById('speedDetails');
 const hoursValue = document.getElementById('hoursValue');
 const daysValue = document.getElementById('daysValue');
 const sliderValue = document.getElementById('sliderValue');
 
 // Content elements
 const heroTitle = document.getElementById('heroTitle');
 const heroSubtitle = document.getElementById('heroSubtitle');
 // const contentContainer = document.querySelector('.content-container');
 const mainNav = document.getElementById('mainNav');
 const controls = document.getElementById('controls');
 const scrollBlur = document.getElementById('scrollBlur');
 
 // Add transitions for smooth appearance/disappearance
 controls.style.transition = 'opacity 0.5s ease';
 speedDisplay.style.transition = 'opacity 0.5s ease';
 mainNav.style.transition = 'opacity 0.5s ease, background 0.3s ease';
 
 // Initially hide all content but show controls
 heroTitle.style.opacity = '0';
 heroSubtitle.style.opacity = '0';
 mainNav.style.opacity = '1';
 controls.style.opacity = '1';
 speedDisplay.style.opacity = '1';
 
 // Set a timer to show initial content after a delay if user hasn't scrolled
 let initialLoadTimeout = setTimeout(() => {
   if (window.scrollY < 10) { // Only reveal if user hasn't scrolled much
     // Keep controls visible, content hidden at top
   } else {
     // If they've scrolled, show content
     revealContent();
   }
 }, 3000); // 3 seconds delay
 
 // Function to reveal content
 function revealContent() {
   mainNav.style.opacity = '1';
   
   // Staggered animation for hero elements
   heroTitle.style.opacity = '1';
   heroTitle.style.transform = 'translateY(0)';
   
   initialLoadTimeout = setTimeout(() => {
     heroSubtitle.style.opacity = '1';
     heroSubtitle.style.transform = 'translateY(0)';
   }, 300);
 }
 
 // Function to hide content
 function hideContent() {
   heroTitle.style.opacity = '0';
   heroTitle.style.transform = 'translateY(30px)';
   heroSubtitle.style.opacity = '0';
   heroSubtitle.style.transform = 'translateY(30px)';
   mainNav.style.opacity = '1';
   clearTimeout(initialLoadTimeout);
 }
 
 // Earth image - using a more reliable source and adding error handling
 const earthImage = new Image();
 earthImage.crossOrigin = "Anonymous"; // Handle CORS issues
 earthImage.src = "../assets/earth.jpg";
 
 // Alternative URLs if the first one fails
 const fallbackUrls = [
   'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Earth_from_space_north_pole.jpg/1200px-Earth_from_space_north_pole.jpg',
   'https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg'
 ];
 
 let currentUrlIndex = 0;
 let earthImageLoaded = false;
 
 // Success handler
 earthImage.onload = function() {
   console.log("Earth image loaded successfully");
   earthImageLoaded = true;
   if (earth) {
     drawScene(); // Redraw once image is loaded
   }
 };
 
 // Error handler - try fallback URLs
 earthImage.onerror = function() {
   console.log("Error loading Earth image, trying fallback");
   currentUrlIndex++;
   if (currentUrlIndex < fallbackUrls.length) {
     earthImage.src = fallbackUrls[currentUrlIndex];
   } else {
     console.log("All Earth image URLs failed");
   }
 };
 
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
 let stars = []; // Array to store star data
 
 // Real-world relative speeds - using more accurate astronomical values
 const baseOrbitSpeed = 0.0041; // Degrees per frame (approximately 1 degree per day)
 // Earth rotates 365.25 times for each orbit around the sun
 const baseRotationSpeed = baseOrbitSpeed * 24; // Degrees per frame for earth's rotation
 let speedMultiplier = 1; // Starting at 1x speed
 let rayInterval = 1; // Angle between rays in degrees
 
 // Update the speed display with current values
 function updateSpeedDisplay() {
   // Calculate days per frame for orbit
   const daysPerFrame = (baseOrbitSpeed * speedMultiplier / 0.9856 * 365.25).toFixed(4);
   
   // Calculate hours per frame for rotation
   const hoursPerFrame = (baseRotationSpeed * speedMultiplier / 15).toFixed(4);
   
   // Calculate time scale (1 second of animation = X days in simulation)
   const timeScale = (speedMultiplier * 0.24).toFixed(2);
   
   // Update the main speed display
   speedValue.textContent = `${speedMultiplier.toLocaleString()}x`;
   
   // Update the detailed values
   hoursValue.textContent = hoursPerFrame;
   daysValue.textContent = daysPerFrame;
   
   // Update the slider value display
   sliderValue.textContent = `${speedMultiplier.toLocaleString()}x`;
   
   // Add time scale information
   speedDetails.innerHTML = `
     Earth rotation: <span id="hoursValue">${hoursPerFrame}</span> hours/frame<br>
     Earth orbit: <span id="daysValue">${daysPerFrame}</span> days/frame<br>
     1 sec ≈ <span>${timeScale}</span> Earth days
   `;
 }
 
 // Generate rays at specified intervals
 function generateRays() {
   rays = [];
   const numRays = Math.floor(360 / rayInterval);
   
   for (let i = 0; i < numRays; i++) {
     const angleDeg = i * rayInterval;
     const angleRad = degToRad(angleDeg);
     
     // Direction vector from the Sun (unchanged)
     const dir = {
       x: Math.cos(angleRad),
       y: Math.sin(angleRad)
     };
     
     // Start point is now on the periphery of the sun instead of center
     const start = {
       x: sun.x + dir.x * sun.r, // Start from sun's surface
       y: sun.y + dir.y * sun.r
     };
     
     // Create ray with initial end point (will be updated)
     // Assign a fixed base opacity with a small random component
     const baseOpacity = 0.2 + 0.05 * Math.random();
     rays.push({
       start: start,
       dir: dir,
       end: { x: start.x, y: start.y }, // Initial value, will be updated
       angle: angleDeg,
       baseOpacity: baseOpacity,
       phase: Math.random() * Math.PI * 2, // Random starting phase for smooth animation
       color: `rgba(255, 215, 0, ${baseOpacity})` 
     });
   }
 }
 
 // Generate stars for the background
 function generateStars() {
   stars = [];
   const numStars = Math.floor(canvas.width * canvas.height / 2000); // Adjust density as needed
   
   for (let i = 0; i < numStars; i++) {
     // Random position across the entire canvas
     const x = Math.random() * canvas.width;
     const y = Math.random() * canvas.height;
     
     // Random size between 0.5 and 2.5, with occasional larger stars
     const size = Math.random() > 0.97 ? 
                 2 + Math.random() * 1.5 : // 3% chance of larger star (2-3.5)
                 0.5 + Math.random() * 1.5; // Normal stars (0.5-2)
     
     // Assign a relative distance (smaller stars are generally further away)
     // This affects parallax movement
     const distance = size < 1.2 ? 
                    2 + Math.random() * 3 : // Distant stars (smaller)
                    0.8 + Math.random() * 1.2; // Closer stars (larger)
     
     // Random base brightness between 0.3 and 0.9
     const baseBrightness = 0.3 + Math.random() * 0.6;
     
     // Random flickering speed - more varied now
     const flickerSpeed = 0.3 + Math.random() * 3;
     
     // Random phase for smooth animation
     const phase = Math.random() * Math.PI * 2;
     
     // Additional phases for multi-wave twinkling
     const phase2 = Math.random() * Math.PI * 2;
     const phase3 = Math.random() * Math.PI * 2;
     
     // Random twinkling pattern type (0-3)
     const twinklePattern = Math.floor(Math.random() * 4);
     
     // Random color (white to slightly blue or yellow)
     const hue = Math.random() > 0.7 ? 
                 (Math.random() > 0.5 ? 210 + Math.random() * 30 : 40 + Math.random() * 20) : 
                 0; // 70% white, 15% blue-ish, 15% yellow-ish
     const saturation = hue === 0 ? 0 : 20 + Math.random() * 30;
     
     // Add glow effect to some stars
     const hasGlow = Math.random() > 0.85; // 15% chance of having glow
     
     // Add movement properties - smaller stars move more
     const moveSpeed = 0.03 + Math.random() * 0.15; // Varied movement speeds
     const moveAngle = Math.random() * Math.PI * 2; // Random direction
     
     // Smaller stars move more, larger stars move less
     const moveRadius = size < 1.5 ? 
                       1 + Math.random() * 2 : // Smaller stars move more
                       0.3 + Math.random() * 0.7; // Larger stars move less
                       
     const movePhase = Math.random() * Math.PI * 2; // Random starting position in movement cycle
     
     // Add a secondary movement for some stars to create more complex patterns
     const hasSecondaryMovement = Math.random() > 0.7; // 30% chance
     const secondaryMoveSpeed = 0.01 + Math.random() * 0.05; // Very slow secondary movement
     const secondaryMoveRadius = 0.2 + Math.random() * 0.8; // Small secondary radius
     const secondaryMovePhase = Math.random() * Math.PI * 2; // Random phase
     
     stars.push({
       x,
       y,
       originalX: x, // Store original position for movement calculations
       originalY: y,
       size,
       baseBrightness,
       flickerSpeed,
       phase,
       phase2,
       phase3,
       twinklePattern,
       hue,
       saturation,
       hasGlow,
       distance,
       moveSpeed,
       moveAngle,
       moveRadius,
       movePhase,
       hasSecondaryMovement,
       secondaryMoveSpeed,
       secondaryMoveRadius,
       secondaryMovePhase
     });
   }
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
   
   // Sun is always at the center
   sun = {
     x: centerX,
     y: centerY,
     r: Math.min(canvas.width, canvas.height) * 0.08 // Responsive sizing
   };
   
   // Get current scroll position for initial earth position
   const scrollY = window.scrollY || 0;
   const parallaxFactor = 0.2;
   
   // Initial earth orbit radius
   const earthOrbitRadius = Math.min(canvas.width, canvas.height) * 0.3;
   
   // Calculate initial ellipse parameters based on scroll
   const baseEccentricity = 0.0167; // Earth's actual orbital eccentricity
   const maxScrollEccentricity = 5; // Maximum eccentricity based on scroll
   const scrollEccentricity = Math.min(maxScrollEccentricity, scrollY * parallaxFactor / earthOrbitRadius);
   const eccentricity = baseEccentricity + scrollEccentricity; // Update eccentricity based on scroll
   const semiMajorAxis = earthOrbitRadius;
   const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);
   
   earth = {
     orbitRadius: earthOrbitRadius,
     r: Math.min(canvas.width, canvas.height) * 0.075, // Base radius
     currentSize: Math.min(canvas.width, canvas.height) * 0.075, // Initial current size
     // Real astronomical parameters
     axialTilt: 23.5, // Earth's axial tilt in degrees
     orbitalInclination: 0, // Earth's orbital inclination (simplified)
     x: centerX + semiMajorAxis * Math.cos(degToRad(rotationAngle)), // Initial position (0 degrees)
     y: centerY + semiMinorAxis * Math.sin(degToRad(rotationAngle)), // Initial position on elliptical orbit
     rotationAngle: 0, // Initial rotation angle
     seasonalAngle: 0, // Added for seasonal effect
     currentInclination: 0, // Current inclination of orbit
     behindSun: false // Added for z-index tracking
   };
   
   // Reset rotation angles
   rotationAngle = 0;
   // Set initial earth rotation
   earthRotationAngle = 0;
   
   // Generate rays
   generateRays();
   
   // Generate stars
   generateStars();
   
   // Initialize earth position on the elliptical orbit
   updateEarthPosition();
   
   // Initialize ray endpoints
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
 
 // Update earth position based on rotation angle
 function updateEarthPosition() {
   const angleRad = degToRad(rotationAngle);
   
   // Get current scroll offset for elliptical orbit calculation
   const scrollY = window.scrollY || 0;
   const maxScroll = document.body.scrollHeight - window.innerHeight;
   const scrollProgress = Math.min(1, scrollY / maxScroll);
   
   // Calculate ellipse parameters based on scroll
   // As user scrolls, increase eccentricity to make orbit more elliptical
   const minEccentricity = 0.0167; // Earth's actual orbital eccentricity
   const maxEccentricity = 0.7; // Maximum eccentricity when fully scrolled
   const eccentricity = minEccentricity + (maxEccentricity - minEccentricity) * scrollProgress;
   
   // Calculate inclination based on scroll (0 to 85 degrees - almost inline with sun)
   const maxInclination = 85; // Increased from 20 to 85 for dramatic effect
   const currentInclination = maxInclination * scrollProgress;
   const inclinationRad = degToRad(currentInclination);
   
   // Make the major axis vertical and minor axis horizontal
   const semiMajorAxis = earth.orbitRadius; // Vertical axis
   const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity); // Horizontal axis
   
   // Calculate position on elliptical orbit
   let x = semiMinorAxis * Math.cos(angleRad);
   let y = semiMajorAxis * Math.sin(angleRad);
   
   // Apply inclination rotation
   const inclinedX = x;
   const inclinedY = y * Math.cos(inclinationRad) + x * Math.sin(inclinationRad);
   
   // Set earth position
   earth.x = sun.x + inclinedX;
   earth.y = sun.y + inclinedY;
   
   // Store current parameters for orbit drawing
   earth.currentSemiMajorAxis = semiMajorAxis;
   earth.currentSemiMinorAxis = semiMinorAxis;
   earth.currentInclination = currentInclination;
   
   // Update earth's own rotation
   earth.rotationAngle = earthRotationAngle;
   
   // Calculate seasonal effect based on position in orbit
   earth.seasonalAngle = (rotationAngle + 90) % 360; // Northern hemisphere summer at 90°
   
   // UPDATED: Modify earth size based on both inclination and vertical position
   // Only apply size changes if there's inclination (scrollProgress > 0)
   if (scrollProgress > 0) {
     // Normalize y position to range -1 to 1
     const normalizedY = inclinedY / semiMajorAxis;
     
     // Map to size range: 0.6 when up (negative y), 1.4 when down (positive y)
     // Scale the effect based on scroll progress/inclination
     const sizeMultiplier = 1 + (0.4 * normalizedY * scrollProgress);
     
     // Apply size multiplier
     earth.currentSize = earth.r * sizeMultiplier;
   } else {
     // At top of page, keep Earth at its original size
     earth.currentSize = earth.r;
   }
   
   // Add z-index tracking for Earth to determine when it's behind the Sun
   // Improved logic to better handle transitions - uses distance from sun center to viewer
   // Add a small buffer zone to prevent flickering at transition points
   const distanceToViewer = Math.abs(x); // x-distance represents depth in this view
   const transitionBuffer = 5; // Buffer zone for smoother transitions
   earth.behindSun = (distanceToViewer < sun.r + transitionBuffer) && (Math.cos(angleRad) < 0.1);
 }
 
 // Calculate ray endpoints based on current earth position and size
 function updateRayEndpoints() {
   for (const ray of rays) {
     // Update ray start point to be on the sun's periphery
     const angleRad = degToRad(ray.angle);
     ray.start.x = sun.x + Math.cos(angleRad) * sun.r;
     ray.start.y = sun.y + Math.sin(angleRad) * sun.r;
     
     // Intersection with Earth - use currentSize
     const tEarth = lineCircleIntersection(ray.start, ray.dir, earth, earth.currentSize);
     
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
 
 // Draw the Earth with realistic image - improved for seamless wrapping
 function drawEarth() {
   // Draw base Earth (ocean) as fallback
   ctx.fillStyle = '#1565C0'; // Deep blue for oceans
   ctx.beginPath();
   ctx.arc(earth.x, earth.y, earth.currentSize, 0, Math.PI * 2);
   ctx.fill();
   
   if (earthImageLoaded) {
     try {
       // Save the current context state
       ctx.save();
       
       // Create a clipping path for the Earth circle with the dynamic size
       ctx.beginPath();
       ctx.arc(earth.x, earth.y, earth.currentSize, 0, Math.PI * 2);
       ctx.clip();
       
       // Calculate the position to draw the image
       const size = earth.currentSize * 2.5; // Make image larger to ensure full coverage
       
       // Translate to earth center
       ctx.translate(earth.x, earth.y);
       
       // Apply Earth's axial tilt
       ctx.rotate(degToRad(earth.axialTilt));
       
       // Calculate the offset based on rotation angle
       // This creates a seamless wrapping effect as the Earth rotates
       const rotationAngleRad = degToRad(earth.rotationAngle);
       const imageWidth = earthImage.width || size;
       
       // Calculate how much to offset the image horizontally based on rotation
       // This creates the illusion of rotating around the y-axis
       const offsetX = -imageWidth * (rotationAngleRad / (Math.PI * 2));
       
       // Draw the image twice side by side to create a seamless wrap
       // First copy - main view
       ctx.drawImage(
         earthImage, 
         -size/2 + offsetX % size, 
         -size/2, 
         size, 
         size
       );
       
       // Second copy - wrapping around the edge
       ctx.drawImage(
         earthImage, 
         -size/2 + offsetX % size + size, 
         -size/2, 
         size, 
         size
       );
       
       // Reset transformation
       ctx.setTransform(1, 0, 0, 1, 0, 0);
       
       // Restore context to remove clipping
       ctx.restore();
     } catch (error) {
       console.error("Error drawing Earth image:", error);
       // The blue circle fallback is already drawn
     }
   }
   
   // Add a subtle atmosphere glow
   // Adjust glow based on seasonal angle to simulate different lighting conditions
   const seasonalFactor = Math.cos(degToRad(earth.seasonalAngle));
   const glowIntensity = 0.3 + seasonalFactor * 0.1; // Brighter in summer, dimmer in winter
   
   const glowGrad = ctx.createRadialGradient(
     earth.x, earth.y, earth.currentSize * 0.9,
     earth.x, earth.y, earth.currentSize * 1.1
   );
   glowGrad.addColorStop(0, `rgba(255, 255, 255, ${glowIntensity})`);
   glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
   
   ctx.fillStyle = glowGrad;
   ctx.beginPath();
   ctx.arc(earth.x, earth.y, earth.currentSize * 1.1, 0, Math.PI * 2);
   ctx.fill();
 }
 
 // Draw the scene
 function drawScene() {
   // Clear canvas
   ctx.fillStyle = '#000';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   
   // Draw stars
   drawStars();
   
   // Draw orbit path
   ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
   
   // Get current scroll offset for drawing the elliptical orbit
   const scrollY = window.scrollY || 0;
   const maxScroll = document.body.scrollHeight - window.innerHeight;
   const scrollProgress = Math.min(1, scrollY / maxScroll);
   
   // Calculate ellipse parameters based on scroll
   const minEccentricity = 0.0167; // Earth's actual orbital eccentricity
   const maxEccentricity = 0.7; // Maximum eccentricity when fully scrolled
   const eccentricity = minEccentricity + (maxEccentricity - minEccentricity) * scrollProgress;
   
   // Calculate inclination based on scroll (0 to 85 degrees)
   const maxInclination = 85; // Increased from 20 to 85 for dramatic effect
   const currentInclination = maxInclination * scrollProgress;
   const inclinationRad = degToRad(currentInclination);
   
   // For vertical major axis, swap a and b
   const semiMajorAxis = earth.orbitRadius; // Vertical axis
   const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity); // Horizontal axis
   
   // Draw the elliptical orbit path point by point with inclination
   ctx.beginPath();
   
   for (let angle = 0; angle < 360; angle += 5) {
     const angleRad = degToRad(angle);
     
     // Calculate position on ellipse
     const x = semiMinorAxis * Math.cos(angleRad);
     const y = semiMajorAxis * Math.sin(angleRad);
     
     // Apply inclination
     const inclinedX = x;
     const inclinedY = y * Math.cos(inclinationRad) + x * Math.sin(inclinationRad);
     
     if (angle === 0) {
       ctx.moveTo(sun.x + inclinedX, sun.y + inclinedY);
     } else {
       ctx.lineTo(sun.x + inclinedX, sun.y + inclinedY);
     }
   }
   
   // Close the path
   ctx.closePath();
   ctx.stroke();
   
   // MODIFIED: Improved Earth-Sun drawing order with smoother transitions
   if (earth.behindSun) {
     // Draw Sun first if Earth is behind it
     drawSun();
     drawEarth();
   } else {
     // Draw Earth first if it's in front of the Sun
     drawEarth();
     drawSun();
   }
   
   // Draw rays after both Earth and Sun to ensure they appear on top
   ctx.lineWidth = 1;
   for (const ray of rays) {
     // Make rays slightly transparent when they'd be behind Earth
     if (earth.behindSun && lineCircleIntersection(ray.start, ray.dir, earth, earth.currentSize)) {
       const dimmedOpacity = ray.baseOpacity * 0.5;
       ctx.strokeStyle = ray.color.replace(/[\d.]+\)/, dimmedOpacity + ')');
     } else {
       ctx.strokeStyle = ray.color;
     }
     
     ctx.beginPath();
     ctx.moveTo(ray.start.x, ray.start.y);
     ctx.lineTo(ray.end.x, ray.end.y);
     ctx.stroke();
   }
 }
 
 // Draw stars with flickering effect
 function drawStars() {
   const time = performance.now() * 0.001; // Current time in seconds
   
   // Calculate star movement speed based on Earth's revolution speed
   const earthRevolutionSpeed = baseOrbitSpeed * speedMultiplier;
   const starMovementFactor = earthRevolutionSpeed / 100; // 1/100 of Earth's speed
   
   for (const star of stars) {
     // Calculate current brightness with more randomized flickering effect
     // Use different twinkling patterns based on the star's type
     let combinedFlicker;
     
     switch(star.twinklePattern) {
       case 0: // Simple sine wave
         combinedFlicker = Math.sin(time * star.flickerSpeed + star.phase) * 0.2;
         break;
       case 1: // Multiple sine waves with different frequencies
         combinedFlicker = Math.sin(time * star.flickerSpeed + star.phase) * 0.15 +
                          Math.sin(time * (star.flickerSpeed * 0.7) + star.phase2) * 0.1 +
                          Math.sin(time * (star.flickerSpeed * 1.3) + star.phase3) * 0.05;
         break;
       case 2: // Sharper flicker using absolute sine
         combinedFlicker = Math.abs(Math.sin(time * star.flickerSpeed + star.phase)) * 0.2 - 0.1;
         break;
       case 3: // Subtle random flicker
         combinedFlicker = (Math.sin(time * star.flickerSpeed + star.phase) * 0.1) + 
                          (Math.sin(time * 10 + star.phase2) * 0.05 * Math.sin(time + star.phase3));
         break;
     }
     
     // Apply the combined flicker effect
     const brightness = Math.max(0.1, Math.min(1, star.baseBrightness + combinedFlicker));
     
     // Calculate position with movement tied to Earth's revolution speed
     // Distant stars move less (parallax effect)
     const distanceFactor = 1 / star.distance;
     let moveX = Math.cos(time * star.moveSpeed * starMovementFactor + star.movePhase) * star.moveRadius * distanceFactor;
     let moveY = Math.sin(time * star.moveSpeed * starMovementFactor + star.movePhase + star.moveAngle) * star.moveRadius * distanceFactor;
     
     // Add secondary movement for some stars
     if (star.hasSecondaryMovement) {
       moveX += Math.cos(time * star.secondaryMoveSpeed * starMovementFactor + star.secondaryMovePhase) * star.secondaryMoveRadius * distanceFactor;
       moveY += Math.sin(time * star.secondaryMoveSpeed * starMovementFactor + star.secondaryMovePhase * 1.5) * star.secondaryMoveRadius * distanceFactor;
     }
     
     // Apply movement to position
     const currentX = star.originalX + moveX;
     const currentY = star.originalY + moveY;
     
     // Set the star color with current brightness
     if (star.hue === 0) {
       // White stars
       ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
     } else {
       // Colored stars (blue or yellow tint)
       ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 80%, ${brightness})`;
     }
     
     // Draw glow effect for some stars
     if (star.hasGlow) {
       const glowSize = star.size * (2 + Math.sin(time * 0.5 + star.phase) * 0.5);
       const gradient = ctx.createRadialGradient(
         currentX, currentY, 0,
         currentX, currentY, glowSize
       );
       
       if (star.hue === 0) {
         gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.8})`);
         gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
       } else {
         gradient.addColorStop(0, `hsla(${star.hue}, ${star.saturation}%, 80%, ${brightness * 0.8})`);
         gradient.addColorStop(1, `hsla(${star.hue}, ${star.saturation}%, 80%, 0)`);
       }
       
       ctx.fillStyle = gradient;
       ctx.beginPath();
       ctx.arc(currentX, currentY, glowSize, 0, Math.PI * 2);
       ctx.fill();
       
       // Reset fill style for the star itself
       if (star.hue === 0) {
         ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
       } else {
         ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 80%, ${brightness})`;
       }
     }
     
     // Draw the star
     ctx.beginPath();
     ctx.arc(currentX, currentY, star.size, 0, Math.PI * 2);
     ctx.fill();
   }
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
     
     // Subtle animation: smoothly animate ray opacities instead of random flickering
     const time = performance.now() * 0.001; // Current time in seconds
     for (const ray of rays) {
       // Use sine wave to create smooth pulsing effect
       const pulseAmount = Math.sin(time + ray.phase) * 0.05;
       const opacity = Math.max(0.1, Math.min(0.4, ray.baseOpacity + pulseAmount));
       ray.color = `rgba(255, 215, 0, ${opacity})`;
     }
   }
   
   // Always draw the scene, even when orbit animation is paused
   // This ensures stars continue to twinkle and move in the background
   drawScene();
   
   // Continue animation
   animationId = requestAnimationFrame(animate);
 }
 
 // Scroll animation functions
 function handleScroll() {
   const scrollY = window.scrollY;
   const windowHeight = window.innerHeight;
   
   // Clear the timeout if user scrolls before automatic reveal
   if (initialLoadTimeout) {
     clearTimeout(initialLoadTimeout);
     initialLoadTimeout = null;
   }
   
   // Handle visibility based on scroll position
   if (scrollY < 20) {
     // At the very top - show controls, hide content
     hideContent();
     controls.style.opacity = '1';
     speedDisplay.style.opacity = '1';
     
     // Ensure blur is not active at the top
     if (scrollBlur.style.opacity !== '0') {
       setTimeout(() => {
         scrollBlur.style.opacity = '0';
       }, 300);
     }
   } else {
     // Scrolled down - show content, hide controls
     revealContent();
     controls.style.opacity = '0';
     speedDisplay.style.opacity = '0';
   }
   
   // Handle section animations
   const sections = document.querySelectorAll('.section-inner');
   sections.forEach(section => {
     const sectionTop = section.getBoundingClientRect().top;
     if (sectionTop < windowHeight * 0.8) {
       section.classList.add('visible');
     }
   });
   
   // Handle navigation background
   if (scrollY > 50) {
     mainNav.classList.add('scrolled');
   } else {
     mainNav.classList.remove('scrolled');
   }
 }
 
 // Smooth scrolling for navigation links
 function setupSmoothScrolling() {
   const navLinks = document.querySelectorAll('a[href^="#"]');
   
   navLinks.forEach(link => {
     link.addEventListener('click', function(e) {
       e.preventDefault();
       
       const targetId = this.getAttribute('href');
       if (targetId === '#') return;
       
       const targetElement = document.querySelector(targetId);
       if (targetElement) {
         targetElement.scrollIntoView({
           behavior: 'smooth',
           block: 'start'
         });
       }
     });
   });
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
   
   // Set up scroll animations
   handleScroll(); // Initial call to set up hero animations
   window.addEventListener('scroll', handleScroll);
   
   // Set up smooth scrolling
   setupSmoothScrolling();
   
   // Add hover effect to navigation when it's faded - modified to remove opacity changes
   mainNav.addEventListener('mouseenter', () => {
     // Navigation is always visible, so no need to change opacity
   });
   
   mainNav.addEventListener('mouseleave', () => {
     // Navigation is always visible, so no need to change opacity
   });
   
   // Add hover effect to controls when scrolled down
   controls.addEventListener('mouseenter', () => {
     if (window.scrollY >= 20) {
       controls.style.opacity = '0.7';
     }
   });
   
   controls.addEventListener('mouseleave', () => {
     if (window.scrollY >= 20) {
       controls.style.opacity = '0';
     }
   });
   
   // Add hover effect to speed display when scrolled down
   speedDisplay.addEventListener('mouseenter', () => {
     if (window.scrollY >= 20) {
       speedDisplay.style.opacity = '0.7';
     }
   });
   
   speedDisplay.addEventListener('mouseleave', () => {
     if (window.scrollY >= 20) {
       speedDisplay.style.opacity = '0';
     }
   });
 });
 
 // Parallax effect for solar system based on scroll
 window.addEventListener('scroll', () => {
   const scrollY = window.scrollY;
   
   // Only apply parallax if we have the sun and earth initialized
   if (sun && earth) {
     // Keep sun fixed at the center
     sun.x = canvas.width / 2;
     sun.y = canvas.height / 2;
     
     // Update earth position with new elliptical orbit based on scroll
     updateEarthPosition();
     
     // Update ray endpoints after earth position change
     updateRayEndpoints();
   }
 });
 
 // Scroll blur effect - modified to make it properly toggleable
 let isBlurActive = false;
 let scrollTimeout;

 function handleScrollBlur() {
   // Show the blur effect
   scrollBlur.style.opacity = '1';
   isBlurActive = true;
   
   // Clear any existing timeout
   clearTimeout(scrollTimeout);
 }

 // UPDATED: Improve blur toggling to work with more elements
 function toggleBlurEffect() {
   if (isBlurActive) {
     scrollBlur.style.opacity = '0';
     isBlurActive = false;
   } else {
     scrollBlur.style.opacity = '1';
     isBlurActive = true;
   }
 }

 // Toggle blur effect when clicking on background
 canvas.addEventListener('click', (e) => {
   // Only toggle if we're clicking on the background, not on Earth or Sun
   const clickX = e.clientX;
   const clickY = e.clientY;
   
   // Calculate distance from Earth and Sun centers
   const distanceFromEarth = Math.sqrt(Math.pow(clickX - earth.x, 2) + Math.pow(clickY - earth.y, 2));
   const distanceFromSun = Math.sqrt(Math.pow(clickX - sun.x, 2) + Math.pow(clickY - sun.y, 2));
   
   // If we're not clicking on Earth or Sun, toggle blur
   if (distanceFromEarth > earth.currentSize && distanceFromSun > sun.r) {
     toggleBlurEffect();
   }
 });

 // ADDED: Also toggle blur when clicking on navbar or speed display
 if (mainNav) {
   mainNav.addEventListener('click', (e) => {
     // Prevent toggle when clicking on links
     if (!e.target.closest('a')) {
       toggleBlurEffect();
     }
   });
 }

 if (speedDisplay) {
   speedDisplay.addEventListener('click', () => {
     toggleBlurEffect();
   });
 }

 // ADDED: Allow clicking anywhere on the document to toggle the blur
 // This ensures the blur can be toggled no matter where the user clicks
 document.addEventListener('click', (e) => {
   // Only process clicks that are not on the canvas, Earth, Sun, or interactive elements
   if (e.target !== canvas && 
       !e.target.closest('#mainNav a') && 
       !e.target.closest('.controls button') &&
       !e.target.closest('#speedMultiplier')) {
     toggleBlurEffect();
   }
 });

 // Modify scroll listener to avoid hiding blur effect
 window.addEventListener('scroll', handleScrollBlur);
 
 // Initialize the scene
 initScene();

// NEW: Extract Sun drawing to a separate function for better control over drawing order
function drawSun() {
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
  
  // Add a sun glow effect
  const sunOuterGlow = ctx.createRadialGradient(
    sun.x, sun.y, sun.r * 0.8,
    sun.x, sun.y, sun.r * 1.5
  );
  sunOuterGlow.addColorStop(0, 'rgba(255, 165, 0, 0.4)');
  sunOuterGlow.addColorStop(1, 'rgba(255, 165, 0, 0)');
  
  ctx.fillStyle = sunOuterGlow;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.r * 1.5, 0, Math.PI * 2);
  ctx.fill();
}
