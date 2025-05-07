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
 const baseRotationSpeed = baseOrbitSpeed * 7.5; // Degrees per frame for earth's rotation
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
   // Increase density of rays for better coverage
   rayInterval = 0.3; // Higher density to eliminate gaps
   const numRays = Math.floor(360 / rayInterval);
   
   // Create an array to store ray directions for better distribution
   const rayDirections = [];
   
   // First generate evenly distributed ray directions
   for (let i = 0; i < numRays; i++) {
     const angleDeg = i * rayInterval;
     const angleRad = degToRad(angleDeg);
     
     // Direction vector from the Sun
     const dir = {
       x: Math.cos(angleRad),
       y: Math.sin(angleRad)
     };
     
     // Normalize direction vector
     const magnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
     if (magnitude > 0) {
       dir.x /= magnitude;
       dir.y /= magnitude;
     }
     
     rayDirections.push({
       angle: angleDeg,
       dir: dir
     });
   }
   
   
   // Now create rays with varied properties for natural appearance
   for (const rayDir of rayDirections) {
     // Start point is on the periphery of the sun
     const start = {
       x: sun.x + rayDir.dir.x * sun.r,
       y: sun.y + rayDir.dir.y * sun.r
     };
     
     // Create ray with varied properties for natural appearance
     const baseOpacity = 0.15 + 0.1 * Math.random(); // Reduced base opacity
     const baseLength = 0.8 + 0.4 * Math.random(); // Variable ray length
     const shimmerSpeed = 0.5 + Math.random() * 1.5; // Variable shimmer speed
     const shimmerAmount = 0.03 + Math.random() * 0.08; // Variable shimmer amount
     
     rays.push({
       start: start,
       dir: rayDir.dir,
       end: { x: start.x + rayDir.dir.x * canvas.width * baseLength, 
              y: start.y + rayDir.dir.y * canvas.width * baseLength },
       angle: rayDir.angle,
       baseOpacity: baseOpacity,
       currentOpacity: baseOpacity,
       phase: Math.random() * Math.PI * 2, // Random starting phase
       shimmerSpeed: shimmerSpeed,
       shimmerAmount: shimmerAmount,
       baseLength: baseLength,
       color: `rgba(255, 215, 0, ${baseOpacity})`
     });
   }
   
   // Sort rays by angle for consistent rendering
   rays.sort((a, b) => a.angle - b.angle);
 }
 
 // Generate stars for the background
 function generateStars() {
   stars = [];
   const numStars = Math.floor(canvas.width * canvas.height / 1800); // Slightly increased density
   
   for (let i = 0; i < numStars; i++) {
     // Random position across the entire canvas
     const x = Math.random() * canvas.width;
     const y = Math.random() * canvas.height;
     
     // Enhanced star size distribution with more variation
     let size;
     const sizeDist = Math.random();
     if (sizeDist > 0.97) { // 3% chance of large star
       size = 2 + Math.random() * 2; // 2-4 pixels
     } else if (sizeDist > 0.85) { // 12% chance of medium star
       size = 1.2 + Math.random() * 0.8; // 1.2-2 pixels
     } else { // 85% chance of small star
       size = 0.4 + Math.random() * 0.8; // 0.4-1.2 pixels
     }
     
     // More varied distance assignment for better parallax
     const distance = size < 1.2 ? 
                     2 + Math.random() * 3 : // Distant stars (smaller)
                     0.7 + Math.random() * 1; // Closer stars (larger)
     
     // Enhanced brightness properties
     const baseBrightness = 0.3 + Math.random() * 0.65;
     
     // More varied flickering speeds
     const flickerSpeed = 0.2 + Math.random() * 4;
     
     // Random phases for animation offset
     const phase = Math.random() * Math.PI * 2;
     const phase2 = Math.random() * Math.PI * 2;
     const phase3 = Math.random() * Math.PI * 2;
     
     // Enhanced twinkling patterns (0-3)
     const twinklePattern = Math.floor(Math.random() * 4);
     
     // Enhanced color distribution
     let hue, saturation;
     const colorDist = Math.random();
     if (colorDist > 0.8) { // 20% colored stars
       if (colorDist > 0.9) { // 10% blue stars
         hue = 200 + Math.random() * 40; // Blue range
         saturation = 20 + Math.random() * 40;
       } else { // 10% yellow/orange stars
         hue = 30 + Math.random() * 30; // Yellow-orange range
         saturation = 30 + Math.random() * 50;
       }
     } else { // 80% white stars
       hue = 0;
       saturation = 0;
     }
     
     // Enhanced glow effect distribution
     const hasGlow = Math.random() > 0.8; // 20% chance of having glow
     
     // Enhanced movement properties
     const moveSpeed = 0.03 + Math.random() * 0.2;
     const moveAngle = Math.random() * Math.PI * 2;
     
     // More varied movement radius based on size and distance
     const baseMoveRadius = 1.5 + Math.random() * 2.5;
     const moveRadius = size < 1.5 ? 
                        baseMoveRadius * 1.2 : // Smaller stars move more
                        baseMoveRadius * 0.5; // Larger stars move less
     
     const movePhase = Math.random() * Math.PI * 2;
     
     // Enhanced secondary movement
     const hasSecondaryMovement = Math.random() > 0.5; // 50% chance (increased)
     const secondaryMoveSpeed = 0.01 + Math.random() * 0.07;
     const secondaryMoveRadius = 0.3 + Math.random() * 1.2; // Increased radius
     const secondaryMovePhase = Math.random() * Math.PI * 2;
     
     stars.push({
       x,
       y,
       originalX: x,
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
   const earthOrbitRadius = Math.min(canvas.width, canvas.height) * 0.4;
   
   // Calculate initial ellipse parameters based on scroll
   const baseEccentricity = 0.0167; // Earth's actual orbital eccentricity
   const maxScrollEccentricity = 5; // Maximum eccentricity based on scroll
   const scrollEccentricity = Math.min(maxScrollEccentricity, scrollY * parallaxFactor / earthOrbitRadius);
   const eccentricity = baseEccentricity + scrollEccentricity; // Update eccentricity based on scroll
   const semiMajorAxis = earthOrbitRadius;
   const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);
   
   earth = {
     orbitRadius: earthOrbitRadius,
     r: Math.min(canvas.width, canvas.height) * 0.05, // Base radius
     currentSize: Math.min(canvas.width, canvas.height) * 0.075, // Initial current size
     // Real astronomical parameters
     axialTilt: 23.5, // Earth's axial tilt in degrees
     orbitalInclination: 0, // Earth's orbital inclination (simplified)
     x: centerX + semiMajorAxis * Math.cos(degToRad(rotationAngle)), // Initial position (0 degrees)
     y: centerY + semiMinorAxis * Math.sin(degToRad(rotationAngle)), // Initial position on elliptical orbit
     rotationAngle: 0, // Initial rotation angle
     seasonalAngle: 0, // Added for seasonal effect
     currentInclination: 0, // Current inclination of orbit
     behindSun: false, // Added for z-index tracking
     depthFactor: 0, // Added for 3D position calculation
     movingDirection: 0, // Added for direction tracking
     prevX: 0, // Added for previous position tracking
     prevY: 0, // Added for previous position tracking
     brightnessFactor: 1.0 // Added for brightness adjustment
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
   
   // Add a small buffer to ensure rays reach the edge
   const buffer = 1.0;
   
   // Top edge (y=0)
   let tTop = null;
   if (Math.abs(D.y) > 1e-6) {
     tTop = (0 - S.y - buffer) / D.y;
   }
   
   // Bottom edge (y=H)
   let tBottom = null;
   if (Math.abs(D.y) > 1e-6) {
     tBottom = (H - S.y + buffer) / D.y;
   }
   
   // Left edge (x=0)
   let tLeft = null;
   if (Math.abs(D.x) > 1e-6) {
     tLeft = (0 - S.x - buffer) / D.x;
   }
   
   // Right edge (x=W)
   let tRight = null;
   if (Math.abs(D.x) > 1e-6) {
     tRight = (W - S.x + buffer) / D.x;
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
   
   // Store previous position for direction calculation
   const prevX = earth.x - sun.x;
   const prevY = earth.y - sun.y;
   
   // Apply inclination rotation
   const inclinedX = x;
   const inclinedY = y * Math.cos(inclinationRad) + x * Math.sin(inclinationRad);
   
   // Set earth position
   earth.x = sun.x + inclinedX;
   earth.y = sun.y + inclinedY;
   
   // Calculate direction of movement (for z-index)
   // This tracks whether Earth is moving upward or downward
   // Negative movingDirection = moving upward, positive = moving downward
   earth.movingDirection = Math.sign(Math.sin(angleRad));
   
   // Store current parameters for orbit drawing
   earth.currentSemiMajorAxis = semiMajorAxis;
   earth.currentSemiMinorAxis = semiMinorAxis;
   earth.currentInclination = currentInclination;
   earth.prevX = prevX;
   earth.prevY = prevY;
   
   // Update earth's own rotation
   earth.rotationAngle = earthRotationAngle;
   
   // Calculate seasonal effect based on position in orbit
   earth.seasonalAngle = (rotationAngle + 90) % 360; // Northern hemisphere summer at 90°
   
   // Calculate Earth's position relative to the Sun in 3D space
   // This is used for determining when Earth is behind the Sun
   // Calculate normalized position on orbit (0-1)
   const normalizedOrbitPosition = (rotationAngle % 360) / 360;
   
   // Determine if Earth is in front of or behind the Sun based on angle
   // Earth is behind Sun when in the half of orbit where cos(angle) < 0
   const isBehindSun = Math.cos(angleRad) < 0;
   
   // Calculate how close Earth is to directly overlapping the Sun
   // When cos(angle) = 0, Earth is directly to the side
   // When cos(angle) = -1 or 1, Earth is directly in line with Sun
   const alignmentWithSun = Math.abs(Math.cos(angleRad));
   
   // Calculate a depth factor that is:
   // - Positive when Earth is in front of Sun (closer to viewer)
   // - Negative when Earth is behind Sun (farther from viewer)
   // - Magnitude increases as Earth gets more aligned with Sun
   const depthFactor = isBehindSun ? -alignmentWithSun : alignmentWithSun;
   
   // Store the depth factor for use in drawing
   earth.depthFactor = depthFactor;
   
   // IMPROVED SIZE VARIATION: More realistic 3D effect
   // Size varies from 1.4x (closest to viewer) to 0.5x (farthest from viewer)
   if (scrollProgress > 0) {
     // Calculate size based on depth and the Earth's position relative to Sun
     // Map depth factor from -1 (farthest behind Sun) to 1 (closest to viewer)
     // to size multiplier from 0.5 to 1.4
     
     // First, calculate a base scale factor that increases with scroll/inclination
     const inclinationEffect = scrollProgress * 0.9; // 0 to 0.9
     
     // Calculate apparent size based on position relative to Sun
     // Depthfactor ranges from -1 to 1, we want to map this to 0.5 to 1.4
     const distanceScaleFactor = 0.95 + (0.45 * depthFactor);
     
     // Combine the effects - size is affected by both inclination and position
     const finalSizeMultiplier = 1.0 + (inclinationEffect * distanceScaleFactor);
     
     // Ensure we stay within the specified size range (0.5 to 1.4 times normal size)
     const clampedMultiplier = Math.max(0.5, Math.min(1.4, finalSizeMultiplier));
     
     // Apply to Earth's current size
     earth.currentSize = earth.r * clampedMultiplier;
   } else {
     // At top of page, keep Earth at its original size
     earth.currentSize = earth.r;
   }
   
   // Calculate position in the orbit for brightness adjustment
   // Calculate normalized height in orbit (0 = middle, 1 = top, -1 = bottom)
   const normalizedHeight = Math.sin(angleRad);
   
   // Determine brightness factor based on position
   // Brightest at the top of orbit, slightly brighter when overlapping with Sun
   const topOfOrbitBrightness = Math.max(0, normalizedHeight); // 0 to 1 (brightest at top)
   const sunOverlapBrightness = isOverlappingSun ? 0.15 : 0; // Bonus brightness when overlapping Sun
   
   // Combine factors with appropriate weighting
   earth.brightnessFactor = 1.0 + (topOfOrbitBrightness * 0.25) + sunOverlapBrightness;
   
   // COMPLETELY REVISED Z-INDEX CALCULATION:
   // This is the critical part that determines if Earth appears in front of or behind the Sun
   
   // First, check if there's any overlap at all
   const distanceFromSunCenter = Math.sqrt(inclinedX * inclinedX + inclinedY * inclinedY);
   const isOverlappingSun = distanceFromSunCenter < (sun.r + earth.currentSize * 0.8);
   
   // Only apply special handling when there's significant inclination and actual overlap
   if (isOverlappingSun && currentInclination > 30) {
     // REVERSED LOGIC (per request):
     // - Earth moving from bottom to top (negative direction) → Earth is BEHIND Sun
     // - Earth moving from top to bottom (positive direction) → Earth is IN FRONT of Sun
     earth.behindSun = earth.movingDirection < 0; // If moving upward, Earth is behind Sun
   } else {
     // When not in overlap zone, use standard depth calculation based on orbit position
     const angleThreshold = currentInclination > 50 ? 0.05 : 0.2;
     earth.behindSun = isBehindSun && alignmentWithSun > angleThreshold && currentInclination > 30;
   }
   
   // Store angle info for debugging
   earth.angle = rotationAngle;
   earth.sinValue = Math.sin(angleRad);
 }
 
 // Calculate ray endpoints based on current earth position and size
 function updateRayEndpoints() {
   // Get the maximum possible ray length (diagonal of canvas)
   const maxRayLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
   
   for (const ray of rays) {
     // Update ray start point to be on the sun's periphery
     const angleRad = degToRad(ray.angle);
     ray.start.x = sun.x + Math.cos(angleRad) * sun.r;
     ray.start.y = sun.y + Math.sin(angleRad) * sun.r;
     
     // Ensure the direction vector is normalized
     const magnitude = Math.sqrt(ray.dir.x * ray.dir.x + ray.dir.y * ray.dir.y);
     if (magnitude > 0 && Math.abs(magnitude - 1.0) > 0.001) {
       ray.dir.x /= magnitude;
       ray.dir.y /= magnitude;
     }
     
     // Calculate ray endpoint
     // If Earth is in front of the Sun, rays should stop at the Earth's edge
     // If Earth is behind the Sun, rays should continue through Earth
     
     if (earth.behindSun) {
       // Earth is behind Sun, rays continue past Earth
       const tCanvas = getCanvasIntersection(ray.start, ray.dir);
       
       if (tCanvas !== null && tCanvas > 0) {
         ray.end = {
           x: ray.start.x + tCanvas * ray.dir.x,
           y: ray.start.y + tCanvas * ray.dir.y
         };
       } else {
         ray.end = {
           x: ray.start.x + ray.dir.x * maxRayLength,
           y: ray.start.y + ray.dir.y * maxRayLength
         };
       }
       
       // No Earth intersection, so no need to store intersection point
       ray.earthIntersection = null;
     } else {
       // Earth is in front of Sun, rays stop at Earth
       const tEarth = lineCircleIntersection(ray.start, ray.dir, earth, earth.currentSize);
       const tCanvas = getCanvasIntersection(ray.start, ray.dir);
       
       // Determine final endpoint
       let tFinal = null;
       
       if (tEarth !== null && tEarth > 0) {
         // Ray hits Earth - extend slightly to ensure no visual gap
         tFinal = tEarth + 0.5; // Add a small extension to ensure rays connect with Earth
         
         // Store the exact Earth intersection point for gradient calculation
         ray.earthIntersection = {
           x: ray.start.x + tEarth * ray.dir.x,
           y: ray.start.y + tEarth * ray.dir.y
         };
         
         // But don't extend past canvas
         if (tCanvas !== null && tFinal > tCanvas) {
           tFinal = tCanvas;
         }
       } else if (tCanvas !== null && tCanvas > 0) {
         // Ray hits canvas edge
         tFinal = tCanvas;
         ray.earthIntersection = null;
       } else {
         // Fallback - extend to a reasonable length
         tFinal = maxRayLength / Math.sqrt(ray.dir.x * ray.dir.x + ray.dir.y * ray.dir.y);
         ray.earthIntersection = null;
       }
       
       ray.end = {
         x: ray.start.x + tFinal * ray.dir.x,
         y: ray.start.y + tFinal * ray.dir.y
       };
     }
   }
 }
 
 // Draw the Earth with realistic image - improved for seamless wrapping
 function drawEarth() {
   // Draw solid black background first to ensure complete opacity
   ctx.fillStyle = '#000000';
   ctx.beginPath();
   ctx.arc(earth.x, earth.y, earth.currentSize, 0, Math.PI * 2);
   ctx.fill();
   
   // Draw base Earth (ocean) as fallback
   ctx.fillStyle = '#093456'; // Darker, more muted blue for oceans
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
       const rotationAngleRad = degToRad(earth.rotationAngle);
       const imageWidth = earthImage.width || size;
       
       // Calculate how much to offset the image horizontally based on rotation
       const offsetX = -imageWidth * (rotationAngleRad / (Math.PI * 2));
       
       // Apply brightness adjustment based on Earth's position in orbit
       // This is where we implement the brightness variation requirement
       ctx.globalAlpha = Math.min(1.0, earth.brightnessFactor);
       
       // Draw the image twice side by side to create a seamless wrap
       ctx.drawImage(
         earthImage, 
         -size/2 + offsetX % size, 
         -size/2, 
         size, 
         size
       );
       
       ctx.drawImage(
         earthImage, 
         -size/2 + offsetX % size + size, 
         -size/2, 
         size, 
         size
       );
       
       // Reset opacity
       ctx.globalAlpha = 1.0;
       
       // Reset transformation
       ctx.setTransform(1, 0, 0, 1, 0, 0);
       
       // Restore context to remove clipping
       ctx.restore();
     } catch (error) {
       console.error("Error drawing Earth image:", error);
     }
   }
   
   // Add very subtle atmosphere glow (further reduced)
   const glowIntensity = 0.07 * earth.brightnessFactor; // Scaled by brightness factor
   
   const glowGrad = ctx.createRadialGradient(
     earth.x, earth.y, earth.currentSize * 0.95,
     earth.x, earth.y, earth.currentSize * 1.05
   );
   safeAddColorStop(glowGrad, 0, `rgba(255, 255, 255, ${glowIntensity})`);
   safeAddColorStop(glowGrad, 1, 'rgba(255, 255, 255, 0)');
   
   ctx.fillStyle = glowGrad;
   ctx.beginPath();
   ctx.arc(earth.x, earth.y, earth.currentSize * 1.05, 0, Math.PI * 2);
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
   
   // Set back to normal composite operation before drawing main elements
   ctx.globalCompositeOperation = 'source-over';
   
   // Draw rays with improved rendering
   ctx.lineWidth = 1;
   
   // First sort rays by angle for consistent drawing order
   rays.sort((a, b) => a.angle - b.angle);
   
   // Use lighter blend mode for rays only
   ctx.globalCompositeOperation = 'lighter';
   
   // Always draw rays first (with lighter blend mode)
   for (const ray of rays) {
     // Use the current calculated opacity
     let rayOpacity = ray.currentOpacity;
     
     // Draw the ray with a gradient for better appearance
     // If the ray intersects with Earth, make a custom gradient that stays bright until Earth
     if (ray.earthIntersection) {
       // Calculate the distance from Sun to Earth intersection
       const sunToEarthDist = Math.sqrt(
         Math.pow(ray.earthIntersection.x - ray.start.x, 2) + 
         Math.pow(ray.earthIntersection.y - ray.start.y, 2)
       );
       
       // Calculate full ray length
       const fullRayLength = Math.sqrt(
         Math.pow(ray.end.x - ray.start.x, 2) + 
         Math.pow(ray.end.y - ray.start.y, 2)
       );
       
       // Calculate where Earth intersection is along the ray (0-1)
       const earthIntersectRatio = sunToEarthDist / fullRayLength;
       
       // Create a gradient that maintains full brightness until Earth's surface
       const rayGrad = ctx.createLinearGradient(
         ray.start.x, ray.start.y,
         ray.end.x, ray.end.y
       );
       
       // Stay bright until just before hitting Earth
       safeAddColorStop(rayGrad, 0, `rgba(255, 215, 0, ${rayOpacity})`);
       // Maintain brightness right up until Earth intersection
       safeAddColorStop(rayGrad, earthIntersectRatio - 0.001, `rgba(255, 215, 0, ${rayOpacity})`);
       // Then quickly fade out just after Earth surface
       safeAddColorStop(rayGrad, earthIntersectRatio + 0.02, `rgba(255, 215, 0, 0)`);
       
       ctx.strokeStyle = rayGrad;
     } else {
       // Standard gradient for rays that don't hit Earth
       const rayGrad = ctx.createLinearGradient(
         ray.start.x, ray.start.y,
         ray.end.x, ray.end.y
       );
       
       // Create a fade-out effect along the ray
       safeAddColorStop(rayGrad, 0, `rgba(255, 215, 0, ${rayOpacity})`);
       safeAddColorStop(rayGrad, 0.7, `rgba(255, 215, 0, ${rayOpacity * 0.7})`);
       safeAddColorStop(rayGrad, 1, `rgba(255, 215, 0, 0)`);
       
       ctx.strokeStyle = rayGrad;
     }
     
     // Draw the ray
     ctx.beginPath();
     ctx.moveTo(ray.start.x, ray.start.y);
     ctx.lineTo(ray.end.x, ray.end.y);
     ctx.stroke();
   }
   
   // Reset composite operation for normal drawing
   ctx.globalCompositeOperation = 'source-over';
   
   // Now draw Earth and Sun in the correct order based on which is in front
   if (earth.behindSun) {
     // Earth behind Sun → Draw Earth, then Sun
     // This gives Sun a higher z-index because it's drawn last
     drawEarth();
     drawSun();
   } else {
     // Earth in front of Sun → Draw Sun, then Earth
     // This gives Earth a higher z-index because it's drawn last
     drawSun();
     drawEarth();
   }
   
   // Reset composite operation
   ctx.globalCompositeOperation = 'source-over';
 }
 
 // Draw stars with enhanced flickering effect
 function drawStars() {
   const time = performance.now() * 0.001; // Current time in seconds
   
   // Calculate star movement speed based on Earth's revolution speed
   const earthRevolutionSpeed = baseOrbitSpeed * speedMultiplier;
   const starMovementFactor = earthRevolutionSpeed / 80; // Increased from 1/100 to 1/80
   
   for (const star of stars) {
     // Enhanced twinkling algorithm with more dramatic effects
     let combinedFlicker;
     
     switch(star.twinklePattern) {
       case 0: // Simple sine wave, now more pronounced
         combinedFlicker = Math.sin(time * star.flickerSpeed + star.phase) * 0.3;
         break;
       case 1: // Multiple sine waves with different frequencies
         combinedFlicker = Math.sin(time * star.flickerSpeed + star.phase) * 0.2 +
                          Math.sin(time * (star.flickerSpeed * 0.7) + star.phase2) * 0.15 +
                          Math.sin(time * (star.flickerSpeed * 1.3) + star.phase3) * 0.08;
         break;
       case 2: // Sharper flicker using absolute sine
         combinedFlicker = Math.abs(Math.sin(time * star.flickerSpeed + star.phase)) * 0.3 - 0.15;
         break;
       case 3: // Complex pattern with occasional dramatic flares
         const baseFlicker = Math.sin(time * star.flickerSpeed + star.phase) * 0.15;
         const randomFlare = Math.pow(Math.sin(time * 0.2 + star.phase2), 10) * 0.5; // Occasional bright flares
         combinedFlicker = baseFlicker + randomFlare;
         break;
     }
     
     // Apply the enhanced flicker effect
     const brightness = Math.max(0.1, Math.min(1, star.baseBrightness + combinedFlicker));
     
     // Enhanced parallax movement
     const distanceFactor = 1 / star.distance;
     const timeScale = time * starMovementFactor;
     
     // Primary movement - now more pronounced for closer stars
     let moveX = Math.cos(timeScale * star.moveSpeed + star.movePhase) * star.moveRadius * distanceFactor * 1.5;
     let moveY = Math.sin(timeScale * star.moveSpeed + star.movePhase + star.moveAngle) * star.moveRadius * distanceFactor * 1.5;
     
     // Add secondary movement with better properties for some stars
     if (star.hasSecondaryMovement) {
       moveX += Math.cos(timeScale * star.secondaryMoveSpeed + star.secondaryMovePhase) * star.secondaryMoveRadius * distanceFactor * 1.8;
       moveY += Math.sin(timeScale * star.secondaryMoveSpeed + star.secondaryMovePhase * 1.5) * star.secondaryMoveRadius * distanceFactor * 1.8;
     }
     
     // Apply movement to position
     const currentX = star.originalX + moveX;
     const currentY = star.originalY + moveY;
     
     // Further enhance glow effect for more dramatic twinkling
     if (star.hasGlow) {
       const pulseEffect = 0.5 + Math.sin(time * 0.3 + star.phase) * 0.5;
       const glowSize = star.size * (2.5 + pulseEffect);
       
       // More pronounced glow gradient
       const gradient = ctx.createRadialGradient(
         currentX, currentY, 0,
         currentX, currentY, glowSize
       );
       
       // Enhanced glow colors
       if (star.hue === 0) {
         safeAddColorStop(gradient, 0, `rgba(255, 255, 255, ${brightness * 0.9})`);
         safeAddColorStop(gradient, 0.5, `rgba(255, 255, 255, ${brightness * 0.3})`);
         safeAddColorStop(gradient, 1, 'rgba(255, 255, 255, 0)');
       } else {
         safeAddColorStop(gradient, 0, `hsla(${star.hue}, ${star.saturation}%, 80%, ${brightness * 0.9})`);
         safeAddColorStop(gradient, 0.5, `hsla(${star.hue}, ${star.saturation}%, 80%, ${brightness * 0.3})`);
         safeAddColorStop(gradient, 1, `hsla(${star.hue}, ${star.saturation}%, 80%, 0)`);
       }
       
       ctx.fillStyle = gradient;
       ctx.beginPath();
       ctx.arc(currentX, currentY, glowSize, 0, Math.PI * 2);
       ctx.fill();
     }
     
     // Draw the star itself with enhanced brightness
     if (star.hue === 0) {
       ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
     } else {
       ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 80%, ${brightness})`;
     }
     
     ctx.beginPath();
     ctx.arc(currentX, currentY, star.size, 0, Math.PI * 2);
     ctx.fill();
   }
 }
 
 // New utility function to safely add color stops
 function safeAddColorStop(gradient, position, color) {
   // Ensure position is within valid range [0, 1]
   const safePosition = Math.max(0, Math.min(1, position));
   gradient.addColorStop(safePosition, color);
 }

 // Animation loop - improved ray animation
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
     
     // Toned down ray shimmer animation
     const time = performance.now() * 0.001; // Current time in seconds
     for (const ray of rays) {
       // Create more subtle shimmer effect
       const shimmerFactor = Math.sin(time * ray.shimmerSpeed + ray.phase) * (ray.shimmerAmount * 0.7);
       const secondaryShimmer = Math.sin(time * 0.5 + ray.phase * 2) * 0.015; // Reduced secondary effect
       
       // Combine multiple shimmer effects
       const combinedShimmer = shimmerFactor + secondaryShimmer;
       
       // Apply shimmer to opacity with reduced maximum opacity and clamping
       ray.currentOpacity = Math.max(0.05, Math.min(0.45, ray.baseOpacity + combinedShimmer));
       
       // Less intense boost for vertical rays
       const verticalFactor = Math.abs(Math.sin(degToRad(ray.angle)));
       if (verticalFactor > 0.85) { // Within ~30 degrees of vertical
         ray.currentOpacity = Math.min(0.5, ray.currentOpacity * 1.15); // Reduced boost for vertical rays with clamping
       }
       
       // Update ray color with current opacity
       ray.color = `rgba(255, 215, 0, ${ray.currentOpacity})`;
     }
   }
   
   // Always draw the scene, even when orbit animation is paused
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
  // Draw Sun with reduced brightness
  const sunGrad = ctx.createRadialGradient(
    sun.x, sun.y, 0,
    sun.x, sun.y, sun.r
  );
  safeAddColorStop(sunGrad, 0, 'rgba(255, 250, 235, 0.95)'); // Less bright core
  safeAddColorStop(sunGrad, 0.2, 'rgba(255, 235, 0, 0.85)'); // More muted yellow
  safeAddColorStop(sunGrad, 1, 'rgba(255, 140, 0, 0.7)'); // More muted orange edge
  
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
  ctx.fill();
  
  // Add more subtle sun glow effect
  const sunOuterGlow = ctx.createRadialGradient(
    sun.x, sun.y, sun.r * 0.8,
    sun.x, sun.y, sun.r * 1.4
  );
  safeAddColorStop(sunOuterGlow, 0, 'rgba(255, 140, 0, 0.25)'); // Reduced glow intensity
  safeAddColorStop(sunOuterGlow, 1, 'rgba(255, 140, 0, 0)');
  
  ctx.fillStyle = sunOuterGlow;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.r * 1.4, 0, Math.PI * 2);
  ctx.fill();
}
