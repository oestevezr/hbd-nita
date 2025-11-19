# Birthday Experience for Tina 🎂

A sentimental and interactive 3D birthday experience built with React, Three.js, and React Three Fiber.

## Features

- 🖥️ Retro hacker terminal intro with typewriter effect
- 🌍 Immersive 360° background sphere using a personal photo
- 🎂 Animated 3D birthday cake
- 🖼️ Photo frames displaying cherished memories
- ✉️ Interactive letter with heartfelt message
- 🎨 Warm candlelight atmosphere with custom lighting
- 🌟 Starfield background for magical ambiance

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your assets to the `/public` folder:
   - `cake.glb` - Birthday cake 3D model
   - `frame.glb` - Photo frame 3D model
   - `table.glb` - Table 3D model
   - `background.jpg` - 360° background photo
   - `photo1.jpg` - First photo for frame
   - `photo2.jpg` - Second photo for frame

3. Customize the content:
   - Edit `src/components/IntroOverlay.jsx` - Update the terminal messages (line 13)
   - Edit `src/components/Letter.jsx` - Personalize the birthday letter (lines 60-85)
   - Adjust model positions/scales in `src/components/Scene.jsx` (see comments)

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Customization Guide

### Adjusting 3D Model Positions and Scales

All 3D models have comments indicating where to adjust their properties:

**In `Scene.jsx`:**
- Table: Line 52 - `position={[0, -2, 0]} scale={1}`
- Cake: Line 56 - `position={[0, -1, 0]} scale={1}`
- Photo Frames: Lines 60-73 - Adjust `position`, `rotation`, and `scale`
- Letter: Line 76 - `position={[0, -1.5, 2]}`

**Individual Component Files:**
- `Cake.jsx` - Lines 19-20 for scale and position
- `Table.jsx` - Lines 14-15 for scale and position
- `PhotoFrame.jsx` - Lines 25-26 for photo plane adjustments

### Position Format
`position={[x, y, z]}`
- x: left (-) / right (+)
- y: down (-) / up (+)
- z: back (-) / forward (+)

### Rotation Format
`rotation={[x, y, z]}`
- Values in radians
- Use `Math.PI / 6` for 30°, `Math.PI / 4` for 45°, etc.

## Tech Stack

- React + Vite
- Three.js
- @react-three/fiber
- @react-three/drei
- Framer Motion
- TailwindCSS

## Tips

- If models appear too large/small, adjust the `scale` prop (try 0.5, 2, etc.)
- If the background is too bright, change `opacity={0.7}` in `Scene.jsx` line 42
- Typing speed can be adjusted in `IntroOverlay.jsx` line 46 (currently 50ms per character)
- Camera controls can be tweaked in `Scene.jsx` lines 82-87

Enjoy creating a memorable birthday experience! 🎉
