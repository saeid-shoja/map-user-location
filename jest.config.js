module.exports = async () => {
  return {
    verbose: true,
    moduleNameMapper: {
      "react-leaflet": "<rootDir>/node_modules/react-leaflet/lib/index.js",
    },
  };
};
