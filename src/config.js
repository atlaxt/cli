export const TEMPLATES = {
  titan: {
    variants: {
      vue: {
        repo: 'atlaxt/titan-vue',
        stack: 'Vue · PrimeVue',
      },
      nuxt: {
        repo: 'atlaxt/titan-nuxt',
        stack: 'Nuxt · PrimeVue',
      },
    },
  },
};

export const TEMPLATE_NAMES = Object.keys(TEMPLATES);

export function getVariants(templateName) {
  return Object.keys(TEMPLATES[templateName].variants);
}

export function getTemplate(templateName, variant) {
  return TEMPLATES[templateName].variants[variant];
}
