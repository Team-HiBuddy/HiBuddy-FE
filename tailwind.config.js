/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        inhaDeepBlue: "#005BAC",
        inhaSkyBlue: "#00AFEC",
        kakao: "#FEE500",
        red: "#FC5555",
      },
      keyframes: {
        pop: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        pop: "pop 0.2s ease-in-out",
      },
    },
  },
  plugins: [],
};
