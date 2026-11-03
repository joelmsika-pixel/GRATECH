<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import lenovoShowcaseImage from '../assets/optimized/lenovo-300e.webp'
import dellMonitorImage from '../assets/optimized/dell-monitor.webp'
import desktopMockupImage from '../assets/optimized/desktop-mockup.webp'

gsap.registerPlugin(ScrollTrigger)

const section = ref(null)
let motionQuery

onMounted(() => {
	motionQuery = gsap.matchMedia()
	motionQuery.add('(prefers-reduced-motion: no-preference)', () => {
		const heroComputer = document.querySelector('.hero .device-stage')
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: section.value,
				start: 'top 88%',
				end: 'top 28%',
				scrub: 1,
				invalidateOnRefresh: true,
			},
		})

		timeline.fromTo(
			section.value.querySelectorAll('.product-device'),
			{ y: -210, rotateX: -16, scale: 0.86, autoAlpha: 0 },
			{ y: 0, rotateX: 0, scale: 1, autoAlpha: 1, stagger: 0.1, ease: 'none' },
			0,
		)

		if (heroComputer) {
			timeline.to(heroComputer, { y: 230, scale: 0.74, autoAlpha: 0, ease: 'none' }, 0)
		}

		return () => timeline.scrollTrigger?.kill()
	})
})

onUnmounted(() => motionQuery?.revert())
</script>

<template>
	<section ref="section" class="products-section" aria-labelledby="products-heading">
		<div class="products-inner">
			<div class="products-heading">
				<p class="products-kicker">Explore what we make</p>
				<h2 id="products-heading">Our <span class="text-[#7075df]">Products</span></h2>
			</div>
			<div class="product-grid" aria-label="Product cards">
				<div v-for="model in ['desktop', 'laptop', 'monitor']" :key="model" class="product-card" :class="{ 'product-card-laptop': model === 'laptop', 'product-card-monitor': model === 'monitor' }" :aria-label="`${model} computer`">
					<div class="product-device" :class="`device-${model}`">
						<img v-if="model === 'laptop'" class="product-laptop-image" :src="lenovoShowcaseImage" alt="Lenovo 300e laptop shown from multiple angles" width="1200" height="799" loading="lazy" decoding="async" />
						<img v-else-if="model === 'monitor'" class="product-monitor-image" :src="dellMonitorImage" alt="Dell monitor with stand" width="1000" height="833" loading="lazy" decoding="async" />
						<template v-else>
							<div class="device-screen">
								<img class="desktop-screen-image" :src="desktopMockupImage" alt="" width="1000" height="497" loading="lazy" decoding="async" />
							</div>
							<div v-if="model === 'desktop'" class="desktop-stand"><i></i><b></b></div>
						</template>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>

.products-section {

	@apply [padding:68px_0_72px] [background:#f7f8fc] [font-family:Avenir_Next,_Avenir,_Segoe_UI,_sans-serif];
}

.products-inner {

	@apply [width:min(1240px,_calc(100%_-_64px))] [margin-inline:auto];
}

.products-heading {

	@apply [margin-bottom:30px];
}

.products-kicker {

	@apply [margin:0_0_11px] [color:#73788e] [font-size:10px] [font-weight:700] [letter-spacing:.14em] [text-transform:uppercase];
}

h2 {

	@apply [margin:0] [color:#0d1238] [font-size:clamp(32px,_4vw,_48px)] [font-weight:650] [letter-spacing:-.055em] [line-height:1.1];
}

.product-grid {

	@apply [display:grid] [grid-template-columns:repeat(3,_minmax(0,_1fr))] [gap:18px];
}

.product-card {

	@apply [display:grid] [min-height:310px] [place-items:center] [overflow:hidden] [padding:20px] [border:1px_solid_#e7e8f0] [border-radius:6px] [background:radial-gradient(ellipse_at_50%_80%,_rgb(218_220_251_/_52%),_transparent_52%),_linear-gradient(145deg,_#fff,_#fbfbfe)] [box-shadow:0_10px_28px_rgb(20_25_69_/_3%)] [transition:transform_.25s_ease,_box-shadow_.25s_ease,_border-color_.25s_ease] [transform-style:preserve-3d];
}

.product-card:hover {

	@apply [transform:translateY(-4px)] [border-color:#d5d7ef] [box-shadow:0_16px_34px_rgb(20_25_69_/_7%)];
}

.product-device {
	position: relative;
	width: 230px;
	height: 165px;
	transform: none;
	transform-style: preserve-3d;
	filter: drop-shadow(0 16px 14px rgb(25 30 80 / 18%));
}

.product-laptop-image {
	display: block;
	width: min(100%, 350px);
	max-width: 100%;
	height: auto;
	object-fit: contain;
}

.device-laptop {
	width: min(100%, 350px);
	height: auto;
	transform: none;
	filter: drop-shadow(0 12px 12px rgb(25 30 80 / 16%));
}

.device-monitor {
	width: min(100%, 260px);
	height: auto;
	transform: none;
	filter: drop-shadow(0 12px 12px rgb(25 30 80 / 16%));
}

.product-monitor-image {
	display: block;
	width: 100%;
	height: auto;
	object-fit: contain;
}

.device-screen {
	position: absolute;
	top: 0;
	left: 50%;
	width: 230px;
	height: 150px;
	padding: 7px;
	border: 1px solid #555b70;
	border-radius: 9px;
	background: linear-gradient(145deg, #4d5368, #191d2a 68%, #33384a);
	box-shadow: inset 0 1px 1px rgb(255 255 255 / 38%), 5px 7px 0 -3px #171b29;
	transform: translateX(-50%) translateZ(12px);
}

.desktop-screen-image {
	position: absolute;
	inset: 0;
	display: block;
	width: 100%;
	height: 100%;
	border-radius: inherit;
	object-fit: contain;
}

.device-wallpaper {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border: 1px solid #c3c6d4;
	border-radius: 3px;
	background:
		radial-gradient(ellipse at 65% 40%, rgb(255 255 255 / 75%), transparent 17%),
		radial-gradient(ellipse at 62% 82%, #f0b7c5, #b4a6e8 36%, transparent 62%),
		linear-gradient(145deg, #a8c9f0, #e9c4df 60%, #f4d2c3);
}

.device-wallpaper i,
.device-wallpaper b {
	position: absolute;
	display: block;
	border-radius: 50%;
	transform: rotate(-25deg);
}

.device-wallpaper i {
	top: 43%;
	left: 29%;
	width: 72%;
	height: 48%;
	border: 1px solid rgb(255 255 255 / 50%);
	background: linear-gradient(135deg, rgb(255 255 255 / 40%), rgb(126 130 214 / 20%));
}

.device-wallpaper b {
	top: 16%;
	left: 12%;
	width: 35%;
	height: 28%;
	background: rgb(255 255 255 / 25%);
	filter: blur(7px);
}

.desktop-stand {
	position: absolute;
	top: 150px;
	left: 50%;
	display: grid;
	justify-items: center;
	transform: translateX(-50%) translateZ(2px);
}

.desktop-stand i {
	width: 42px;
	height: 31px;
	background: linear-gradient(90deg, #969bad, #e2e4ec 45%, #858b9e);
	clip-path: polygon(28% 0, 72% 0, 90% 100%, 10% 100%);
}

.desktop-stand b {
	width: 122px;
	height: 10px;
	margin-top: -1px;
	border-radius: 60% 60% 25% 25%;
	background: linear-gradient(#e5e7ef, #959bad);
}

.device-laptop .device-screen {
	top: 0;
	width: 170px;
	height: 116px;
}

.laptop-base {
	position: absolute;
	z-index: 2;
	top: 109px;
	left: 50%;
	width: 206px;
	height: 18px;
	border: 1px solid #9298aa;
	border-radius: 2px 2px 11px 11px;
	background: linear-gradient(#e0e2e9, #9298aa 78%, #777d8f);
	transform: translateX(-50%) rotateX(56deg) translateZ(20px);
	transform-origin: top center;
}

.laptop-base i {
	position: absolute;
	top: 2px;
	left: 50%;
	width: 35px;
	height: 3px;
	border-radius: 0 0 5px 5px;
	background: #8b91a2;
	transform: translateX(-50%);
}

.device-gaming .device-screen {
	left: 36%;
	width: 158px;
	height: 110px;
}

.device-gaming .device-wallpaper {
	background:
		radial-gradient(ellipse at 66% 62%, rgb(51 237 215 / 70%), transparent 5%),
		radial-gradient(ellipse at 65% 60%, #433aba, #171c45 34%, transparent 62%),
		linear-gradient(145deg, #0d1733, #342c70 62%, #11172a);
}

.gaming-tower {
	position: absolute;
	top: 15px;
	right: 4px;
	display: flex;
	width: 48px;
	height: 132px;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	border: 1px solid #41475b;
	border-radius: 6px;
	background: linear-gradient(100deg, #3b4054, #151927 55%, #292e40);
	box-shadow: inset 1px 0 1px rgb(255 255 255 / 17%), 5px 8px 12px rgb(24 28 62 / 20%);
	transform: translateZ(28px);
}

.gaming-tower i {
	width: 24px;
	aspect-ratio: 1;
	border: 2px solid #8981ed;
	border-radius: 50%;
	background: radial-gradient(circle, #1bdfd1 0 13%, #343b64 30% 55%, #252941 65%);
	box-shadow: 0 0 7px rgb(123 119 255 / 58%);
}

.gaming-tower i:nth-child(2) {
	border-color: #db79dd;
}

@media (max-width: 760px) {
	.products-section {

		@apply [padding-block:52px_56px];
	}

	.products-inner {

		@apply [width:calc(100%_-_40px)];
	}

	.product-grid {

		@apply [grid-template-columns:1fr] [gap:14px];
	}

	.product-card {

		@apply [min-height:230px] [padding:16px];
	}

	.product-device {
		transform: scale(.86);
	}

	.product-card-laptop {
		min-height: 0;
	}

	.device-laptop {
		width: 100%;
	}

	.product-laptop-image {
		width: 100%;
	}
}

@media (prefers-reduced-motion: reduce) {
	.product-card {

		@apply [transition:none];
	}
}

</style>