<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import GlobalTopHeader from './components/header/globaltopheader.vue'
import PageLoader from './components/PageLoader.vue'
import router from './router'

const isInitialLoading = ref(true)

onMounted(async () => {
	await Promise.all([
		router.isReady(),
		new Promise((resolve) => window.setTimeout(resolve, 3000)),
	])
	isInitialLoading.value = false
})
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