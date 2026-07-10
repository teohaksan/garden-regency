// Image Optimization Script v2
// Resizes images to proper display dimensions and generates multiple sizes
// Based on PageSpeed Insights feedback

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = path.join(__dirname, '..', 'public')

// Image optimization config
// Format: { file, targetWidths[], maxWidth (default max display width) }
const OPTIMIZATIONS = [
  {
    file: 'logo.png',
    description: 'Navbar logo - displayed at 137x40 (max 240x70 on md+)',
    targetWidths: [240, 480], // 1x and 2x retina
    quality: 90,
  },
  {
    file: 'flower-r.webp',
    description: 'Right-side decoration - displayed at ~283x423 (max ~566x846 on retina)',
    targetWidths: [400, 800], // 1x and 2x
    quality: 80,
  },
  {
    file: 'flower-tr.webp',
    description: 'Top-right decoration - 38% width on hero',
    targetWidths: [400, 800],
    quality: 80,
  },
  {
    file: 'flower-bl.webp',
    description: 'Bottom-left decoration - 32% width on hero',
    targetWidths: [350, 700],
    quality: 80,
  },
  {
    file: 'flower-r-mobile.webp',
    description: 'Mobile version of right flower - 45vh tall',
    targetWidths: [300, 600],
    quality: 80,
  },
  {
    file: 'wechat-qr-small.webp',
    description: 'Small WeChat QR - 96x96',
    targetWidths: [96, 192],
    quality: 90,
  },
  {
    file: 'wechat-qr-big.webp',
    description: 'Big WeChat QR - 224x224 in modal',
    targetWidths: [224, 448],
    quality: 90,
  },
  {
    file: 'wechat-logo.webp',
    description: 'WeChat logo in modal - 64x64',
    targetWidths: [64, 128],
    quality: 90,
  },
  {
    file: 'location-wallpaper.webp',
    description: 'Desktop map wallpaper - full width background',
    targetWidths: [1920, 960], // 1x and 0.5x for memory
    quality: 75,
  },
  {
    file: 'location-wallpaper-mobile.webp',
    description: 'Mobile map wallpaper',
    targetWidths: [800, 400],
    quality: 75,
  },
]

async function optimizeImage({ file, targetWidths, quality, description }) {
  const inputPath = path.join(PUBLIC_DIR, file)
  if (!fs.existsSync(inputPath)) {
    console.log(`⏭️  Skipping ${file} (not found)`)
    return
  }

  const ext = path.extname(file)
  const baseName = path.basename(file, ext)
  const dir = path.dirname(file)

  console.log(`\n📸 Optimizing: ${file}`)
  console.log(`   ${description}`)

  // Get original metadata
  const metadata = await sharp(inputPath).metadata()
  console.log(`   Original: ${metadata.width}x${metadata.height} (${(fs.statSync(inputPath).size / 1024).toFixed(1)} KiB)`)

  for (const width of targetWidths) {
    // Don't upscale
    if (width > metadata.width) {
      console.log(`   ⏭️  Skipping width=${width} (larger than original ${metadata.width}px)`)
      continue
    }

    // Generate WebP version at this width
    const outputFileName = `${baseName}-${width}.webp`
    const outputPath = path.join(PUBLIC_DIR, dir, outputFileName)

    await sharp(inputPath)
      .resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality, effort: 6 })
      .toFile(outputPath)

    const newSize = fs.statSync(outputPath).size
    console.log(`   ✅ ${outputFileName}: ${width}px wide, ${(newSize / 1024).toFixed(1)} KiB`)
  }

  // Also generate a "default" sized version for direct use
  // Skip for WebP inputs (would overwrite source)
  const defaultWidth = targetWidths[0]
  const defaultFile = `${baseName}.webp`
  const defaultPath = path.join(PUBLIC_DIR, dir, defaultFile)
  const isInputWebP = path.extname(inputPath).toLowerCase() === '.webp'

  if (defaultWidth <= metadata.width && !isInputWebP) {
    await sharp(inputPath)
      .resize(defaultWidth, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality, effort: 6 })
      .toFile(defaultPath)

    const newSize = fs.statSync(defaultPath).size
    console.log(`   ✅ ${defaultFile}: ${defaultWidth}px (default), ${(newSize / 1024).toFixed(1)} KiB`)
  } else if (isInputWebP) {
    console.log(`   ℹ️  Input is WebP, skipping default overwrite`)
  }
}

async function main() {
  console.log('🎨 Image Optimization v2')
  console.log('========================\n')

  for (const opt of OPTIMIZATIONS) {
    await optimizeImage(opt)
  }

  console.log('\n✅ All images optimized!')
  console.log('\n📋 Next steps:')
  console.log('1. Update HTML/JSX to use new responsive image sources')
  console.log('2. Use <picture> with multiple <source> for srcset')
  console.log('3. Add fetchpriority="high" to LCP image')
  console.log('4. Remove loading="lazy" from above-the-fold images')
}

main().catch(console.error)
