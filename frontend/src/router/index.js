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
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'GRATECH Company | Technology Solutions in Tanzania',
        description: 'GRATECH Company provides reliable IT support, hardware, software, networking, and digital solutions for organizations across Tanzania.',
      },
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutUs,
      meta: {
        title: 'About Us | GRATECH Company',
        description: 'Learn about GRATECH Company and our people, mission, and approach to technology solutions in Tanzania.',
      },
    },
    {
      path: '/contact-us',
      name: 'contact',
      component: ContactUs,
      meta: {
        title: 'Contact Us | GRATECH Company',
        description: 'Contact GRATECH Company in Morogoro, Tanzania, for IT support, hardware, software, networking, and digital solutions.',
      },
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      component: Testimonials,
      meta: {
        title: 'Testimonials | GRATECH Company',
        description: 'Read what GRATECH Company clients say about our technology products and services.',
      },
    },
    {
      path: '/our-services',
      name: 'services',
      component: OurServices,
      meta: {
        title: 'IT Services | GRATECH Company',
        description: 'Explore GRATECH Company IT support, networking, software, and technology services for organizations in Tanzania.',
      },
    },
    {
      path: '/clients',
      name: 'clients',
      component: OurClients,
      meta: {
        title: 'Our Clients | GRATECH Company',
        description: 'Meet the organizations GRATECH Company supports with technology solutions and dependable service.',
      },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
