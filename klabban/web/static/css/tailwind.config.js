/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["../../templates/**/*.html"],
    theme: {
        extend: {
            colors: {
                'nurse': 'var(--color-nurse)',
                'nurse-content': 'var(--color-nurse-content)',
                'urgent': 'var(--color-urgent)',
                'urgent-content': 'var(--color-urgent-content)',
            },
        },
    },
  }