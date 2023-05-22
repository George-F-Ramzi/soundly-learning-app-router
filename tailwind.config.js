/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient1: "linear-gradient(to right,#06ff3d , #2bffcc)",
        upload:
          "url(https://res.cloudinary.com/dwnvkwrox/image/upload/v1680784793/sideUpload_al8lws.png)",
      },

      screens: {
        desktop: { max: "1160px" },
        "desktop-min": { min: "1160px" },
        tablet: { max: "744px" },
        phone: { max: "430px" },
      },
      gridTemplateColumns: {
        cards: "repeat(auto-fit, minmax(288px, 1fr));",
      },
    },
  },
  plugins: [],
};
