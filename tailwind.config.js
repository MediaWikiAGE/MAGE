module.exports = {
  purge: [],
  // darkMode: or 'media' or 'class'
  darkMode: "media",
  theme: {
    extend: {
      gridTemplateColumns: {
        // For forms (labels to the left, inputs to the right)
        "2-fit-left": "max-content 1fr",
      },
      gridRowEnd: {
        '8': '8',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
