module.exports = function override(config, _) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "fs": false,
        "path": require.resolve("path-browserify")
    });
    config.resolve.fallback = fallback;
    return config;
};
