<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import gratechLogo from '../images/gratech-company-logo.png'

const menuOpen = ref(false)
const route = useRoute()

const links = [
	{ label: 'Home', to: '/', name: 'home' },
	{ label: 'About Us', to: '/about-us', name: 'about' },
	{ label: 'Our Services', to: '/our-services', name: 'services' },
	{ label: 'Our Clients', to: '/clients', name: 'clients' },
	{ label: 'Testimonials', to: '/testimonials', name: 'testimonials' },
	{ label: 'Contact Us', to: '/contact-us', name: 'contact' },
]

watch(() => route.fullPath, () => {
	menuOpen.value = false
})
</script>

<template>
	<header class="sticky top-0 z-10 bg-white font-[Avenir_Next,Avenir,Segoe_UI,sans-serif] text-[#080a12] shadow-[0_1px_0_rgb(13_18_56_/_12%)] transition-shadow duration-300 hover:shadow-none motion-reduce:transition-none">
		<div class="bg-[#0d1238] text-xs tracking-[0.04em] text-white max-[480px]:text-[10px]">
			<div class="mx-auto flex min-h-[34px] w-[calc(100%_-_48px)] max-w-[1240px] items-center justify-between gap-4 max-[980px]:w-[calc(100%_-_36px)] max-[480px]:min-h-8 max-[480px]:w-[calc(100%_-_28px)]">
				<span>Gratech Company-Tanzania</span>
				<RouterLink class="text-white no-underline transition-opacity duration-200 hover:opacity-75 motion-reduce:transition-none" to="/contact-us">Let’s talk</RouterLink>
			</div>
		</div>

		<div class="mx-auto flex min-h-[82px] w-[calc(100%_-_48px)] max-w-[1240px] items-center justify-between gap-7 max-[980px]:min-h-[72px] max-[980px]:w-[calc(100%_-_36px)] max-[480px]:w-[calc(100%_-_28px)]">
			<RouterLink class="inline-flex flex-none items-center text-inherit no-underline" to="/" aria-label="Gratech home">
				<img class="block h-14 w-14 object-contain transition-transform duration-300 hover:scale-[1.04] motion-reduce:transition-none max-[480px]:h-12 max-[480px]:w-12" :src="gratechLogo" alt="GRATECH" />
			</RouterLink>

			<button
				class="group hidden h-12 w-12 flex-none cursor-pointer rounded bg-white p-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d1238] motion-reduce:transition-none max-[980px]:block"
				type="button"
				:aria-expanded="menuOpen"
				aria-controls="primary-navigation"
				:aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
				:data-menu-open="menuOpen"
				@click="menuOpen = !menuOpen"
			>
				<span class="my-1 block h-[3px] rounded-full bg-[#0d1238] transition-transform duration-200 motion-reduce:transition-none group-data-[menu-open=true]:translate-y-[6px] group-data-[menu-open=true]:rotate-45"></span>
				<span class="my-1 block h-[3px] rounded-full bg-[#0d1238] transition-[opacity,transform] duration-200 motion-reduce:transition-none group-data-[menu-open=true]:scale-x-0 group-data-[menu-open=true]:opacity-0"></span>
				<span class="my-1 block h-[3px] rounded-full bg-[#0d1238] transition-transform duration-200 motion-reduce:transition-none group-data-[menu-open=true]:-translate-y-[6px] group-data-[menu-open=true]:-rotate-45"></span>
			</button>

			<nav
				id="primary-navigation"
				class="flex items-center justify-end gap-[clamp(14px,2vw,28px)] max-[980px]:absolute max-[980px]:top-full max-[980px]:right-0 max-[980px]:left-0 max-[980px]:z-20 max-[980px]:flex-col max-[980px]:items-stretch max-[980px]:gap-0 max-[980px]:bg-white max-[980px]:px-[18px] max-[980px]:pt-2 max-[980px]:pb-4 max-[980px]:shadow-[0_12px_18px_rgb(13_18_56_/_12%)] max-[980px]:transition-transform max-[980px]:duration-300 max-[980px]:ease-out motion-reduce:transition-none max-[980px]:data-[menu-open=true]:visible max-[980px]:data-[menu-open=true]:translate-y-0 max-[980px]:data-[menu-open=true]:pointer-events-auto max-[980px]:data-[menu-open=false]:invisible max-[980px]:data-[menu-open=false]:-translate-y-2 max-[980px]:data-[menu-open=false]:pointer-events-none"
				:data-menu-open="menuOpen"
				aria-label="Main navigation"
			>
				<RouterLink
					v-for="link in links"
					:key="link.name"
					:to="link.to"
					:class="[
						'group relative whitespace-nowrap transition-[color,background-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d1238] motion-reduce:transition-none',
						link.name === 'contact'
							? 'rounded bg-[#080a12] px-[17px] py-3 text-[13px] font-semibold text-white hover:bg-[#0d1238] max-[980px]:mt-3 max-[980px]:self-start max-[980px]:px-[15px] max-[980px]:py-[11px]'
							: 'px-0 py-[10px] text-[13px] font-semibold text-[#252735] hover:text-[#0d1238] max-[980px]:px-1 max-[980px]:py-[13px] max-[980px]:text-sm',
						{ 'text-[#0d1238]': route.name === link.name && link.name !== 'contact' },
						{ 'bg-[#0d1238]': route.name === link.name && link.name === 'contact' },
					]"
					:aria-current="route.name === link.name ? 'page' : undefined"
					@click="menuOpen = false"
				>
					<span>{{ link.label }}</span>
					<span
						v-if="link.name !== 'contact'"
						:class="[
							'absolute right-0 bottom-[3px] left-0 h-0.5 origin-left scale-x-0 bg-[#0d1238] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none max-[980px]:right-auto max-[980px]:bottom-[9px] max-[980px]:w-6',
							{ 'scale-x-100': route.name === link.name },
						]"
					></span>
				</RouterLink>
			</nav>
		</div>
	</header>
</template>
