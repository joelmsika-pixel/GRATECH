<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import OurProduct from './ourproduct.vue'
import AboutUs from './aboutUs.vue'
import OurTeam from './ourteam.vue'
import OurServices from './ourservices.vue'
import OurClients from './ourclients.vue'
import Testimonials from './testmonials.vue'
import ContactUs from './contactUs.vue'
import lenovoShowcaseImage from '../assets/optimized/lenovo-300e.webp'
import dellMonitorImage from '../assets/optimized/dell-monitor.webp'
import desktopMockupImage from '../assets/optimized/desktop-mockup.webp'

const slides = [
	{
		title: 'We make it',
		accent: 'happen.',
		description: 'We bring people, ideas, and technology together to make ambitious work happen.',
	},
	{
		title: 'Make digital work',
		accent: 'better.',
		description: 'Thoughtful digital experiences and dependable systems, designed around the way you work.',
	},
	{
		title: 'Turn possibility',
		accent: 'into progress.',
		description: 'From the first conversation to the final details, we help turn your vision into real-world impact.',
	},
]

const computerModels = [
	{ name: 'All-in-one desktop', kind: 'all-in-one' },
	{ name: 'Graphics design PC', kind: 'graphics-design' },
	{ name: 'Lenovo 300e', kind: 'lenovo-300e', image: lenovoShowcaseImage },
	{ name: 'Dell monitor', kind: 'dell-monitor', image: dellMonitorImage },
]

const activeIndex = ref(0)
const activeComputerIndex = ref(0)
const isPaused = ref(false)
const activeSlide = computed(() => slides[activeIndex.value])
let autoplayTimer
let computerTimer

function showSlide(index) {
	activeIndex.value = (index + slides.length) % slides.length
}

function showComputer(index) {
	activeComputerIndex.value = (index + computerModels.length) % computerModels.length
}

function startAutoplay() {
	if (isPaused.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
	window.clearInterval(autoplayTimer)
	autoplayTimer = window.setInterval(() => showSlide(activeIndex.value + 1), 6500)
	window.clearInterval(computerTimer)
	computerTimer = window.setInterval(() => showComputer(activeComputerIndex.value + 1), 5200)
}

function toggleAutoplay() {
	isPaused.value = !isPaused.value
	if (isPaused.value) {
		window.clearInterval(autoplayTimer)
		window.clearInterval(computerTimer)
	} else {
		startAutoplay()
	}
}

onMounted(startAutoplay)
onUnmounted(() => {
	window.clearInterval(autoplayTimer)
	window.clearInterval(computerTimer)
})
</script>

<template>
	<main class="home-page">
		<section class="hero" aria-label="Welcome to GRATECH">
			<div class="hero-inner">
				<div class="hero-copy">
					<Transition name="copy" mode="out-in">
						<div :key="activeIndex" class="copy-content">
							<h1>{{ activeSlide.title }} <span>{{ activeSlide.accent }}</span></h1>
							<p class="hero-description">{{ activeSlide.description }}</p>
							<div class="hero-actions">
								<RouterLink class="button button-primary" to="/our-services">
									Explore our services
								</RouterLink>
								<RouterLink class="button button-quiet" to="/about-us">
									Discover GRATECH <span aria-hidden="true">→</span>
								</RouterLink>
							</div>
						</div>
					</Transition>

					<div class="carousel-controls" aria-label="Hero carousel controls">
						<div class="slide-count" aria-live="polite">
							<span class="slide-current">0{{ activeIndex + 1 }}</span>
							<span class="slide-divider"></span>
							<span class="slide-total">0{{ slides.length }}</span>
						</div>
						<div class="slide-dots" aria-label="Choose a slide">
							<button
								v-for="(slide, index) in slides"
								:key="slide.title"
								class="slide-dot"
								:class="{ 'is-active': activeIndex === index }"
								type="button"
								:aria-label="`Show slide ${index + 1}: ${slide.title} ${slide.accent}`"
								:aria-current="activeIndex === index ? 'true' : undefined"
								@click="showSlide(index)"
							></button>
						</div>
						<button
							class="autoplay-toggle"
							type="button"
							:aria-label="isPaused ? 'Play carousel' : 'Pause carousel'"
							:aria-pressed="isPaused"
							@click="toggleAutoplay"
						>
							<span v-if="isPaused" aria-hidden="true">▶</span>
							<span v-else aria-hidden="true">Ⅱ</span>
						</button>
					</div>
				</div>

				<div class="hero-visual" role="region" aria-label="3D computer model carousel">
					<div class="visual-orbit orbit-one"></div>
					<div class="visual-orbit orbit-two"></div>
					<div class="visual-glow"></div>
					<div class="device-stage">
						<div
							class="model-carousel"
							:style="{ '--active-model': activeComputerIndex }"
						>
							<div
								class="model-carousel-track"
								:style="{ transform: `rotateY(${activeComputerIndex * -360 / computerModels.length}deg)` }"
							>
								<div
									v-for="(model, index) in computerModels"
									:key="model.kind"
									class="model-slide"
									:class="[
										{ 'is-active': activeComputerIndex === index },
										{ 'model-slide-lenovo': model.kind === 'lenovo-300e' },
										{ 'model-slide-dell': model.kind === 'dell-monitor' },
									]"
									:style="{ transform: `translate(-50%, -50%) rotateY(${index * 360 / computerModels.length}deg) translateZ(330px)` }"
									:aria-hidden="activeComputerIndex !== index"
								>
									<img
										v-if="model.image"
										class="model-product-image"
										:class="{
											'model-product-image-lenovo': model.kind === 'lenovo-300e',
											'model-product-image-dell': model.kind === 'dell-monitor',
										}"
										:src="model.image"
										:alt="model.name"
									/>
									<div v-else class="pc-model" :class="`model-${model.kind}`">
										<div class="pc-display">
											<div class="pc-screen">
												<img
													v-if="model.kind === 'all-in-one'"
													class="desktop-screen-image"
													:src="desktopMockupImage"
													alt=""
												/>
												<div v-else-if="model.kind === 'graphics-design'" class="graphics-design-ui" aria-hidden="true">
													<div class="design-toolbar">
														<span class="illustrator-logo">Ai</span>
														<strong>Illustrator</strong>
														<i></i><i></i><i></i>
													</div>
													<div class="design-workspace">
														<div class="design-tools"><i></i><i></i><i></i><i></i><i></i><i></i></div>
														<div class="design-canvas"><b></b><i></i><span></span></div>
														<div class="design-properties"><i></i><i></i><b></b></div>
													</div>
													<div class="design-palette"><i></i><i></i><i></i><i></i><i></i><i></i></div>
												</div>
												<div v-else class="screen-wallpaper">
													<span></span><i></i><b></b>
												</div>
											</div>
											<div class="pc-bezel"></div>
										</div>
										<div v-if="['all-in-one', 'graphics-design'].includes(model.kind)" class="all-in-one-stand">
											<i></i><b></b>
										</div>
										<div v-if="model.kind === 'laptop'" class="laptop-base">
											<span></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="model-controls" aria-label="Computer model controls">
						<button
							class="model-arrow"
							type="button"
							aria-label="Previous computer model"
							@click="showComputer(activeComputerIndex - 1)"
						>←</button>
						<div class="model-dots">
							<button
								v-for="(model, index) in computerModels"
								:key="model.kind"
								class="model-dot"
								:class="{ 'is-active': activeComputerIndex === index }"
								type="button"
								:aria-label="`Show ${model.name}`"
								:aria-current="activeComputerIndex === index ? 'true' : undefined"
								@click="showComputer(index)"
							></button>
						</div>
						<span class="model-count" aria-live="polite">0{{ activeComputerIndex + 1 }} / 0{{ computerModels.length }}</span>
						<button
							class="model-arrow"
							type="button"
							aria-label="Next computer model"
							@click="showComputer(activeComputerIndex + 1)"
						>→</button>
					</div>
				</div>
			</div>
			<div class="hero-bottom">
				<span>Technology with purpose</span>
				<span class="bottom-line"></span>
				<span>Built around your business</span>
				<span class="bottom-scroll">Scroll to explore <b aria-hidden="true">↓</b></span>
			</div>
		</section>

		<OurProduct />
		<AboutUs />
		<OurTeam />
		<OurServices />
		<OurClients />
		<Testimonials />
		<ContactUs />
	</main>
</template>

<style scoped>


.home-page {
	@apply [--navy:#0d1238] [--ink:#11152f] [--muted:#62677b] [--purple:#696de0] [--paper:#f7f8fc] [font-family:Avenir_Next,_Avenir,_Segoe_UI,_sans-serif];
	@apply [color:var(--ink)];
}

.hero {

	@apply [position:relative] [overflow:hidden] [background:radial-gradient(ellipse_at_77%_45%,_rgb(221_224_255_/_54%),_transparent_38%),_linear-gradient(112deg,_#fff_0%,_#fff_39%,_#f8f9ff_72%,_#f1f2ff_100%)];
}

.hero-inner,
.hero-bottom,
.closing-band {

	@apply [width:min(1240px,_calc(100%_-_64px))] [margin-inline:auto];
}

.hero-inner {

	@apply [display:grid] [grid-template-columns:minmax(360px,_.88fr)_minmax(480px,_1.12fr)] [align-items:center] [min-height:560px] [padding-block:52px_44px];
}

.hero-copy {

	@apply [position:relative] [z-index:2] [padding-block:12px];
}

.copy-content {

	@apply [min-height:335px];
}

.eyebrow {

	@apply [display:flex] [align-items:center] [gap:10px] [margin:0_0_22px] [color:#545b7a] [font-size:11px] [font-weight:700] [letter-spacing:.15em] [text-transform:uppercase];
}

h1 {

	@apply [max-width:610px] [margin:0] [color:var(--navy)] [font-size:clamp(48px,_5.6vw,_76px)] [font-weight:650] [letter-spacing:-.065em] [line-height:1.04];
}

h1 span {

	@apply [display:block] [color:var(--purple)];
}

.hero-description {

	@apply [max-width:420px] [margin:22px_0_0] [color:var(--muted)] [font-size:16px] [line-height:1.8];
}

.hero-actions {

	@apply [display:flex] [flex-wrap:wrap] [align-items:center] [gap:12px_22px] [margin-top:31px];
}

.button {

	@apply [display:inline-flex] [min-height:50px] [align-items:center] [justify-content:center] [gap:18px] [padding:0_19px] [border:1px_solid_transparent] [border-radius:4px] [font-size:12px] [font-weight:700] [text-decoration:none] [transition:background-color_.2s_ease,_color_.2s_ease,_border-color_.2s_ease,_transform_.2s_ease];
}

.button:hover {

	@apply [transform:translateY(-2px)];
}

.button:focus-visible,
.slide-dot:focus-visible,
.autoplay-toggle:focus-visible {

	@apply [outline:3px_solid_#8184f0] [outline-offset:4px];
}

.button-primary {

	@apply [background:var(--navy)] [color:white];
}

.button-primary:hover {

	@apply [background:#252b60];
}

.button-primary span,
.button-quiet span,
.button-light span {

	@apply [font-size:16px];
}

.button-quiet {

	@apply [padding-inline:0] [color:var(--navy)];
}

.button-quiet:hover {

	@apply [color:var(--purple)];
}

.carousel-controls {

	@apply [display:flex] [width:220px] [align-items:center] [gap:17px] [margin-top:43px];
}

.slide-count {

	@apply [display:flex] [align-items:center] [gap:8px] [font-size:10px] [font-weight:700] [letter-spacing:.06em];
}

.slide-current {

	@apply [color:var(--navy)];
}

.slide-total {

	@apply [color:#a1a4b4];
}

.slide-divider {

	@apply [width:20px] [height:1px] [background:#c7c9d4];
}

.slide-dots {

	@apply [display:flex] [align-items:center] [gap:6px];
}

.slide-dot {

	@apply [width:7px] [height:7px] [padding:0] [border:0] [border-radius:8px] [background:#c6c8d7] [cursor:pointer] [transition:width_.25s_ease,_background-color_.25s_ease];
}

.slide-dot.is-active {

	@apply [width:25px] [background:var(--purple)];
}

.autoplay-toggle {

	@apply [display:grid] [width:27px] [height:27px] [place-items:center] [padding:0] [border:1px_solid_#d7d8e3] [border-radius:50%] [background:transparent] [color:var(--navy)] [font-size:10px] [cursor:pointer];
}

.hero-visual {
	position: relative;
	display: grid;
	min-height: 480px;
	place-items: center;
	perspective: 1200px;
}

.visual-glow {
	position: absolute;
	top: 50%;
	left: 50%;
	width: min(78%, 430px);
	aspect-ratio: 1;
	transform: translate(-50%, -50%);
	border-radius: 50%;
	background: radial-gradient(circle, rgb(203 205 255 / 70%) 0%, rgb(219 222 255 / 35%) 42%, transparent 70%);
	filter: blur(4px);
}

.visual-orbit {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 510px;
	height: 270px;
	border: 1px solid rgb(123 129 205 / 15%);
	border-radius: 50%;
	transform: translate(-50%, -50%) rotate(-24deg);
}

.orbit-two {
	width: 590px;
	height: 340px;
	transform: translate(-50%, -50%) rotate(28deg);
	border-color: rgb(123 129 205 / 10%);
}

.device-stage {
	position: relative;
	z-index: 1;
	width: min(100%, 590px);
	height: 390px;
	transform-style: preserve-3d;
	animation: device-float 7s ease-in-out infinite;
}

.model-carousel {
	position: absolute;
	inset: 0;
	perspective: 1100px;
	perspective-origin: 50% 48%;
}

.model-carousel-track {
	position: absolute;
	inset: 0;
	transform-style: preserve-3d;
	transition: transform 1.1s cubic-bezier(.2, .75, .2, 1);
}

.model-slide {
	position: absolute;
	top: 48%;
	left: 50%;
	display: grid;
	width: 390px;
	height: 285px;
	place-items: center;
	transform-style: preserve-3d;
	backface-visibility: hidden;
	opacity: .16;
	filter: blur(1px);
	transition: opacity .55s ease, filter .55s ease;
}

.model-slide.is-active {
	opacity: 1;
	filter: drop-shadow(0 25px 24px rgb(35 39 89 / 20%));
}

.model-slide-lenovo {
	width: 470px;
	height: 350px;
}

.model-slide-dell {
	width: 430px;
	height: 360px;
}

.model-product-image {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.model-product-image-lenovo {
	width: 85%;
	height: 85%;
}

.model-product-image-dell {
	width: 70%;
	height: 70%;
}

.pc-model {
	position: relative;
	width: 380px;
	height: 270px;
	transform: rotateY(-8deg) rotateX(3deg);
	transform-style: preserve-3d;
}

.pc-display {
	position: relative;
	width: 320px;
	height: 205px;
	padding: 9px;
	border: 1px solid #5c6175;
	border-radius: 12px;
	background: linear-gradient(145deg, #51576d, #1c2030 65%, #35394b);
	box-shadow: inset 0 1px 1px rgb(255 255 255 / 48%), 8px 10px 0 -5px #191d2b, 16px 20px 35px rgb(28 31 68 / 22%);
	transform: translateZ(14px);
}

.pc-screen {
	position: absolute;
	inset: 9px;
	overflow: hidden;
	border: 1px solid #b8bbca;
	border-radius: 5px;
	background: #f7f8fd;
	box-shadow: inset 0 0 0 1px rgb(20 24 54 / 12%);
}

.desktop-screen-image {
	position: absolute;
	inset: 0;
	display: block;
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: inherit;
}

.pc-screen::after {
	position: absolute;
	inset: 0;
	background: linear-gradient(132deg, rgb(255 255 255 / 21%), transparent 43%, rgb(19 22 55 / 12%));
	content: '';
}

.screen-wallpaper {
	position: absolute;
	inset: 0;
	overflow: hidden;
	background:
		radial-gradient(ellipse at 68% 35%, rgb(255 255 255 / 78%), transparent 18%),
		radial-gradient(ellipse at 63% 73%, #f6b5ac 0, #b9a8e9 28%, transparent 58%),
		linear-gradient(135deg, #a8c9f0, #e7c1df 58%, #f5d3c1);
}

.screen-wallpaper span,
.screen-wallpaper i,
.screen-wallpaper b {
	position: absolute;
	display: block;
	border-radius: 50%;
	transform: rotate(-28deg);
}

.screen-wallpaper span {
	top: 37%;
	left: 26%;
	width: 70%;
	height: 48%;
	border: 1px solid rgb(255 255 255 / 50%);
	background: linear-gradient(130deg, rgb(255 255 255 / 48%), rgb(121 130 212 / 20%));
	box-shadow: 0 14px 24px rgb(55 48 107 / 18%);
}

.screen-wallpaper i {
	top: 48%;
	left: 43%;
	width: 57%;
	height: 37%;
	background: linear-gradient(130deg, rgb(255 255 255 / 62%), rgb(202 177 236 / 24%));
}

.screen-wallpaper b {
	top: 19%;
	left: 14%;
	width: 36%;
	height: 27%;
	background: rgb(255 255 255 / 25%);
	filter: blur(8px);
}

.pc-bezel {
	position: absolute;
	z-index: 2;
	inset: 0;
	border: 1px solid rgb(255 255 255 / 14%);
	border-radius: inherit;
	pointer-events: none;
}

.all-in-one-stand {
	position: relative;
	display: grid;
	justify-items: center;
	margin-top: -1px;
	transform: translateZ(5px);
}

.all-in-one-stand i {
	width: 44px;
	height: 37px;
	background: linear-gradient(90deg, #979bad, #e0e2e9 42%, #777d91);
	clip-path: polygon(27% 0, 73% 0, 90% 100%, 10% 100%);
}

.all-in-one-stand b {
	width: 132px;
	height: 12px;
	margin-top: -2px;
	border-radius: 60% 60% 25% 25%;
	background: linear-gradient(#eceef3, #9298ab);
	box-shadow: 0 5px 9px rgb(26 29 65 / 16%);
}

.model-laptop .pc-display {
	width: 285px;
	height: 184px;
	padding: 9px;
	border-radius: 11px 11px 4px 4px;
	transform: translateY(-17px) translateZ(12px) rotateX(-2deg);
}

.model-laptop .pc-screen {
	inset: 8px 8px 9px;
}

.model-laptop .laptop-base {
	position: absolute;
	z-index: 2;
	top: 168px;
	left: 50%;
	width: 326px;
	height: 19px;
	border: 1px solid #8f95a7;
	border-radius: 2px 2px 12px 12px;
	background: linear-gradient(180deg, #d9dce5, #8f95a7 75%, #74798a);
	box-shadow: 0 13px 17px rgb(25 28 66 / 24%);
	transform: translateX(-50%) rotateX(58deg) translateZ(18px);
	transform-origin: top center;
}

.laptop-base span {
	position: absolute;
	top: 2px;
	left: 50%;
	width: 46px;
	height: 3px;
	border-radius: 0 0 5px 5px;
	background: #8c91a3;
	transform: translateX(-50%);
}

.graphics-design-ui {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding: 7px;
	background: #dce1eb;
}

.design-toolbar {
	display: flex;
	height: 42px;
	flex: 0 0 42px;
	align-items: center;
	gap: 10px;
	padding: 0 10px;
	border-radius: 2px;
	background: #24283a;
}

.illustrator-logo {
	display: grid;
	width: 36px;
	height: 36px;
	flex: 0 0 36px;
	place-items: center;
	border: 1px solid #ff9a54;
	border-radius: 4px;
	background: #33200f;
	color: #ffad68;
	font-size: 20px;
	font-weight: 700;
	line-height: 1;
}

.design-toolbar strong {
	width: auto;
	height: auto;
	margin-right: 10px;
	color: #e8eaf3;
	font-size: 13px;
	font-weight: 600;
	line-height: 1;
	white-space: nowrap;
}

.design-toolbar i {
	width: 18px;
	height: 4px;
	border-radius: 3px;
	background: #e8eaf3;
}

.design-toolbar i:nth-of-type(n + 2) {
	width: 14px;
	height: 4px;
	border-radius: 3px;
	background: #878da5;
}

.design-workspace {
	display: flex;
	min-height: 0;
	flex: 1;
	gap: 4px;
}

.design-tools {
	display: flex;
	width: 17px;
	flex: 0 0 17px;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	padding: 6px 0;
	border-radius: 2px;
	background: #2b3043;
}

.design-tools i {
	width: 6px;
	height: 6px;
	border: 1px solid #c3c8d8;
	border-radius: 2px;
}

.design-tools i:nth-child(2n) {
	border-radius: 50%;
}

.design-canvas {
	position: relative;
	display: grid;
	min-width: 0;
	flex: 1;
	place-items: center;
	overflow: hidden;
	background:
		linear-gradient(90deg, rgb(35 41 67 / 5%) 1px, transparent 1px),
		linear-gradient(rgb(35 41 67 / 5%) 1px, transparent 1px),
		#f8f7f4;
	background-size: 12px 12px;
}

.design-canvas b {
	position: absolute;
	top: 14%;
	left: 18%;
	width: 64%;
	height: 70%;
	border-radius: 48% 52% 61% 39% / 42% 36% 64% 58%;
	background:
		radial-gradient(ellipse at 34% 32%, rgb(255 255 255 / 85%), transparent 23%),
		linear-gradient(142deg, #ff8f73 4%, #ed5e85 39%, #7359dc 76%);
	transform: rotate(-14deg);
}

.design-canvas i {
	position: absolute;
	right: 14%;
	bottom: 13%;
	width: 35%;
	height: 44%;
	border-radius: 50% 50% 12% 12%;
	background: linear-gradient(150deg, #ffcf69, #ff7d62 60%, #d74f83);
	transform: rotate(22deg);
}

.design-canvas span {
	position: absolute;
	top: 21%;
	right: 19%;
	width: 22%;
	aspect-ratio: 1;
	border: 5px solid #252b49;
	border-radius: 50%;
	background: #73d6cf;
	box-shadow: 0 0 0 4px #f8f7f4;
}

.design-properties {
	display: flex;
	width: 36px;
	flex: 0 0 36px;
	flex-direction: column;
	gap: 6px;
	padding: 7px 5px;
	border-radius: 2px;
	background: #f9f9fc;
}

.design-properties i {
	width: 100%;
	height: 4px;
	border-radius: 3px;
	background: #ccd0dc;
}

.design-properties i:nth-child(2) {
	width: 72%;
}

.design-properties b {
	width: 14px;
	aspect-ratio: 1;
	margin-top: 1px;
	border-radius: 3px;
	background: linear-gradient(135deg, #ff8f73, #7359dc);
}

.design-palette {
	display: flex;
	height: 9px;
	flex: 0 0 9px;
	align-items: center;
	gap: 4px;
	padding: 0 5px;
	border-radius: 2px;
	background: #f8f9fc;
}

.design-palette i {
	width: 7px;
	aspect-ratio: 1;
	border-radius: 50%;
	background: #ff866f;
}

.design-palette i:nth-child(2) { background: #f4c65e; }
.design-palette i:nth-child(3) { background: #70cfc4; }
.design-palette i:nth-child(4) { background: #6b83df; }
.design-palette i:nth-child(5) { background: #a36bd2; }
.design-palette i:nth-child(6) { background: #30364e; }

.model-controls {

	@apply [position:absolute] [z-index:3] [right:0] [bottom:6px] [left:0] [display:flex] [align-items:center] [justify-content:center] [gap:17px];
}

.model-arrow {

	@apply [display:grid] [width:31px] [height:31px] [place-items:center] [padding:0] [border:1px_solid_rgb(13_18_56_/_17%)] [border-radius:50%] [background:rgb(255_255_255_/_74%)] [color:var(--navy)] [font-size:15px] [cursor:pointer] [transition:color_.2s_ease,_background-color_.2s_ease,_border-color_.2s_ease];
}

.model-arrow:hover {

	@apply [border-color:var(--navy)] [background:var(--navy)] [color:white];
}

.model-arrow:focus-visible,
.model-dot:focus-visible {

	@apply [outline:3px_solid_#8184f0] [outline-offset:3px];
}

.model-dots {

	@apply [display:flex] [align-items:center] [gap:7px];
}

.model-dot {

	@apply [width:7px] [height:7px] [padding:0] [border:0] [border-radius:8px] [background:#b8bbcc] [cursor:pointer] [transition:width_.25s_ease,_background-color_.25s_ease];
}

.model-dot.is-active {

	@apply [width:23px] [background:var(--purple)];
}

.model-count {

	@apply [color:#777c90] [font-size:9px] [font-weight:700] [letter-spacing:.08em];
}

.hero-bottom {

	@apply [display:flex] [min-height:54px] [align-items:center] [gap:15px] [border-top:1px_solid_rgb(13_18_56_/_9%)] [color:#777c90] [font-size:9px] [font-weight:600] [letter-spacing:.1em] [text-transform:uppercase];
}

.bottom-line {

	@apply [width:30px] [height:1px] [background:#c4c6d4];
}

.bottom-scroll {

	@apply [display:flex] [align-items:center] [gap:9px] [margin-left:auto] [letter-spacing:.05em];
}

.bottom-scroll b {

	@apply [color:var(--navy)] [font-size:14px];
}

.section-kicker {

	@apply [display:flex] [align-items:center] [gap:12px] [color:#74798c] [font-size:10px] [font-weight:700] [letter-spacing:.13em] [text-transform:uppercase];
}

.section-kicker span {

	@apply [color:#777be4];
}

.closing-band h2 {

	@apply [max-width:700px] [margin:0] [color:var(--navy)] [font-size:clamp(34px,_4vw,_52px)] [font-weight:600] [letter-spacing:-.055em] [line-height:1.13];
}

.closing-band {

	@apply [display:flex] [align-items:center] [justify-content:space-between] [gap:30px] [margin-bottom:60px] [padding:42px_48px] [border-radius:6px] [background:radial-gradient(ellipse_at_83%_15%,_rgb(108_112_218_/_34%),_transparent_34%),_linear-gradient(115deg,_#101633,_#171e4a)] [color:white];
}

.closing-band .eyebrow {

	@apply [margin-bottom:12px] [color:#c2c5de];
}

.closing-band h2 {

	@apply [max-width:620px] [color:white] [font-size:clamp(27px,_3vw,_38px)];
}

.button-light {

	@apply [flex:none] [background:white] [color:var(--navy)];
}

.button-light:hover {

	@apply [background:#e9eaff];
}

.copy-enter-active,
.copy-leave-active {

	@apply [transition:opacity_.22s_ease,_transform_.22s_ease];
}

.copy-enter-from {

	@apply [transform:translateY(10px)] [opacity:0];
}

.copy-leave-to {

	@apply [transform:translateY(-8px)] [opacity:0];
}

@keyframes device-float {
	0%,
100% { translate: 0 0; }
	50% { translate: 0 -8px; }
}

@media (max-width: 980px) {
	.hero-inner,
.hero-bottom,
.closing-band {

		@apply [width:min(100%_-_48px,_760px)];
	}

	.hero-inner {

		@apply [grid-template-columns:1fr_1fr] [min-height:500px] [padding-block:40px];
	}

	.hero-visual {
		min-height: 390px;
	}

	.device-stage {
		transform: scale(.88);
		transform-origin: center;
	}

	.visual-orbit {
		width: 400px;
		height: 230px;
	}

	.orbit-two {
		width: 440px;
		height: 280px;
	}
}

@media (max-width: 700px) {
	.hero-inner,
.hero-bottom,
.closing-band {

		@apply [width:calc(100%_-_40px)];
	}

	.hero-inner {

		@apply [grid-template-columns:1fr] [padding-block:40px_16px];
	}

	.copy-content {

		@apply [min-height:250px];
	}

	.eyebrow {

		@apply [margin-bottom:18px] [font-size:9px];
	}

	h1 {

		@apply [max-width:540px] [font-size:clamp(45px,_10vw,_68px)];
	}

	.hero-description {

		@apply [max-width:460px] [margin-top:17px] [font-size:14px];
	}

	.hero-actions {

		@apply [margin-top:23px];
	}

	.carousel-controls {

		@apply [margin-top:27px];
	}

	.hero-visual {
		min-height: 330px;
		margin: 10px -12px 0;
	}

	.device-stage {
		width: min(590px, 100vw);
		height: 320px;
		transform: scale(.78);
		transform-origin: center;
	}

	.model-slide-lenovo {
		width: 390px;
		height: 290px;
	}

	.model-slide-dell {
		width: 330px;
		height: 275px;
	}

	.visual-orbit {
		width: 350px;
		height: 190px;
	}

	.orbit-two {
		width: 390px;
		height: 240px;
	}

	.hero-bottom {

		@apply [min-height:47px] [gap:9px] [font-size:7px] [letter-spacing:.06em];
	}

	.bottom-line {

		@apply [width:17px];
	}

	.bottom-scroll {

		@apply [gap:4px];
	}

	.closing-band {

		@apply [align-items:flex-start] [flex-direction:column] [margin-bottom:30px] [padding:30px_25px];
	}
}

@media (max-width: 400px) {
	.hero-inner,
.hero-bottom,
.closing-band {

		@apply [width:calc(100%_-_32px)];
	}

	.hero-inner {

		@apply [padding-top:42px];
	}

	.copy-content {

		@apply [min-height:310px];
	}

	.hero-actions {

		@apply [align-items:flex-start] [flex-direction:column] [gap:5px];
	}

	.button-quiet {

		@apply [min-height:42px];
	}

	.hero-visual {
		min-height: 270px;
		margin-top: 0;
	}

	.device-stage {
		transform: scale(.65);
		transform-origin: center;
	}

	.model-slide-lenovo {
		width: 370px;
		height: 275px;
	}

	.model-slide-dell {
		width: 300px;
		height: 250px;
	}

	.model-slide-dell.is-active {
		width: 300px;
		height: 250px;
	}

	.hero-bottom {

		@apply [flex-wrap:wrap] [font-size:6px];
	}
}

@media (prefers-reduced-motion: reduce) {
	*,
*::before,
*::after {
		@apply [scroll-behavior:auto] ![animation-duration:0.01ms] ![animation-iteration-count:1] ![transition-duration:0.01ms];
	}
}


</style>
