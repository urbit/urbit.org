#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Generates responsive sizes of the hero background image
 * Converts from PNG to WebP for optimal performance
 *
 * Usage: node scripts/optimize-hero-image.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_IMAGE = path.join(__dirname, '../public/images/galactic-dither.png');
const OUTPUT_DIR = path.join(__dirname, '../public/images');

// Responsive image sizes
const SIZES = [
  { name: 'small', width: 768, suffix: '-small' },
  { name: 'medium', width: 1536, suffix: '-medium' },
  { name: 'large', width: 2560, suffix: '-large' },
  { name: 'xl', width: 3840, suffix: '-xl' },
];

async function optimizeImage() {
  console.log('Starting image optimization...\n');

  // Check if input file exists
  if (!fs.existsSync(INPUT_IMAGE)) {
    console.error(`Error: Input image not found at ${INPUT_IMAGE}`);
    process.exit(1);
  }

  // Get original image info
  const imageInfo = await sharp(INPUT_IMAGE).metadata();
  console.log(`Original image: ${imageInfo.width}x${imageInfo.height}, ${(imageInfo.size / 1024 / 1024).toFixed(2)}MB\n`);

  // Process each size
  for (const size of SIZES) {
    const outputPath = path.join(OUTPUT_DIR, `galactic-dither${size.suffix}.webp`);

    console.log(`Generating ${size.name} (${size.width}px)...`);

    await sharp(INPUT_IMAGE)
      .resize(size.width, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(outputPath);

    // Get file size
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`  ✓ Saved: ${outputPath}`);
    console.log(`  Size: ${sizeMB}MB (${sizeKB}KB)\n`);
  }

  // Also create a fallback PNG at reasonable size
  const fallbackPath = path.join(OUTPUT_DIR, 'galactic-dither-optimized.png');
  console.log('Generating optimized PNG fallback (2560px)...');

  await sharp(INPUT_IMAGE)
    .resize(2560, null, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .png({
      quality: 85,
      compressionLevel: 9,
    })
    .toFile(fallbackPath);

  const fallbackStats = fs.statSync(fallbackPath);
  const fallbackSizeMB = (fallbackStats.size / 1024 / 1024).toFixed(2);

  console.log(`  ✓ Saved: ${fallbackPath}`);
  console.log(`  Size: ${fallbackSizeMB}MB\n`);

  console.log('✓ Image optimization complete!');
  console.log('\nGenerated files:');
  console.log('  - galactic-dither-small.webp (768px)');
  console.log('  - galactic-dither-medium.webp (1536px)');
  console.log('  - galactic-dither-large.webp (2560px)');
  console.log('  - galactic-dither-xl.webp (3840px)');
  console.log('  - galactic-dither-optimized.png (2560px fallback)');
}

// Run the optimization
optimizeImage().catch(err => {
  console.error('Error during image optimization:', err);
  process.exit(1);
});
