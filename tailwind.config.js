module.exports = {
  purge: [],
  // darkMode: or 'media' or 'class'
  darkMode: "media",
  theme: {
    extend: {
      gridTemplateColumns: {
        // For the login manager
        "3-border-second": "1fr 1px 1fr",
        "4-border-second": "1fr 1px 1fr 1fr",
      },
      gridRowEnd: {
        "8": "8",
        "9": "9",
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
