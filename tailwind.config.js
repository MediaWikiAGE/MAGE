module.exports = {
  purge: [],
  // darkMode: or 'media' or 'class'
  darkMode: "media",
  theme: {
    extend: {
      gridTemplateColumns: {
        // For the login manager
        "loginview-3": "1fr 1px 1fr",
        "loginview-4": "1fr 1px 1fr 1fr",
        "loginview-outer": "1fr 4fr 1fr",
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
      filter: ["dark"],
      invert: ["dark"],
      contrast: ["dark"],
      ringWidth: ["hover"],
      ringColor: ["dark"],
    },
  },
  plugins: [],
};
