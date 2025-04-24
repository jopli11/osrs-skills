import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory (equivalent of __dirname in ESM)
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Make sure the output directory exists
const outputDir = path.join(__dirname, 'public', 'images', 'optimized');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Path to input image
const inputPath = path.join(__dirname, 'public', 'images', 's0z89td7gz021.png');

// Create WebP version (highest quality)
sharp(inputPath)
    .webp({ quality: 85 }) // 85% quality offers good compression with minimal quality loss
    .toFile(path.join(outputDir, 'bg-texture.webp'), (err) => {
        if (err) {
            console.error('Error creating WebP image:', err);
        } else {
            console.log('✅ WebP image created successfully');
        }
    });

// Create low-quality placeholder for faster loading
sharp(inputPath)
    .resize(20) // Very small image
    .blur(5) // Blur it
    .webp({ quality: 20 }) // Low quality
    .toFile(path.join(outputDir, 'bg-texture-placeholder.webp'), (err) => {
        if (err) {
            console.error('Error creating placeholder image:', err);
        } else {
            console.log('✅ Placeholder image created successfully');
        }
    });

// Create smaller size for mobile
sharp(inputPath)
    .resize({ width: 1024 })
    .webp({ quality: 75 })
    .toFile(path.join(outputDir, 'bg-texture-mobile.webp'), (err) => {
        if (err) {
            console.error('Error creating mobile image:', err);
        } else {
            console.log('✅ Mobile image created successfully');
        }
    });

// Create medium size for tablets
sharp(inputPath)
    .resize({ width: 1600 })
    .webp({ quality: 80 })
    .toFile(path.join(outputDir, 'bg-texture-tablet.webp'), (err) => {
        if (err) {
            console.error('Error creating tablet image:', err);
        } else {
            console.log('✅ Tablet image created successfully');
        }
    });

console.log('Optimizing images... This may take a moment.');