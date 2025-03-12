module.exports = {
  reactStrictMode: false,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = {
  testEnvironment: "jsdom",
};
