module.exports = {
  purge: [],
  // darkMode: or 'media' or 'class'
  darkMode: "media",
  theme: {
    extend: {
      gridTemplateColumns: {
        // For forms (labels to the left, inputs to the right)
        "2-fit-left": "max-content 1fr",
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
