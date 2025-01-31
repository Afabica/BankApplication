// next.config.js
module.exports = {
  reactStrictMode: false, // Disable React Strict Mode (optional, depending on your needs)
  webpack: (config) => {
    config.cache = false; // Disable Webpack caching
    return config;
  },
};

module.exports = {
    testEnvironment: "jsdom",
};
//module.exports = {
//    devIndicators: {
//        autoPrerender: false,
//    },
//    webpak(config, {dev}) {
//        if(dev) {
//        config.devServer = {
//            https: {
//                key: ffs.readFileSync(path.join(__dirname, 'private.key')),
//                cert: fs.readFileSync(path.join(__dirname, 'cert.crt')),
//            },
//            host: 'localhost',
//            port: 3000,
//        };
//        }
//    }
//}
