module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        fiat: {
          cyan: 'var(--cyan-500)',
          gray: 'var(--fiat-gray)',
          vision: 'var(--vision-orange)',
          novatec: 'var(--novatec-blue)'
        }
      }
    }
  },
  plugins: []
}
