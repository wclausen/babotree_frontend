const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {"50":"#eef2ff","100":"#e0e7ff","200":"#c7d2fe","300":"#a5b4fc","400":"#818cf8","500":"#6366f1","600":"#4f46e5","700":"#4338ca","800":"#3730a3","900":"#312e81"}
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              // Tailwind utility classes
              '@apply text-3xl font-bold mb-4': {},
            },
            h2: {
              '@apply text-2xl font-semibold mb-3': {},
            },
            p: {
              '@apply text-base mb-2': {},
            },
            // Add more styles as needed
          },
        },
      },
    }
  }
};

module.exports = config;