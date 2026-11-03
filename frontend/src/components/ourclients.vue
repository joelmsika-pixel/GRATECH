<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imsLogo from '../assets/optimized/ims-logo.webp'
import kbaiLogo from '../assets/optimized/kbai-logo.webp'
import mzumbeLogo from '../assets/optimized/mzumbe-logo.webp'
import rosminiLogo from '../assets/optimized/rosmini-logo.webp'
import ruwasaLogo from '../assets/optimized/ruwasa-logo.webp'
import uzimaLogo from '../assets/optimized/uzima-logo.webp'

gsap.registerPlugin(ScrollTrigger)

const clientsSection = ref(null)
const parallaxGap = ref(null)
let motionQuery
let removeClientsParallax
let parallaxFrame = 0

const clients = [
	{
		name: 'Rural Water Supply and Sanitation Agency',
		shortName: 'RUWASA',
		logo: ruwasaLogo,
		type: 'Government',
		initials: 'RW',
	},
	{
		name: 'Kibaha Berea Adventist Institute',
		logo: kbaiLogo,
		logoScale: 1.25,
		type: 'Private',
		initials: 'KB',
	},
	{
		name: 'IMS SDA Reform Church',
		logo: imsLogo,
		type: 'Non-Profit Organization',
		initials: 'IMS',
	},
	{
		name: 'Rosmini Boys Secondary School',
		logo: rosminiLogo,
		type: 'Private',
		initials: 'RB',
	},
	{
		name: 'Uzima Schools',
		logo: uzimaLogo,
		type: 'Private',
		initials: 'US',
	},
	{
		name: 'Mzumbe University Students’ Organization',
		logo: mzumbeLogo,
		type: 'Government',
		initials: 'MU',
	},
]

onMounted(() => {
	const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

	const updateDesktopScreenPosition = () => {
		const container = parallaxGap.value
		const backgroundImage = container?.querySelector('.clients-background-image')
		const screenImage = container?.querySelector('.clients-desktop-screen')
		if (!container || !backgroundImage?.naturalWidth || !screenImage) return

		const scale = Math.max(
			container.clientWidth / backgroundImage.naturalWidth,
			container.clientHeight / backgroundImage.naturalHeight,
		)
		const imageWidth = backgroundImage.naturalWidth * scale
		const imageHeight = backgroundImage.naturalHeight * scale
		const offsetX = (container.clientWidth - imageWidth) * 0.58
		const offsetY = (container.clientHeight - imageHeight) * 0.5

		screenImage.style.left = `${831 * scale + offsetX}px`
		screenImage.style.top = `${118 * scale + offsetY}px`
		screenImage.style.width = `${679 * scale}px`
		screenImage.style.height = `${526 * scale}px`
	}

	const updateClientsParallax = () => {
		parallaxFrame = 0
		const hero = clientsSection.value?.querySelector('.clients-hero')
		const list = clientsSection.value?.querySelector('.clients-list')
		if (!hero || !list) return
		if (reducedMotionQuery.matches) {
			hero.style.transform = ''
			list.style.marginTop = ''
			list.style.paddingTop = ''
			if (parallaxGap.value) parallaxGap.value.style.height = `${hero.offsetHeight}px`
			updateDesktopScreenPosition()
			return
		}

		let heroTop = 0
		for (let element = hero; element; element = element.offsetParent) {
			heroTop += element.offsetTop
		}
		const heroBottom = heroTop + hero.offsetHeight
		const headerHeight = document.querySelector('header')?.offsetHeight ?? 0
		const end = heroBottom - headerHeight
		const anticipation = Math.min(140, hero.offsetHeight * 0.4)
		const start = Math.max(0, heroTop - headerHeight - anticipation)
		const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)))
		const initialListPadding = window.matchMedia('(max-width: 700px)').matches ? 52 : 72

		const heroShift = hero.offsetHeight * 0.35 * progress
		hero.style.transform = `translate3d(0, ${heroShift}px, 0)`
		list.style.marginTop = `${-hero.offsetHeight * progress}px`
		list.style.paddingTop = `${initialListPadding * (1 - progress)}px`
		if (parallaxGap.value) parallaxGap.value.style.height = `${hero.offsetHeight + heroShift}px`
		updateDesktopScreenPosition()
	}

	const scheduleClientsParallax = () => {
		if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateClientsParallax)
	}

	window.addEventListener('scroll', scheduleClientsParallax, { passive: true })
	window.addEventListener('resize', scheduleClientsParallax)
	reducedMotionQuery.addEventListener('change', scheduleClientsParallax)
	removeClientsParallax = () => {
		window.removeEventListener('scroll', scheduleClientsParallax)
		window.removeEventListener('resize', scheduleClientsParallax)
		reducedMotionQuery.removeEventListener('change', scheduleClientsParallax)
		if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame)
		const list = clientsSection.value?.querySelector('.clients-list')
		if (list) {
			list.style.marginTop = ''
			list.style.paddingTop = ''
		}
		if (parallaxGap.value) parallaxGap.value.style.height = ''
		clientsSection.value?.querySelector('.clients-hero')?.style.removeProperty('transform')
	}
	updateClientsParallax()

	motionQuery = gsap.matchMedia()
	motionQuery.add('(prefers-reduced-motion: no-preference)', () => {
		const context = gsap.context(() => {
			gsap.from('.clients-hero-copy > *', {
				y: 28,
				autoAlpha: 0,
				immediateRender: false,
				duration: 0.75,
				stagger: 0.12,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.clients-hero',
					start: 'top 82%',
					toggleActions: 'play none none reverse',
				},
			})

			gsap.from('.clients-list-heading', {
				y: 28,
				autoAlpha: 0,
				immediateRender: false,
				duration: 0.7,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.clients-list',
					start: 'top 84%',
					toggleActions: 'play none none reverse',
				},
			})

			gsap.from('.client-card', {
				y: 30,
				autoAlpha: 0,
				immediateRender: false,
				duration: 0.65,
				stagger: 0.1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.client-grid',
					start: 'top 88%',
					toggleActions: 'play none none reverse',
				},
			})
		}, clientsSection.value)

		return () => context.revert()
	})
})

onUnmounted(() => {
	motionQuery?.revert()
	removeClientsParallax?.()
})
</script>

<template>
	<main ref="clientsSection" class="relative z-[1] isolate bg-[#f7f8fc] font-[Avenir_Next,Avenir,Segoe_UI,sans-serif] text-[#11152f]">
		<div
			ref="parallaxGap"
			class="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
			aria-hidden="true"
		>
			<img
				src="/client-computer-background.webp"
				alt=""
				class="clients-background-image absolute inset-0 h-full w-full object-cover object-[58%_center] opacity-75 blur-[4px]"
				width="1600"
				height="1068"
				loading="lazy"
				decoding="async"
				@load="scheduleClientsParallax"
			/>
			<img
				src="/client-desktop-screen.webp"
				alt=""
				class="clients-desktop-screen absolute max-w-none object-fill opacity-90 [clip-path:polygon(5%_0,100%_16%,90%_100%,0_80%)]"
				width="650"
				height="360"
				loading="lazy"
				decoding="async"
				@load="scheduleClientsParallax"
			/>
			<div class="absolute inset-0 bg-gradient-to-r from-[#dce5ff]/95 via-[#6f86e8]/80 to-[#24387f]/70"></div>
		</div>
		<section class="clients-hero relative z-0 isolate overflow-hidden bg-transparent" aria-labelledby="clients-title">
			<div class="absolute -right-24 -top-48 -z-10 h-[570px] w-[570px] rounded-full border border-[#777be4]/15 max-[600px]:-right-44 max-[600px]:-top-28 max-[600px]:h-[420px] max-[600px]:w-[420px]"></div>
			<div class="absolute -right-5 -top-28 -z-10 h-[410px] w-[410px] rounded-full border border-[#777be4]/10 max-[600px]:-right-28 max-[600px]:-top-5 max-[600px]:h-[310px] max-[600px]:w-[310px]"></div>
			<div class="relative z-[1] mx-auto flex min-h-[320px] w-[calc(100%_-_64px)] max-w-[1240px] items-center py-[56px] max-[700px]:min-h-0 max-[700px]:w-[calc(100%_-_40px)] max-[700px]:py-[44px] max-[400px]:w-[calc(100%_-_32px)]">
				<div class="clients-hero-copy relative z-[1] max-w-[790px]">
					<h1 id="clients-title" class="m-0 max-w-[680px] text-[clamp(32px,4vw,48px)] font-semibold leading-[1.02] tracking-[-.065em] text-[#0d1238]">
						Our clients are our <span class="text-[#7075df]">partners.</span>
					</h1>
					<p class="mt-5 max-w-[570px] text-sm font-medium leading-[1.85] text-[#17234e]">
						We’re proud to work with organizations across Tanzania, supporting their goals with thoughtful technology and dependable service.
					</p>
				</div>

			</div>
		</section>

		<section class="clients-list relative z-[5] bg-[#f7f8fc] pt-[72px] pb-[48px] max-[700px]:pt-[52px] max-[700px]:pb-[36px]" aria-labelledby="clients-heading">
			<div class="mx-auto w-[calc(100%_-_64px)] max-w-[1240px] max-[700px]:w-[calc(100%_-_40px)] max-[400px]:w-[calc(100%_-_32px)]">
				<div class="clients-list-heading mb-10 flex items-end justify-between gap-8 max-[700px]:mb-7 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3">
					<div>
						<p class="mb-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#73788e]">Our network <span class="ml-1 text-[#9296a7]">— 06 organizations</span></p>
						<h2 id="clients-heading" class="m-0 text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] tracking-[-.06em] text-[#0d1238]">
							Organizations we’re <span class="text-[#7075df]">proud to serve.</span>
						</h2>
					</div>
				</div>

				<div class="client-grid grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
					<article
						v-for="(client, index) in clients"
						:key="client.name"
						class="client-card group relative flex min-h-[278px] flex-col items-center overflow-hidden rounded-2xl border border-[#e5e7f2] bg-[linear-gradient(145deg,#ffffff_58%,#f8f8ff)] px-6 py-6 text-center shadow-[0_5px_18px_rgb(20_25_69_/_5%)] transition duration-300 hover:-translate-y-1 hover:border-[#c9cbef] hover:shadow-[0_12px_28px_rgb(20_25_69_/_9%)] focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#8184f0] max-[560px]:min-h-[260px]"
					>
						<span aria-hidden="true" class="pointer-events-none absolute -right-9 -top-10 h-28 w-28 rounded-full border border-[#777be4]/10 transition-transform duration-500 group-hover:scale-110"></span>
						<span aria-hidden="true" class="pointer-events-none absolute -right-4 -top-5 h-20 w-20 rounded-full bg-[#ededff]/70 blur-xl"></span>
						<span aria-hidden="true" class="pointer-events-none absolute bottom-5 right-5 h-8 w-8 opacity-35 [background-image:radial-gradient(#8589df_1px,transparent_1px)] [background-size:7px_7px]"></span>
						<div class="relative z-[1] mb-4 flex w-full items-center justify-between gap-3">
							<span class="text-[10px] font-bold uppercase tracking-[.14em] text-[#a0a4b6]">Client 0{{ index + 1 }}</span>
							<span class="rounded-full bg-[#f3f4fb] px-3 py-1.5 text-[10px] font-semibold tracking-[.03em] text-[#656b82]">
								{{ client.type }}
							</span>
						</div>
						<div class="relative z-[1] mb-5 grid h-[104px] w-full place-items-center">
							<span class="absolute h-20 w-40 rounded-full bg-[#f0f1ff] opacity-70 blur-2xl transition duration-300 group-hover:opacity-100"></span>
							<span v-if="client.logo" aria-hidden="true" class="absolute bottom-[13px] h-4 w-40 translate-y-1 rounded-[50%] bg-[#171c3f]/35 blur-[20px] transition-opacity duration-300 group-hover:opacity-75"></span>
							<img v-if="client.logo" class="relative z-[1] block max-h-[82px] max-w-[210px] object-contain" :style="client.logoScale ? { transform: `scale(${client.logoScale})` } : undefined" :src="client.logo" :alt="`${client.shortName || client.name} logo`" loading="lazy" decoding="async" />
							<span v-else class="relative z-[1] grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#777be4] to-[#555bc4] text-base font-bold tracking-[-.04em] text-white shadow-[0_8px_18px_rgb(85_91_196_/_20%)]">
									{{ client.initials }}
								</span>
						</div>
						<h3 class="relative z-[1] m-0 max-w-[310px] text-lg font-semibold leading-snug tracking-[-.035em] text-[#0d1238]">
							{{ client.name }}
						</h3>
						<p v-if="client.shortName" class="relative z-[1] mb-0 mt-1 text-[11px] font-medium text-[#74798c]">{{ client.shortName }}</p>
						<span class="absolute bottom-0 left-0 z-[1] h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-[#7378e2] via-[#d4d6fa] to-transparent transition-transform duration-300 group-hover:scale-x-100"></span>
					</article>
				</div>

			</div>
		</section>
	</main>
</template>
