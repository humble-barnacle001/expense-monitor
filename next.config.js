module.exports = {
    // TODO: enable webpack5 for next@v11+
    webpack5: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
};
