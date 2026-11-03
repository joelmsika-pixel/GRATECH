<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonialsSection = ref(null)
let motionQuery

const testimonials = [
	{
		organization: 'IMS SDA Reform Church',
		category: 'Community',
		quote: 'We are thrilled with the laptops, camera tripod stand, and hard drives provided by Gratech. The quality and service were outstanding, significantly improving our operations. Highly recommended!',
	},
	{
		organization: 'Kibaha Berea Adventist Institute',
		category: 'Education',
		quote: 'The network installation and configuration provided by Gratech were exceptional. Their expertise ensured a seamless setup, greatly enhancing our campus connectivity and efficiency. We couldn’t be more satisfied with the results and their professional service.',
	},
	{
		organization: 'Rosmini Boys Secondary School',
		category: 'Education',
		quote: 'Gratech Company provided us with top-notch desktop computers and projectors that have transformed our classroom experience. Their prompt and professional service made the whole process smooth. We’re very pleased with the results and highly recommend their solutions.',
	},
	{
		organization: 'Uzima Schools',
		category: 'Education',
		quote: 'Thanks to Gratech, our new computer lab is now equipped with excellent CPUs and monitors that are perfect for our students’ needs. The entire process was smooth and professional. We’re very pleased with the impact on our educational environment and recommend their services without hesitation.',
	},
	{
		organization: 'Mzumbe University Students’ Organization',
		category: 'Higher education',
		quote: 'Gratech Company has been an invaluable partner for our organization, providing top-notch computer maintenance and a wide range of IT products. Their expertise and reliable service have kept our tech running smoothly and supported our various projects. We highly recommend them for any tech needs.',
	},
]

onMounted(() => {
	motionQuery = gsap.matchMedia()
	motionQuery.add('(prefers-reduced-motion: no-preference)', () => {
		const context = gsap.context(() => {
			gsap.from('.testimonials-heading, .testimonial-card', {
				y: 26,
				autoAlpha: 0,
				immediateRender: false,
				duration: 0.65,
				stagger: 0.09,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.testimonials-grid',
					start: 'top 88%',
					once: true,
				},
			})
		}, testimonialsSection.value)

		return () => context.revert()
	})
})

onUnmounted(() => motionQuery?.revert())
</script>

<template>
	<section
		ref="testimonialsSection"
		class="bg-[#f7f8fc] pt-[48px] pb-[72px] font-[Avenir_Next,Avenir,Segoe_UI,sans-serif] text-[#11152f] max-[700px]:pt-[36px] max-[700px]:pb-[52px]"
		aria-labelledby="testimonials-heading"
	>
		<div class="mx-auto w-[calc(100%_-_64px)] max-w-[1240px] max-[700px]:w-[calc(100%_-_40px)] max-[400px]:w-[calc(100%_-_32px)]">
			<div class="testimonials-heading mb-10 max-w-[740px]">
				<p class="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#73788e]">
					<span class="h-px w-[22px] bg-[#7378e2]" aria-hidden="true"></span>
					Testimonials
				</p>
				<h2 id="testimonials-heading" class="m-0 text-[clamp(36px,4.5vw,54px)] font-semibold leading-[1.03] tracking-[-.06em] text-[#0d1238]">
					Trusted by the people <span class="text-[#7075df]">we serve.</span>
				</h2>
				<p class="mb-0 mt-4 max-w-[590px] text-sm leading-[1.85] text-[#646a80]">
					Feedback from organizations that rely on Gratech for their technology needs.
				</p>
			</div>

			<div class="testimonials-grid grid grid-cols-3 items-stretch gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
				<article
					v-for="(testimonial, index) in testimonials"
					:key="testimonial.organization"
					class="testimonial-card group relative flex flex-col rounded-2xl border border-[#e1e3ef] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c7c9ed] max-[560px]:p-5"
				>
					<div class="mb-5 flex items-center justify-between">
						<span class="text-[11px] font-bold tracking-[.12em] text-[#777d95]">0{{ index + 1 }}</span>
						<span class="rounded-full border border-[#e4e5f2] bg-[#f8f8fc] px-3 py-1.5 text-[9px] font-semibold text-[#6f748a]">{{ testimonial.category }}</span>
					</div>
					<span class="mb-2 block h-8 text-4xl font-semibold leading-none text-[#777be4]" aria-hidden="true">“</span>
					<blockquote class="mb-7 flex-1 text-[13px] leading-[1.85] text-[#53596e]">
						{{ testimonial.quote }}
					</blockquote>
					<div class="border-t border-[#eaebf3] pt-4">
						<p class="mb-0 text-sm font-semibold leading-snug tracking-[-.02em] text-[#0d1238]">{{ testimonial.organization }}</p>
						<p class="mb-0 mt-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#9296a7]">Gratech client</p>
					</div>
				</article>
			</div>
		</div>
	</section>
</template>
