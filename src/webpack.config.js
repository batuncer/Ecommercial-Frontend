resolve: {
    fallback: {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "querystring": require.resolve("querystring-es3"),
        "url": require.resolve("url/"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "path": require.resolve("path-browserify")
    }
}
