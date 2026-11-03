<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import GlobalTopHeader from './components/header/globaltopheader.vue'
import PageLoader from './components/PageLoader.vue'
import router from './router'

const isInitialLoading = ref(true)

onMounted(async () => {
	await router.isReady()
	isInitialLoading.value = false
})

function updateRouteMetadata(to) {
	const title = to.meta.title || 'GRATECH Company | Technology Solutions in Tanzania'
	const description = to.meta.description
		|| 'GRATECH Company provides reliable IT support, hardware, software, networking, and digital solutions for organizations across Tanzania.'
	const canonicalUrl = new URL(to.path, window.location.origin).href

	document.title = title
	document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
	document.querySelector('meta[name="description"]')?.setAttribute('content', description)
	document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
	document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
	document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
	document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
	document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)
}

updateRouteMetadata(router.currentRoute.value)
router.afterEach(updateRouteMetadata)
</script>

<template>
	<div class="app-shell" :aria-busy="isInitialLoading">
		<GlobalTopHeader />
		<RouterView />
		<Transition name="page-loader">
			<div v-if="isInitialLoading" class="page-loader-overlay">
				<PageLoader />
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.page-loader-overlay {
	position: fixed;
	inset: 0;
	z-index: 1000;
	display: grid;
	place-items: center;
	background: #fff;
}

.page-loader-enter-active,
.page-loader-leave-active {
	transition: opacity 180ms ease;
}

.page-loader-enter-from,
.page-loader-leave-to {
	opacity: 0;
}
</style>