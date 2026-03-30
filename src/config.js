export const STARTERS = {
  "vue-primevue": {
    repo: "atlaxt/starter-vue-primevue",
    stack: "Vue · PrimeVue",
  },
  "vue-nuxtui": { repo: "atlaxt/starter-vue-nuxtui", stack: "Vue · NuxtUI" },
  "nuxt-primevue": {
    repo: "atlaxt/starter-nuxt-primevue",
    stack: "Nuxt · PrimeVue",
  },
  "nuxt-nuxtui": { repo: "atlaxt/starter-nuxt-nuxtui", stack: "Nuxt · NuxtUI" },
};

export function getStarter(framework, ui) {
  return STARTERS[`${framework}-${ui}`];
}
