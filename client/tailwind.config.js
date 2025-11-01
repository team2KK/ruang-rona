/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Palet warna calm & menenangkan untuk Ruang Rona
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                pastel: {
                    blue: '#B4D4FF',
                    mint: '#B8E6D5',
                    peach: '#FFD4B2',
                    lavender: '#D4BEF7',
                    pink: '#FFD1DC',
                },
                calm: {
                    bg: '#F8FAFC',
                    text: '#334155',
                    muted: '#64748B',
                }
            },
            fontFamily: {
                sans: ['Poppins', 'Nunito', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

