/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      minHeight: {
        "80p": "80px",
        "350": "350px",
        "80": "80%"
      },
      minWidth: {
        "100": "100px",
        "150": "150px",
        "180": "180px",
        "400": "500px",
        "95": "95%"
      },
      maxWidth: {
        "80": "80%",
        "180": "180px",
        "81rem": "81rem"
      },
      maxHeight: {
        "80p": "80px",
        "270": "270px",
      },
      backgroundColor: {
        "chart": "#1a1e1f",
        "deezer": "#ef5567",
        "deezer-dark": "#a3313e"
      },
      colors: {
        "deezer": "#ef5567",
        "deezer-dark": "#a3313e"
      },
      borderColor: {
        "deezer": "#ef5567",
        "line-section": "#a0a0a021"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss'),
    require('flowbite/plugin'),
    require('autoprefixer')

  ]
}
