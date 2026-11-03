import { mkdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = fileURLToPath(new URL('../', import.meta.url))
const images = [
	['public/Gratechlogo.png', 'public/Gratechlogo.webp', 256, 84],
	['src/components/images/gratech-company-logo.png', 'src/assets/optimized/gratech-company-logo.webp', 256, 84],
	['src/components/images/header photos/Lenovo 300ek.svg', 'src/assets/optimized/lenovo-300e.webp', 1200, 84],
	['src/components/images/header photos/dell monitor.svg', 'src/assets/optimized/dell-monitor.webp', 1000, 84],
	['src/components/images/header photos/Desktop.png', 'src/assets/optimized/desktop-mockup.webp', 1000, 84],
	['src/components/images/team images/Abubakary.png', 'src/assets/optimized/abubakari-mbasha.webp', 800, 82],
	['src/components/images/team images/Banyenda.png', 'src/assets/optimized/nikanda-banyenda.webp', 800, 82],
	['src/components/images/team images/Gradson.png', 'src/assets/optimized/gradson-ibrahim.webp', 800, 82],
	['src/components/images/team images/Happy.png', 'src/assets/optimized/happy-sanga.webp', 800, 82],
	['src/components/Clients logo/IMS.svg', 'src/assets/optimized/ims-logo.webp', 640, 86],
	['src/components/Clients logo/KBAI.svg', 'src/assets/optimized/kbai-logo.webp', 640, 86],
	['src/components/Clients logo/mzumbe.svg', 'src/assets/optimized/mzumbe-logo.webp', 640, 86],
	['src/components/Clients logo/ROSMINI.svg', 'src/assets/optimized/rosmini-logo.webp', 640, 86],
	['src/components/Clients logo/RUWASA.svg', 'src/assets/optimized/ruwasa-logo.webp', 640, 86],
	['src/components/Clients logo/Uzima primary school.svg', 'src/assets/optimized/uzima-logo.webp', 640, 86],
	['src/assets/originals/client-computer-background.jpg', 'public/client-computer-background.webp', 1600, 80],
	['src/assets/originals/client-desktop-screen.png', 'public/client-desktop-screen.webp', 1200, 84],
]

for (const [source, destination, maxWidth, quality] of images) {
	const sourcePath = path.join(root, source)
	const destinationPath = path.join(root, destination)
	await mkdir(path.dirname(destinationPath), { recursive: true })

	const result = await sharp(sourcePath)
		.rotate()
		.resize({ width: maxWidth, fit: 'inside', withoutEnlargement: true })
		.webp({ quality, effort: 6 })
		.toFile(destinationPath)
	const original = await stat(sourcePath)
	const reduction = (1 - result.size / original.size) * 100

	console.log(
		`${source}: ${Math.round(original.size / 1024)} KB -> ${Math.round(result.size / 1024)} KB `
		+ `(${result.width}x${result.height}, ${reduction.toFixed(1)}% smaller)`,
	)
}
