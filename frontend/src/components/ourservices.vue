<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const servicesSection = ref(null)
let motionQuery

const services = [
	{
		number: '01',
		icon: 'products',
		title: 'Sales of IT Products',
		description: 'We provide a wide range of IT products, including hardware, software, and accessories catering to both personal and professional needs. Whether you need computers, networking equipment, or peripherals like keyboards, mice, monitors, and more, we have you covered with top-quality products from leading brands.',
		tags: ['Computers', 'Networking', 'Accessories'],
	},
	{
		number: '02',
		icon: 'software',
		title: 'Software Development',
		description: 'We craft custom software solutions for businesses of all sizes, including applications, enterprise software, and web platforms. Using agile methodologies, we ensure transparency, flexibility, and efficiency throughout the development process. By breaking projects into manageable iterations, we deliver high-quality solutions on time and within budget, while adapting to evolving requirements.',
		tags: ['Web platforms', 'Applications', 'Enterprise software'],
	},
	{
		number: '03',
		icon: 'design',
		title: 'Graphic Design',
		description: 'Our graphic design services are driven by creativity, specializing in branding, logo design, and various marketing materials. We create visually striking posters, brochures, banners, and business cards to help your business stand out. Each project is crafted with fresh ideas and careful attention to detail.',
		tags: ['Brand identity', 'Marketing', 'Print design'],
	},
	{
		number: '04',
		icon: 'consulting',
		title: 'IT Consultation',
		description: 'Our consultancy services are invaluable to businesses looking to optimize their IT infrastructure. We offer expert advice on technology adoption, system integration, cybersecurity, and more, helping our clients leverage the latest innovations to drive growth and stay competitive.',
		tags: ['Infrastructure', 'Cybersecurity', 'Integration'],
	},
	{
		number: '05',
		icon: 'training',
		title: 'Corporate Training',
		description: 'Our corporate training programs equip your team with essential skills for the digital age, covering IT topics like cybersecurity, cloud computing, and data analytics. Whether for upskilling, onboarding, or staying current with industry trends, our expert trainers offer engaging sessions with flexible delivery options and personalized content to meet your organization’s needs.',
		tags: ['Cybersecurity', 'Cloud computing', 'Data analytics'],
	},
]

const reasons = [
	{
		number: '01',
		title: 'Expertise',
		description: 'Our team consists of highly skilled professionals with expertise in their respective fields.',
	},
	{
		number: '02',
		title: 'Innovation',
		description: 'We stay ahead of the curve by embracing the latest technologies and industry trends.',
	},
	{
		number: '03',
		title: 'Customer Focus',
		description: 'Our clients are our top priority, and we go above and beyond to exceed their expectations.',
	},
	{
		number: '04',
		title: 'Reliability',
		description: 'We deliver reliable solutions and provide ongoing support to ensure client satisfaction.',
	},
	{
		number: '05',
		title: 'Customization',
		description: 'Every solution we offer is tailored to meet the unique needs and preferences of our clients.',
	},
]

onMounted(() => {
	motionQuery = gsap.matchMedia()
	motionQuery.add('(prefers-reduced-motion: no-preference)', () => {
		const context = gsap.context(() => {
			gsap.from('.services-hero-copy > *', {
				y: 28,
				autoAlpha: 0,
				duration: 0.75,
				stagger: 0.12,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.services-hero',
					start: 'top 82%',
					toggleActions: 'play none none reverse',
				},
			})

			gsap.from('.section-heading', {
				y: 28,
				autoAlpha: 0,
				duration: 0.7,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.service-list-section',
					start: 'top 82%',
					toggleActions: 'play none none reverse',
				},
			})

			gsap.from('.service-card', {
				y: 32,
				autoAlpha: 0,
				duration: 0.65,
				stagger: 0.1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.service-grid',
					start: 'top 88%',
					toggleActions: 'play none none reverse',
				},
			})

			gsap.from('.why-intro > *, .why-item', {
				y: 24,
				autoAlpha: 0,
				duration: 0.65,
				stagger: 0.08,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.why-section',
					start: 'top 82%',
					toggleActions: 'play none none reverse',
				},
			})
		}, servicesSection.value)

		return () => context.revert()
	})
})

onUnmounted(() => motionQuery?.revert())
</script>

<template>
	<main ref="servicesSection" class="services-page">
		<section class="services-hero" aria-labelledby="services-title">
			<div class="services-hero-inner">
				<div class="services-hero-copy">
					<h1 id="services-title">Technology that works <span>for you.</span></h1>
					<p class="services-lead">
						From the right equipment to custom-built software, we bring together the expertise and
						technology to move your business forward.
					</p>
					<RouterLink class="services-cta" to="/contact-us">
						Let’s discuss your needs
					</RouterLink>
				</div>
				<div class="services-hero-art" aria-hidden="true">
					<div class="art-orbit orbit-a"></div>
					<div class="art-orbit orbit-b"></div>
					<div class="art-center"><span>G</span></div>
					<div class="art-node node-a">IT</div>
					<div class="art-node node-b">&lt;/&gt;</div>
					<div class="art-node node-c">✳</div>
					<div class="art-node node-d">◎</div>
				</div>
			</div>
		</section>

		<section class="service-list-section" aria-labelledby="service-list-title">
			<div class="services-container">
				<div class="section-heading">
					<div>
						<p class="section-kicker">Our capabilities <span>— 05 areas of expertise</span></p>
						<h2 id="service-list-title">Services built around <span>your goals.</span></h2>
					</div>
				</div>

				<div class="service-grid">
					<article v-for="service in services" :key="service.number" class="service-card">
						<div class="service-card-top">
							<span class="service-number">{{ service.number }}</span>
							<span class="service-icon" aria-hidden="true">
								<svg v-if="service.icon === 'products'" viewBox="0 0 24 24" fill="none">
									<rect x="3" y="4" width="18" height="13" rx="2" />
									<path d="M8 21h8m-4-4v4m-5-13h10m-10 3h6" />
								</svg>
								<svg v-else-if="service.icon === 'software'" viewBox="0 0 24 24" fill="none">
									<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14" />
								</svg>
								<svg v-else-if="service.icon === 'design'" viewBox="0 0 24 24" fill="none">
									<path d="m14 4 6 6M4 20l4.5-1 10-10a2.12 2.12 0 0 0-3-3l-10 10L4 20Z" />
									<path d="M4 4h5M4 8h3m9 12h4" />
								</svg>
								<svg v-else-if="service.icon === 'consulting'" viewBox="0 0 24 24" fill="none">
									<circle cx="10.5" cy="10.5" r="6.5" />
									<path d="m16 16 5 5m-10.5-14v7m-3.5-3.5h7" />
								</svg>
								<svg v-else-if="service.icon === 'security'" viewBox="0 0 24 24" fill="none">
									<path d="M3 10.5 12 4l9 6.5V20H3v-9.5Z" />
									<path d="M8 20v-6a4 4 0 0 1 8 0v6m-4-8v3m-1 0h2" />
								</svg>
								<svg v-else viewBox="0 0 24 24" fill="none">
									<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
									<path d="M8 7h8m-8 4h8" />
								</svg>
							</span>
						</div>
						<h3>{{ service.title }}</h3>
						<p>{{ service.description }}</p>
						<div class="service-tags">
							<span v-for="tag in service.tags" :key="tag">{{ tag }}</span>
						</div>
						<span class="service-card-line" aria-hidden="true"></span>
					</article>
				</div>
			</div>
		</section>

		<section class="why-section" aria-labelledby="why-title">
			<div class="why-container">
				<div class="why-intro">
					<p class="section-kicker light-kicker">The GRATECH difference</p>
					<h2 id="why-title">Why choose <span>us?</span></h2>
					<p>
						At Gratech Company, we are committed to excellence in everything we do. We build lasting
						partnerships by listening first, delivering thoughtfully, and supporting you along the way.
					</p>
					<RouterLink class="why-link" to="/contact-us">Meet your technology partner</RouterLink>
					<div class="why-decoration" aria-hidden="true"><span>G</span></div>
				</div>
				<div class="why-list">
					<article v-for="reason in reasons" :key="reason.number" class="why-item">
						<span class="why-number">{{ reason.number }}</span>
						<div>
							<h3>{{ reason.title }}</h3>
							<p>{{ reason.description }}</p>
						</div>
					</article>
				</div>
			</div>
		</section>

	</main>
</template>

<style scoped>


.services-page {

	@apply [--navy:#0d1238] [--ink:#11152f] [--muted:#646a80] [--purple:#7075df] [color:var(--ink)] [font-family:Avenir_Next,_Avenir,_Segoe_UI,_sans-serif];
}

.services-hero {

	@apply [position:relative] [overflow:hidden] [padding:56px_0_0] [background:radial-gradient(ellipse_at_76%_45%,_rgb(219_222_255_/_64%),_transparent_34%),_linear-gradient(115deg,_#fff_0%,_#fafaff_60%,_#f1f2ff_100%)];
}

.services-hero-inner,
.services-container,
.why-container,
.hero-foot {

	@apply [width:min(1240px,_calc(100%_-_64px))] [margin-inline:auto];
}

.services-hero-inner {

	@apply [display:grid] [min-height:360px] [grid-template-columns:1.1fr_.9fr] [align-items:center] [gap:36px];
}

.services-hero-copy {

	@apply [position:relative] [z-index:1] [padding-block:20px_32px];
}

.section-kicker {

	@apply [display:flex] [align-items:center] [gap:10px] [margin:0_0_17px] [color:#6f7489] [font-size:10px] [font-weight:700] [letter-spacing:.14em] [text-transform:uppercase];
}

.services-hero h1 {

	@apply [max-width:620px] [margin:0] [color:var(--navy)] [font-size:clamp(32px,_4vw,_48px)] [font-weight:650] [letter-spacing:-.07em] [line-height:.99];
}

.services-hero h1 span,
.section-heading h2 span,
.why-intro h2 span {

	@apply [color:var(--purple)];
}

.services-lead {

	@apply [max-width:520px] [margin:23px_0_25px] [color:var(--muted)] [font-size:15px] [line-height:1.8];
}

.services-cta {

	@apply [display:inline-flex] [min-height:49px] [align-items:center] [justify-content:center] [gap:20px] [padding:0_19px] [border:1px_solid_var(--navy)] [border-radius:4px] [background:var(--navy)] [color:#fff] [font-size:11px] [font-weight:700] [text-decoration:none] [transition:transform_.2s_ease,_background-color_.2s_ease,_border-color_.2s_ease];
}

.services-cta:hover {

	@apply [transform:translateY(-2px)] [border-color:#292f69] [background:#292f69];
}

.services-cta:focus-visible,
.why-link:focus-visible {

	@apply [outline:3px_solid_#888cf0] [outline-offset:4px];
}

.services-cta span {

	@apply [font-size:15px];
}

.services-hero-art {
	position: relative;
	display: grid;
	width: min(100%, 440px);
	aspect-ratio: 1;
	place-self: center;
	place-items: center;
	perspective: 800px;
}

.art-orbit {
	position: absolute;
	width: 78%;
	height: 36%;
	border: 1px solid rgb(105 112 201 / 23%);
	border-radius: 50%;
	transform: rotate(-37deg);
}

.orbit-b {
	width: 94%;
	height: 50%;
	border-color: rgb(105 112 201 / 13%);
	transform: rotate(38deg);
}

.art-center {
	position: relative;
	z-index: 1;
	display: grid;
	width: 116px;
	height: 116px;
	place-items: center;
	border: 1px solid rgb(255 255 255 / 80%);
	border-radius: 32px;
	background: linear-gradient(145deg, #fff, #e8e9ff);
	box-shadow: 0 22px 54px rgb(47 53 127 / 17%), inset 0 1px 0 #fff;
	transform: rotateY(-14deg) rotateX(8deg);
}

.art-center span {
	color: #6268d0;
	font-size: 58px;
	font-weight: 750;
	letter-spacing: -.1em;
}

.art-node {
	position: absolute;
	z-index: 2;
	display: grid;
	width: 50px;
	height: 50px;
	place-items: center;
	border: 1px solid rgb(255 255 255 / 90%);
	border-radius: 15px;
	background: rgb(255 255 255 / 90%);
	box-shadow: 0 12px 28px rgb(36 42 112 / 12%);
	color: #575dc4;
	font-size: 13px;
	font-weight: 750;
	backdrop-filter: blur(8px);
}

.node-a { top: 17%; left: 19%; }
.node-b { top: 23%; right: 13%; width: 58px; }
.node-c { right: 19%; bottom: 15%; font-size: 20px; }
.node-d { bottom: 22%; left: 10%; font-size: 21px; }

.hero-foot {

	@apply [display:flex] [min-height:54px] [align-items:center] [gap:13px] [border-top:1px_solid_rgb(13_18_56_/_10%)] [color:#73788e] [font-size:9px] [font-weight:650] [letter-spacing:.1em] [text-transform:uppercase];
}

.hero-foot i {

	@apply [width:24px] [height:1px] [background:#c5c7d5];
}

.service-list-section {

	@apply [padding:78px_0_84px] [background:#fff];
}

.section-heading {

	@apply [display:flex] [align-items:end] [justify-content:space-between] [gap:30px] [margin-bottom:38px];
}

.section-kicker {

	@apply [margin-bottom:13px];
}

.section-kicker span {

	@apply [color:#9296a7] [font-size:9px] [letter-spacing:.07em];
}

.section-heading h2 {

	@apply [max-width:620px] [margin:0] [color:var(--navy)] [font-size:clamp(32px,_4vw,_48px)] [font-weight:650] [letter-spacing:-.06em] [line-height:1.04];
}

.section-heading > p {

	@apply [max-width:310px] [margin:0_0_4px] [color:var(--muted)] [font-size:12px] [line-height:1.75];
}

.service-grid {

	@apply [display:grid] [grid-template-columns:repeat(3,_minmax(0,_1fr))] [gap:15px];
}

.service-card {

	@apply [position:relative] [display:flex] [min-height:340px] [flex-direction:column] [align-items:flex-start] [overflow:hidden] [padding:23px] [border:1px_solid_#e7e8f0] [border-radius:5px] [background:linear-gradient(145deg,_#fff_20%,_#fafaff)] [transition:transform_.28s_ease,_border-color_.28s_ease,_box-shadow_.28s_ease];
}

.service-card:hover {

	@apply [transform:translateY(-5px)] [border-color:#d1d3ef] [box-shadow:0_18px_34px_rgb(20_25_69_/_8%)];
}

.service-card-top {

	@apply [display:flex] [width:100%] [align-items:center] [justify-content:space-between] [margin-bottom:22px];
}

.service-number {

	@apply [color:#80859a] [font-size:10px] [font-weight:700] [letter-spacing:.12em];
}

.service-icon {

	@apply [display:grid] [width:42px] [height:42px] [place-items:center] [border:1px_solid_#e6e7f4] [border-radius:12px] [background:#f3f3ff] [color:#666bd1] [transition:transform_.25s_ease,_background-color_.25s_ease];
}

.service-card:hover .service-icon {

	@apply [transform:translateY(-2px)_rotate(-4deg)] [background:#e9eaff];
}

.service-icon svg {

	@apply [width:20px] [height:20px] [stroke:currentColor] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.6];
}

.service-card h3 {

	@apply [margin:0_0_11px] [color:var(--navy)] [font-size:19px] [font-weight:650] [letter-spacing:-.035em];
}

.service-card > p {

	@apply [margin:0_0_20px] [color:var(--muted)] [font-size:11px] [line-height:1.8];
}

.service-tags {

	@apply [display:flex] [flex-wrap:wrap] [gap:6px] [margin-top:auto];
}

.service-tags span {

	@apply [padding:6px_8px] [border:1px_solid_#ebebf3] [border-radius:3px] [background:#fff] [color:#74798c] [font-size:8px] [font-weight:600];
}

.service-card-line {

	@apply [position:absolute] [right:0] [bottom:0] [left:0] [height:2px] [background:linear-gradient(90deg,_#7378e2,_#d4d6fa_72%,_transparent)] [transform:scaleX(0)] [transform-origin:left] [transition:transform_.3s_ease];
}

.service-card:hover .service-card-line {

	@apply [transform:scaleX(1)];
}

.why-section {

	@apply [position:relative] [overflow:hidden] [padding:66px_0_70px] [background:radial-gradient(ellipse_at_8%_100%,_rgb(105_112_221_/_22%),_transparent_36%),_linear-gradient(120deg,_#101633,_#171e49)] [color:#fff];
}

.why-container {

	@apply [display:grid] [grid-template-columns:.85fr_1.15fr] [gap:clamp(40px,_8vw,_110px)] [align-items:center];
}

.why-intro {

	@apply [position:relative] [align-self:stretch] [padding-block:14px];
}

.light-kicker {

	@apply [color:#b9bdd6];
}

.why-intro h2 {

	@apply [margin:0] [color:#fff] [font-size:clamp(32px,_4vw,_48px)] [font-weight:650] [letter-spacing:-.065em] [line-height:1];
}

.why-intro h2 span {

	@apply [color:#9b9df5];
}

.why-intro > p:not(.section-kicker) {

	@apply [position:relative] [z-index:1] [max-width:390px] [margin:22px_0_23px] [color:#c2c6dc] [font-size:13px] [line-height:1.85];
}

.why-link {

	@apply [position:relative] [z-index:1] [display:inline-flex] [align-items:center] [gap:12px] [color:#fff] [font-size:11px] [font-weight:700] [text-decoration:none];
}

.why-link span {

	@apply [color:#a4a7fa] [font-size:15px];
}

.why-link:hover {

	@apply [color:#bfc1ff];
}

.why-decoration {

	@apply [position:absolute] [right:12%] [bottom:-30px] [display:grid] [width:150px] [height:150px] [place-items:center] [border:1px_solid_rgb(255_255_255_/_8%)] [border-radius:42px] [color:rgb(255_255_255_/_5%)] [font-size:120px] [font-weight:750] [transform:rotate(-15deg)];
}

.why-list {

	@apply [border-top:1px_solid_rgb(255_255_255_/_17%)];
}

.why-item {

	@apply [display:grid] [grid-template-columns:38px_1fr_20px] [align-items:start] [gap:15px] [padding:19px_0] [border-bottom:1px_solid_rgb(255_255_255_/_17%)];
}

.why-number {

	@apply [padding-top:3px] [color:#a3a7c1] [font-size:9px] [font-weight:700] [letter-spacing:.1em];
}

.why-item h3 {

	@apply [margin:0_0_5px] [color:#fff] [font-size:15px] [font-weight:650];
}

.why-item p {

	@apply [max-width:440px] [margin:0] [color:#b9bdd2] [font-size:11px] [line-height:1.7];
}

@media (max-width: 900px) {
	.service-grid {

		@apply [grid-template-columns:repeat(2,_minmax(0,_1fr))];
	}

	.service-card {

		@apply [min-height:320px];
	}

	.why-container {

		@apply [grid-template-columns:.8fr_1.2fr] [gap:42px];
	}
}

@media (max-width: 700px) {
	.services-hero-inner,
.services-container,
.why-container,
.hero-foot {

		@apply [width:calc(100%_-_40px)];
	}

	.services-hero {

		@apply [padding-top:40px];
	}

	.services-hero-inner {

		@apply [grid-template-columns:1fr] [gap:0];
	}

	.services-hero-copy {

		@apply [padding-block:16px_0];
	}

	.services-hero h1 {

		@apply [font-size:clamp(32px,_4vw,_48px)];
	}

	.services-lead {

		@apply [font-size:14px];
	}

	.services-hero-art {
		width: min(100%, 330px);
		margin: -10px auto 10px;
	}

	.art-center {
		width: 90px;
		height: 90px;
		border-radius: 25px;
	}

	.art-center span {
		font-size: 46px;
	}

	.art-node {
		width: 42px;
		height: 42px;
		border-radius: 12px;
	}

	.hero-foot {

		@apply [gap:8px] [font-size:7px] [letter-spacing:.06em];
	}

	.hero-foot i {

		@apply [width:13px];
	}

	.service-list-section {

		@apply [padding-block:56px_60px];
	}

	.section-heading {

		@apply [align-items:flex-start] [flex-direction:column] [gap:14px] [margin-bottom:27px];
	}

	.section-heading > p {

		@apply [max-width:480px];
	}

	.service-grid {

		@apply [grid-template-columns:1fr] [gap:12px];
	}

	.service-card {

		@apply [min-height:0] [padding:21px];
	}

	.service-tags {

		@apply [margin-top:2px];
	}

	.why-section {

		@apply [padding-block:50px_56px];
	}

	.why-container {

		@apply [grid-template-columns:1fr] [gap:34px];
	}

	.why-intro {

		@apply [padding-block:0];
	}

	.why-decoration {

		@apply [right:4%] [bottom:-12px] [width:110px] [height:110px] [font-size:85px];
	}
}

@media (max-width: 400px) {
	.services-hero-inner,
.services-container,
.why-container,
.hero-foot {

		@apply [width:calc(100%_-_32px)];
	}

	.hero-foot {

		@apply [flex-wrap:wrap] [min-height:48px] [font-size:6px];
	}

	.hero-foot i {

		@apply [width:9px];
	}

	.service-card {

		@apply [padding:18px];
	}

	.service-card > p {

		@apply [font-size:10px];
	}
}

@media (prefers-reduced-motion: reduce) {
	*,
*::before,
*::after {
		@apply [scroll-behavior:auto] ![transition-duration:0.01ms];
	}
}


</style>
