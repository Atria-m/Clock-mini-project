/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        skyStart: "#e0f7fa",
        skyMid: "#81d4fa",
        skyEnd: "#4fc3f7",
        skyDeep: "#0288d1",
        meshWhite: "#ffffff",

        darkSkyStart: "#0d1b2a",
        darkSkyMid: "#1b3b5a",
        darkSkyEnd: "#27496d",
        darkSkyDeep: "#122e4a",
        darkMeshBlack: "#000000",
        darkMeshWhite: "#e0e6f1",
      },
    },
    screens: {
      mobile: "360px",
      desktop: "1000px",
    },
  },
  plugins: [],
};
