/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}", './node_modules/tw-elements/dist/js/**/*.js'],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar-hide'),
        require('tw-elements/dist/plugin')

    ],
}