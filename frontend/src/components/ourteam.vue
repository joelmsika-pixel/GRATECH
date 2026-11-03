<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import abubakariImage from './images/team images/Abubakary.png'
import banyendaImage from './images/team images/Banyenda.png'
import gradsonImage from './images/team images/Gradson.png'
import victoryImage from './images/team images/Happy.png'

gsap.registerPlugin(ScrollTrigger)

const teamSection = ref(null)
let motionQuery

const socialBackgrounds = {
	facebook: 'bg-[#1877f2]',
	instagram: 'bg-[linear-gradient(45deg,#405de6,#5b51db,#b33ab4,#c135b4,#e1306c,#fd1f1f)]',
	x: 'bg-[#111]',
}

const team = [
	{
		name: 'Gradson Ibrahim',
		role: 'Chief Executive Officer',
		email: 'ceo@gratech.co.tz',
		socials: [
			{ name: 'Facebook', url: 'https://www.facebook.com/gradsonibrahim', icon: 'facebook' },
			{ name: 'Instagram', url: 'https://www.instagram.com/gradsonibrahim/', icon: 'instagram' },
			{ name: 'X', url: 'https://x.com/gradsonibrahim', icon: 'x' },
		],
		image: gradsonImage,
	},
	{
		name: 'Abubakari Mbasha',
		role: 'Chief Operating Officer',
		email: 'coo@gratech.co.tz',
		image: abubakariImage,
	},
	{
		name: 'Happy Sanga',
		role: 'Chief Financial Officer',
		email: 'cfo@gratech.co.tz',
		image: victoryImage,
	},
	{
		name: 'Nikanda Banyenda',
		role: 'Chief Human Resources Officer',
		email: 'chro@gratech.co.tz',
		image: banyendaImage,
	},
]

onMounted(() => {
	motionQuery = gsap.matchMedia()
	motionQuery.add('(prefers-reduced-motion: no-preference)', () => {
		const context = gsap.context(() => {
			gsap.from('.team-heading', {
				y: 28,
				autoAlpha: 0,
				immediateRender: false,
				duration: 0.7,
				stagger: 0.12,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.team-heading',
					start: 'top 85%',
					once: true,
				},
			})

			gsap.from('.team-card', {
				y: 28,
				autoAlpha: 0,
				immediateRender: false,
				duration: 0.65,
				stagger: 0.1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.team-grid',
					start: 'top 88%',
					once: true,
				},
			})
		}, teamSection.value)

		return () => context.revert()
	})
})

onUnmounted(() => motionQuery?.revert())
</script>

<template>
	<section ref="teamSection" class="bg-white py-[72px] font-[Avenir_Next,Avenir,Segoe_UI,sans-serif] text-[#11152f] max-[700px]:py-[52px]" aria-labelledby="team-heading">
		<div class="mx-auto w-[calc(100%_-_64px)] max-w-[1240px] max-[700px]:w-[calc(100%_-_40px)] max-[400px]:w-[calc(100%_-_32px)]">
			<div class="mb-11 max-w-[760px]">
				<div class="team-heading">
					<p class="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#6c7187]">
						<span class="h-px w-[22px] bg-[#7378e2]" aria-hidden="true"></span>
						The people behind the work
					</p>
					<h2 id="team-heading" class="m-0 text-[clamp(32px,4vw,48px)] font-semibold leading-[.99] tracking-[-.065em] text-[#0d1238]">
						Our <span class="text-[#7075df]">Team</span>
					</h2>
				</div>
			</div>

			<div class="team-grid grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
				<article v-for="(member, index) in team" :key="member.email" class="team-card group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#e2e4f0] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#c5c8ed]">
					<div class="relative aspect-[4/3] overflow-hidden bg-white sm:aspect-square">
						<img
							class="h-full w-full object-contain object-center"
							:src="member.image"
							:alt="`Portrait of ${member.name}`"
							loading="lazy"
						/>
						<span class="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-white/70 bg-white/90 text-[9px] font-bold tracking-wide text-[#555bc4]">{{ String(index + 1).padStart(2, '0') }}</span>
					</div>
					<div class="flex min-w-0 flex-1 flex-col p-4">
						<h3 class="mb-1 min-w-0 text-base font-semibold tracking-[-.035em] text-[#0d1238]">{{ member.name }}</h3>
						<p class="mb-2 text-xs font-medium leading-relaxed text-[#71768c]">{{ member.role }}</p>
						<a class="break-all text-xs font-semibold text-[#555bc4] underline decoration-[#c4c6ef] underline-offset-4 transition-colors hover:text-[#0d1238] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8184f0]" :href="`mailto:${member.email}`">
							{{ member.email }}
						</a>
						<div v-if="member.socials?.length" class="team-social-list mt-2 flex items-center gap-2 border-t border-[#eaebf3] pt-2">
							<span
								v-for="social in member.socials"
								:key="social.name"
								class="group/social relative"
							>
								<a
									class="relative isolate grid h-7 w-7 flex-none place-items-center overflow-hidden rounded-full border border-[#e3e5f1] text-[#555bc4] transition duration-300 hover:text-white hover:shadow-[3px_2px_20px_rgb(0_0_0_/_12%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8184f0] group-hover/social:z-10 group-hover/social:text-white group-focus-within/social:z-10 group-focus-within/social:text-white"
									:href="social.url"
									:aria-label="`${member.name} on ${social.name}`"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span
										class="absolute inset-x-0 bottom-0 z-0 h-0 transition-[height] duration-300 group-hover/social:h-full group-focus-within/social:h-full"
										:class="socialBackgrounds[social.icon]"
										aria-hidden="true"
									></span>
									<svg v-if="social.icon === 'facebook'" class="relative z-10 h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.2H7.6V13h2.7v8h3.1Z" />
									</svg>
									<svg v-else-if="social.icon === 'instagram'" class="relative z-10 h-3.5 w-3.5 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
										<rect x="3" y="3" width="18" height="18" rx="5" stroke-width="1.8" />
										<circle cx="12" cy="12" r="4" stroke-width="1.8" />
										<circle cx="17.5" cy="6.8" r="1" class="fill-current stroke-none" />
									</svg>
									<svg v-else class="relative z-10 h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.7 5.6 22H2.4l7.3-8.4L1.9 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
									</svg>
								</a>
								<span
									class="invisible absolute bottom-[calc(100%+8px)] left-1/2 z-20 -translate-x-1/2 translate-y-1 rounded px-2 py-1 text-[11px] text-white opacity-0 transition duration-200 group-hover/social:visible group-hover/social:translate-y-0 group-hover/social:opacity-100 group-focus-within/social:visible group-focus-within/social:translate-y-0 group-focus-within/social:opacity-100"
									:class="socialBackgrounds[social.icon]"
									aria-hidden="true"
								>{{ social.name }}</span>
							</span>
						</div>
					</div>
				</article>
			</div>
			<p class="mb-0 mt-8 max-w-[970px] border-l-2 border-[#777be4] pl-5 text-sm leading-[1.9] text-[#646a80]">
				After introducing the selected team members, we want to take a moment to acknowledge and express our gratitude to all individuals who contribute to our company’s success behind the scenes. While not listed here, their dedication, hard work, and expertise are fundamental to our achievements. Together, we form a dynamic team driving innovation and excellence in everything we do.
			</p>
		</div>
	</section>
</template>