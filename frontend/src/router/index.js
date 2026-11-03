import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent, h } from 'vue'
import Home from '../components/home.vue'
import AboutUs from '../components/aboutUs.vue'
import OurServices from '../components/ourservices.vue'
import OurClients from '../components/ourclients.vue'
import ContactUs from '../components/contactUs.vue'
import Testimonials from '../components/testmonials.vue'

const sectionView = (title) => defineComponent({
  name: `${title.replace(/\s+/g, '')}Page`,
  setup() {
    return () => h('main', { class: 'route-placeholder' }, [h('h1', title)])
  },
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about-us', name: 'about', component: AboutUs },
    { path: '/contact-us', name: 'contact', component: ContactUs },
    { path: '/testimonials', name: 'testimonials', component: Testimonials },
    { path: '/our-services', name: 'services', component: OurServices },
    { path: '/clients', name: 'clients', component: OurClients },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
