/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003F5C",
        accent: "#2C9C7A",
        highlight: "#B0413E",
        neutralLight: "#F4F6F8",
        neutralDark: "#3D4752"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    }
  },
  plugins: [],
}
