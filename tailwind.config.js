/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        inhaDeepBlue: "#005BAC",
        inhaSkyBlue: "#00AFEC",
        kakao: "#FEE500",
      },
    },
  },
  plugins: [],
};
