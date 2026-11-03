<script setup>
const socialLinks = [
	{ name: 'Facebook', url: 'https://www.facebook.com/gratechcompany', icon: 'facebook' },
	{ name: 'Instagram', url: 'https://www.instagram.com/gratechcompany', icon: 'instagram' },
	{ name: 'Twitter', url: 'https://www.x.com/gratechcompany', icon: 'x' },
	{ name: 'WhatsApp', url: 'https://wa.me/255710132903', icon: 'whatsapp' },
]
</script>

<template>
	<section class="relative isolate overflow-hidden bg-[#0d1238] py-[72px] font-[Avenir_Next,Avenir,Segoe_UI,sans-serif] text-white max-[700px]:py-[52px]" aria-labelledby="contact-heading">
		<div class="pointer-events-none absolute -right-40 -top-64 -z-10 h-[620px] w-[620px] rounded-full border border-white/10"></div>
		<div class="pointer-events-none absolute -right-12 -top-40 -z-10 h-[420px] w-[420px] rounded-full border border-[#898df3]/20"></div>
		<div class="mx-auto grid w-[calc(100%_-_64px)] max-w-[1240px] grid-cols-[.85fr_1.15fr] gap-16 max-[800px]:grid-cols-1 max-[800px]:gap-10 max-[700px]:w-[calc(100%_-_40px)] max-[400px]:w-[calc(100%_-_32px)]">
			<div>
				<p class="mb-5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#c2c5de]">
					<span class="h-px w-[22px] bg-[#9296ff]" aria-hidden="true"></span>
					Get in touch
				</p>
				<h1 id="contact-heading" class="m-0 text-[clamp(32px,4vw,48px)] font-semibold leading-[.98] tracking-[-.065em]">
					Contact <span class="text-[#a5a8ff]">Gratech.</span>
				</h1>
				<p class="mb-0 mt-7 text-sm font-medium text-white">Feel free to
contact us,  and we will get back to you promptly.</p>
				<p class="mb-0 mt-2 text-sm italic leading-relaxed text-[#c2c5de]">“Think Technology, Choose Us”</p>
			</div>

			<div class="grid grid-cols-2 gap-x-10 gap-y-8 border-t border-white/15 pt-8 max-[560px]:grid-cols-1 max-[560px]:gap-y-6">
				<div>
					<h2 class="mb-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#a5a8ff]">Visit us</h2>
					<a
						class="text-sm leading-[1.9] text-white decoration-white/40 underline-offset-4 transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5a8ff]"
						href="https://www.google.com/maps/search/?api=1&query=Kingo+Street%2C+Morogoro+Town%2C+Tanzania"
						target="_blank"
						rel="noopener noreferrer"
					>
						P.O. Box, Morogoro, Tanzania<br />
						Kingo Street, Morogoro Town
					</a>
				</div>

				<div>
					<h2 class="mb-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#a5a8ff]">Call us</h2>
					<div class="flex flex-col items-start gap-1.5">
						<a class="text-sm text-white underline decoration-white/40 underline-offset-4 transition hover:text-[#c7c9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5a8ff]" href="tel:+255710132903">+255 710 132 903</a>
						<a class="text-sm text-white underline decoration-white/40 underline-offset-4 transition hover:text-[#c7c9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5a8ff]" href="tel:+255752112903">+255 752 112 903</a>
					</div>
				</div>

				<div>
					<h2 class="mb-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#a5a8ff]">Email</h2>
					<a class="text-sm text-white underline decoration-white/40 underline-offset-4 transition hover:text-[#c7c9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5a8ff]" href="mailto:info@gratech.co.tz">info@gratech.co.tz</a>
				</div>

				<div>
					<h2 class="mb-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#a5a8ff]">Website</h2>
					<a class="text-sm text-white underline decoration-white/40 underline-offset-4 transition hover:text-[#c7c9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5a8ff]" href="https://www.gratech.co.tz" target="_blank" rel="noopener noreferrer">www.gratech.co.tz</a>
				</div>

				<div class="col-span-2 max-[560px]:col-span-1">
					<h2 class="mb-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#a5a8ff]">Follow us <span class="ml-1 font-medium normal-case tracking-normal text-[#c2c5de]">@gratechcompany</span></h2>
					<div class="flex items-center gap-2.5">
						<a
							v-for="social in socialLinks"
							:key="social.name"
							class="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#a5a8ff]"
							:href="social.url"
							:aria-label="`Gratech Company on ${social.name}`"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg v-if="social.icon === 'facebook'" class="h-[18px] w-[18px] fill-[#1877f2]" viewBox="0 0 24 24" aria-hidden="true">
								<path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.2H7.6V13h2.7v8h3.1Z" />
							</svg>
							<svg v-else-if="social.icon === 'instagram'" class="h-[18px] w-[18px] fill-none stroke-[#e4405f]" viewBox="0 0 24 24" aria-hidden="true">
								<rect x="3" y="3" width="18" height="18" rx="5" stroke-width="1.8" />
								<circle cx="12" cy="12" r="4" stroke-width="1.8" />
								<circle cx="17.5" cy="6.8" r="1" class="fill-[#e4405f] stroke-none" />
							</svg>
							<svg v-else-if="social.icon === 'whatsapp'" class="h-[19px] w-[19px] fill-[#25d366]" viewBox="0 0 24 24" aria-hidden="true">
								<path d="M12.04 2a9.86 9.86 0 0 0-8.48 14.9L2.2 22l5.24-1.37A9.96 9.96 0 0 0 12.04 22 10 10 0 0 0 12.04 2Zm0 18.2a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.11.81.83-3.03-.2-.31A8.18 8.18 0 1 1 12.04 20.2Zm4.49-6.13c-.25-.12-1.47-.73-1.7-.81-.23-.09-.39-.12-.55.12-.17.25-.64.81-.78.98-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.22-1.46-1.36-1.71-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2.01s.86 2.33.98 2.49c.12.17 1.69 2.58 4.09 3.62.57.25 1.01.4 1.35.51.57.18 1.09.16 1.5.1.46-.07 1.47-.6 1.68-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.17-.47-.29Z" />
							</svg>
							<svg v-else class="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
								<path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.7 5.6 22H2.4l7.3-8.4L1.9 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
