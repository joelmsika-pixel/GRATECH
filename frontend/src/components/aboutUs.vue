<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutSection = ref(null)
let motionQuery

const coreValues = [
	{
		title: 'Innovation',
		icon: 'innovation',
		description: 'We embrace creativity and innovation, constantly seeking new and better ways to solve problems and meet the evolving needs of our customers.',
	},
	{
		title: 'Integrity',
		icon: 'integrity',
		description: 'We conduct ourselves with honesty, transparency, and integrity in all aspects of our business, building trust and credibility with our customers, partners, and employees.',
	},
	{
		title: 'Customer Focus',
		icon: 'customer',
		description: 'We are dedicated to understanding and exceeding the expectations of our customers, delivering personalized solutions and exceptional service that drive long-term relationships and loyalty.',
	},
	{
		title: 'Excellence',
		icon: 'excellence',
		description: 'We are committed to excellence in everything we do, striving for the highest standards of quality, performance, and professionalism in our products, services, and interactions.',
	},
	{
		title: 'Collaboration',
		icon: 'collaboration',
		description: 'We believe in the power of collaboration and teamwork, fostering an inclusive and supportive environment where diverse perspectives are valued, and collective success is celebrated.',
	},
]

onMounted(() => {
	motionQuery = gsap.matchMedia()
	motionQuery.add('(prefers-reduced-motion: no-preference)', () => {
		const context = gsap.context(() => {
			gsap.from('.about-heading, .about-copy', {
				y: 34,
				autoAlpha: 0,
				duration: 0.85,
				stagger: 0.16,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.about-intro',
					start: 'top 82%',
					toggleActions: 'play none none reverse',
				},
			})

			gsap.from('.about-stat', {
				y: 22,
				autoAlpha: 0,
				duration: 0.65,
				stagger: 0.12,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.about-stats',
					start: 'top 88%',
					toggleActions: 'play none none reverse',
				},
			})

			gsap.from('.purpose-card', {
				y: 42,
				autoAlpha: 0,
				duration: 0.8,
				stagger: 0.18,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.purpose-grid',
					start: 'top 82%',
					toggleActions: 'play none none reverse',
				},
			})

			gsap.from('.values-heading', {
				y: 30,
				autoAlpha: 0,
				duration: 0.75,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.values-heading',
					start: 'top 87%',
					toggleActions: 'play none none reverse',
				},
			})

			gsap.from('.value-card', {
				y: 30,
				autoAlpha: 0,
				duration: 0.65,
				stagger: 0.1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.values-grid',
					start: 'top 86%',
					toggleActions: 'play none none reverse',
				},
			})
		}, aboutSection.value)

		return () => context.revert()
	})
})

onUnmounted(() => motionQuery?.revert())
</script>

<template>
	<section ref="aboutSection" class="about-section" aria-labelledby="about-heading">
		<div class="about-inner">
			<div class="about-intro">
				<div class="about-heading">
					<p class="about-kicker"><span class="kicker-line"></span> Who we are</p>
					<h2 id="about-heading">Think Technology, <span>Choose us.</span></h2>
					<p class="about-index">About GRATECH <span>—</span> 01 / 03</p>
				</div>
				<div class="about-copy">
					<p>
						Gratech Company is a leading registered technology company based in Tanzania with its
						headquarters in Morogoro region and was entered the number 510012 in the index of
						registration. Gratech is dedicated to providing innovative solutions to meet the evolving needs
						of individuals and businesses. With a comprehensive range of services spanning Sales of IT
						Products, Software Development, Graphic Design, IT Consultation, Corporate Training, we empower our clients to thrive in the digital age.
					</p>
					<p>
						We are a one-stop destination for all things technology, combining cutting-edge products with
						expert services to empower individuals and businesses alike in navigating the digital landscape
						effectively.
					</p>
					<div class="about-signoff">
						<span class="signoff-mark" aria-hidden="true">G</span>
						<span>Rooted in Tanzania. Ready for the future.</span>
					</div>
				</div>
			</div>

			<div class="about-stats" aria-label="Company facts">
				<div class="about-stat">
					<strong>510012</strong>
					<span>Registration index</span>
				</div>
				<div class="about-stat">
					<strong>Morogoro</strong>
					<span>Headquarters, Tanzania</span>
				</div>
				<div class="about-stat">
					<strong>360°</strong>
					<span>Technology partner</span>
				</div>
			</div>

			<div class="purpose-grid">
				<article class="purpose-card mission-card">
					<div class="purpose-card-top">
						<span class="purpose-index">01</span>
					</div>
					<h3>Our Mission</h3>
					<p>
						To empower individuals and businesses with innovative technology solutions that enhance
						productivity, connectivity, and security.
					</p>
					<span class="purpose-decoration" aria-hidden="true"></span>
				</article>
				<article class="purpose-card vision-card">
					<div class="purpose-card-top">
						<span class="purpose-index">02</span>
						<span class="purpose-symbol vision-symbol" aria-hidden="true">✳</span>
					</div>
					<h3>Our Vision</h3>
					<p>
						To be a trusted leader in the technology industry, known for our unwavering commitment to
						excellence, integrity, and customer satisfaction.
					</p>
					<span class="purpose-decoration" aria-hidden="true"></span>
				</article>
			</div>

			<div class="values-heading">
				<div>
					<p class="about-kicker"><span class="kicker-line"></span> What guides us</p>
					<h3>Core <span class="text-[#7075df]">Values</span></h3>
				</div>
				<p class="values-note">The principles behind every solution, relationship, and decision.</p>
			</div>
			<ol class="values-grid">
				<li v-for="(value, index) in coreValues" :key="value.title" class="value-card">
					<div class="value-card-topline">
						<span class="value-index">0{{ index + 1 }}</span>
						<span class="value-icon" aria-hidden="true">
							<svg v-if="value.icon === 'innovation'" viewBox="0 0 24 24" fill="none">
								<path d="M9 18h6m-5 3h4m-2-20a7 7 0 0 0-4 12.75c.7.48 1 1.05 1 1.75h6c0-.7.3-1.27 1-1.75A7 7 0 0 0 12 1Z" />
								<path d="M12 5v2m-4.25-.25 1.4 1.4m7.1-1.4-1.4 1.4" />
							</svg>
							<svg v-else-if="value.icon === 'integrity'" viewBox="0 0 24 24" fill="none">
								<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
								<path d="m8.5 12 2.25 2.25L15.5 9.5" />
							</svg>
							<svg v-else-if="value.icon === 'customer'" viewBox="0 0 24 24" fill="none">
								<circle cx="9" cy="8" r="4" />
								<path d="M2.5 21a6.5 6.5 0 0 1 13 0m3.25-13.5a4 4 0 0 1 0 7.75M18 17a5 5 0 0 1 3.5 4" />
							</svg>
							<svg v-else-if="value.icon === 'excellence'" viewBox="0 0 24 24" fill="none">
								<path d="m12 2.5 2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5Z" />
								<path d="m9.5 11.75 1.7 1.7 3.5-3.7" />
							</svg>
							<svg v-else viewBox="0 0 24 24" fill="none">
								<circle cx="12" cy="5" r="3" />
								<circle cx="5" cy="19" r="3" />
								<circle cx="19" cy="19" r="3" />
								<path d="m10.6 7.7-4.2 8.6m7-8.6 4.2 8.6M8 19h8" />
							</svg>
						</span>
					</div>
					<h4>{{ value.title }}</h4>
					<p>{{ value.description }}</p>
					<span class="value-card-accent" aria-hidden="true"></span>
				</li>
			</ol>
		</div>
	</section>
</template>

<style scoped>

.about-section {
	@apply [position:relative] [overflow:hidden] [background:radial-gradient(ellipse_at_94%_8%,_rgb(109_114_225_/_9%),_transparent_30%),_linear-gradient(180deg,_#f8f9fd_0%,_#fff_38%,_#fff_100%)] [color:#11152f] [font-family:Avenir_Next,_Avenir,_Segoe_UI,_sans-serif];
	@apply [padding:80px_0_84px];
}

.about-section::before {

	@apply [position:absolute] [top:0] [right:max(32px,_calc((100%_-_1240px)_/_2))] [width:1px] [height:250px] [background:linear-gradient(#c6c9ed,_transparent)] [content:''];
}

.about-inner {

	@apply [position:relative] [width:min(1240px,_calc(100%_-_64px))] [margin-inline:auto];
}

.about-intro {

	@apply [display:grid] [grid-template-columns:.9fr_1.1fr] [gap:clamp(42px,_8vw,_112px)] [align-items:start];
}

.about-kicker {

	@apply [display:flex] [align-items:center] [gap:10px] [margin:0_0_18px] [color:#6c7187] [font-size:10px] [font-weight:700] [letter-spacing:.15em] [text-transform:uppercase];
}

.kicker-line {

	@apply [width:22px] [height:1px] [background:#7378e2];
}

h2,
h3,
h4,
p {

	@apply [margin-top:0];
}

.about-heading h2 {

	@apply [max-width:500px] [margin-bottom:28px] [color:#0d1238] [font-size:clamp(32px,_4vw,_48px)] [font-weight:650] [letter-spacing:-.065em] [line-height:.99];
}

.about-heading h2 span {

	@apply [color:#7175df];
}

.about-index {

	@apply [margin:0] [color:#8a8ea0] [font-size:9px] [font-weight:700] [letter-spacing:.12em] [text-transform:uppercase];
}

.about-index span {

	@apply [padding-inline:6px] [color:#777be4];
}

.about-copy {

	@apply [max-width:690px] [padding-top:30px];
}

.about-copy > p {

	@apply [margin:0_0_17px] [color:#62677b] [font-size:14px] [line-height:1.9];
}

.about-signoff {

	@apply [display:flex] [align-items:center] [gap:11px] [margin-top:24px] [color:#303653] [font-size:11px] [font-weight:650];
}

.signoff-mark {

	@apply [display:grid] [width:31px] [height:31px] [place-items:center] [border-radius:50%] [background:#e8e9ff] [color:#555bc2] [font-size:14px] [font-weight:750];
}

.about-stats {

	@apply [display:grid] [grid-template-columns:repeat(3,_minmax(0,_1fr))] [margin-top:64px] [padding:23px_0] [border-top:1px_solid_#e5e6ef] [border-bottom:1px_solid_#e5e6ef];
}

.about-stat {

	@apply [display:grid] [gap:6px] [padding-inline:25px] [border-right:1px_solid_#e5e6ef];
}

.about-stat:first-child {

	@apply [padding-left:0];
}

.about-stat:last-child {

	@apply [border-right:0];
}

.about-stat strong {

	@apply [color:#0d1238] [font-size:clamp(18px,_2.2vw,_25px)] [font-weight:650] [letter-spacing:-.04em];
}

.about-stat span {

	@apply [color:#777c90] [font-size:10px];
}

.purpose-grid {

	@apply [display:grid] [grid-template-columns:repeat(2,_minmax(0,_1fr))] [gap:18px] [margin-top:22px];
}

.purpose-card {

	@apply [position:relative] [display:flex] [min-height:260px] [flex-direction:column] [align-items:flex-start] [overflow:hidden] [padding:27px_30px] [border:1px_solid_#e7e8f1] [border-radius:6px] [background:linear-gradient(145deg,_#fff,_#f9f9ff)] [box-shadow:0_14px_32px_rgb(19_25_75_/_4%)] [transition:transform_.3s_ease,_box-shadow_.3s_ease,_border-color_.3s_ease];
}

.purpose-card:hover {

	@apply [transform:translateY(-5px)] [border-color:#d2d4f0] [box-shadow:0_20px_38px_rgb(19_25_75_/_8%)];
}

.vision-card {

	@apply [background:radial-gradient(circle_at_94%_4%,_rgb(148_151_239_/_13%),_transparent_30%),_linear-gradient(145deg,_#fff,_#f9f9ff)];
}

.purpose-card-top {

	@apply [display:flex] [width:100%] [align-items:center] [justify-content:space-between];
}

.purpose-index,
.value-index {

	@apply [color:#777be4] [font-size:10px] [font-weight:700] [letter-spacing:.12em];
}

.purpose-symbol {

	@apply [display:grid] [width:35px] [height:35px] [place-items:center] [border:1px_solid_#e6e7f5] [border-radius:50%] [color:#696ed7] [font-size:16px];
}

.purpose-card h3 {

	@apply [margin:29px_0_10px] [color:#0d1238] [font-size:24px] [font-weight:650] [letter-spacing:-.04em];
}

.purpose-card p {

	@apply [position:relative] [z-index:1] [max-width:470px] [margin:0] [color:#62677b] [font-size:13px] [line-height:1.8];
}

.purpose-decoration {

	@apply [position:absolute] [right:-56px] [bottom:-95px] [width:190px] [height:190px] [border:1px_solid_rgb(113_117_223_/_13%)] [border-radius:50%];
}

.purpose-decoration::before,
.purpose-decoration::after {

	@apply [position:absolute] [inset:16px] [border:1px_solid_rgb(113_117_223_/_12%)] [border-radius:50%] [content:''];
}

.purpose-decoration::after {

	@apply [inset:34px];
}

.values-heading {

	@apply [display:flex] [align-items:end] [justify-content:space-between] [gap:24px] [margin-top:90px];
}

.values-heading .about-kicker {

	@apply [margin-bottom:12px];
}

.values-heading h3 {

	@apply [margin:0] [color:#0d1238] [font-size:clamp(32px,_4vw,_48px)] [font-weight:600] [letter-spacing:-.06em] [line-height:1];
}

.values-note {

	@apply [max-width:300px] [margin:0_0_2px] [color:#777c90] [font-size:12px] [line-height:1.7];
}

.values-grid {

	@apply [display:grid] [grid-template-columns:repeat(6,_minmax(0,_1fr))] [gap:13px] [margin:28px_0_0] [padding:0] [list-style:none];
}

.value-card {

	@apply [position:relative] [grid-column:span_2] [min-height:202px] [overflow:hidden] [padding:22px] [border:1px_solid_#e8e9f1] [border-radius:5px] [background:#fff] [transition:transform_.28s_ease,_border-color_.28s_ease,_box-shadow_.28s_ease];
}

.value-card:nth-child(4) {

	@apply [grid-column:2_/_span_2];
}

.value-card-topline {

	@apply [display:flex] [align-items:center] [justify-content:space-between];
}

.value-icon {

	@apply [display:grid] [width:38px] [height:38px] [place-items:center] [border:1px_solid_#e5e6f5] [border-radius:11px] [background:linear-gradient(145deg,_#f5f5ff,_#fff)] [color:#686ed7] [transition:transform_.25s_ease,_border-color_.25s_ease,_background-color_.25s_ease];
}

.value-icon svg {

	@apply [width:19px] [height:19px] [stroke:currentColor] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.65];
}

.value-card:hover {

	@apply [transform:translateY(-4px)] [border-color:#d5d7f0] [box-shadow:0_15px_30px_rgb(20_25_69_/_7%)];
}

.value-card:hover .value-icon {

	@apply [transform:translateY(-2px)_rotate(-4deg)] [border-color:#c9cbf1] [background:#eeeeff];
}

.value-card h4 {

	@apply [margin:22px_0_9px] [color:#0d1238] [font-size:16px] [font-weight:650] [letter-spacing:-.02em];
}

.value-card p {

	@apply [margin:0] [color:#696e81] [font-size:11px] [line-height:1.8];
}

.value-card-accent {

	@apply [position:absolute] [right:0] [bottom:0] [left:0] [height:2px] [background:linear-gradient(90deg,_#767ae3,_#d7d8fb_70%,_transparent)] [transform:scaleX(0)] [transform-origin:left] [transition:transform_.3s_ease];
}

.value-card:hover .value-card-accent {

	@apply [transform:scaleX(1)];
}

@media (max-width: 760px) {
	.about-section {

		@apply [padding-block:58px_64px];
	}

	.about-inner {

		@apply [width:calc(100%_-_40px)];
	}

	.about-section::before {

		@apply [right:20px] [height:170px];
	}

	.about-intro {

		@apply [grid-template-columns:1fr] [gap:17px];
	}

	.about-heading h2 {

		@apply [max-width:540px] [font-size:clamp(32px,_4vw,_48px)];
	}

	.about-copy {

		@apply [padding-top:0];
	}

	.about-stats {

		@apply [margin-top:38px];
	}

	.about-stat {

		@apply [padding-inline:14px];
	}

	.purpose-grid {

		@apply [grid-template-columns:1fr] [gap:12px];
	}

	.purpose-card {

		@apply [min-height:230px] [padding:24px];
	}

	.values-heading {

		@apply [align-items:flex-start] [flex-direction:column] [gap:12px] [margin-top:65px];
	}

	.values-grid {

		@apply [grid-template-columns:repeat(2,_minmax(0,_1fr))] [gap:10px];
	}

	.value-card,
	.value-card:nth-child(4) {

		@apply [grid-column:auto] [min-height:185px] [padding:18px];
	}
}

@media (max-width: 480px) {
	.about-inner {

		@apply [width:calc(100%_-_32px)];
	}

	.about-section {

		@apply [padding-block:50px_56px];
	}

	.about-copy > p {

		@apply [font-size:13px];
	}

	.about-stats {

		@apply [margin-top:30px] [padding-block:17px];
	}

	.about-stat {

		@apply [gap:4px] [padding-inline:9px];
	}

	.about-stat strong {

		@apply [font-size:16px];
	}

	.about-stat span {

		@apply [font-size:8px] [line-height:1.4];
	}

	.values-grid {

		@apply [grid-template-columns:1fr];
	}

	.value-card,
	.value-card:nth-child(4) {

		@apply [min-height:0];
	}
}

@media (prefers-reduced-motion: reduce) {
	.purpose-card,
	.value-card,
	.value-card-accent {

		@apply [transition:none];
	}

	.value-card:hover .value-icon {

		@apply [transform:none];
	}
}

</style>
