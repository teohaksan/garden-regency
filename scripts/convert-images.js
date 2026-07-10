import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const PUBLIC_DIR = './public'
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg']

async function convertToWebP(inputPath, outputPath, options = {}) {
  const { width = null, quality = 85 } = options
  
  let pipeline = sharp(inputPath)
  
  if (width) {
    pipeline = pipeline.resize(width)
  }
  
  await pipeline
    .webp({ 
      quality,
      effort: 6, // Higher effort = better compression
      lossless: false
    })
    .toFile(outputPath)
  
  const inputSize = (await stat(inputPath)).size
  const outputSize = (await stat(outputPath)).size
  const saved = ((1 - outputSize / inputSize) * 100).toFixed(1)
  
  console.log(`✓ ${basename(inputPath)} → ${basename(outputPath)}: ${(inputSize/1024).toFixed(0)}KB → ${(outputSize/1024).toFixed(0)}KB (saved ${saved}%)`)
}

async function processImages() {
  console.log('🖼️  Converting images to WebP...\n')
  
  const files = await readdir(PUBLIC_DIR)
  const pngFiles = files.filter(f => extname(f).toLowerCase() === '.png')
  
  for (const file of pngFiles) {
    const inputPath = join(PUBLIC_DIR, file)
    const baseName = basename(file, '.png')
    
    // Original WebP
    await convertToWebP(inputPath, join(PUBLIC_DIR, `${baseName}.webp`))
    
    // Mobile version (800px width) for large images
    const inputSize = (await stat(inputPath)).size
    if (inputSize > 500 * 1024) { // > 500KB
      await convertToWebP(inputPath, join(PUBLIC_DIR, `${baseName}-mobile.webp`), { width: 800 })
      console.log(`  ↳ Created mobile version (800px width)`)
    }
  }
  
  console.log('\n✅ All images converted!')
}

processImages().catch(console.error)
