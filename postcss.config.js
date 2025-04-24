const postcssConfig = {
    plugins: {
        'postcss-preset-env': {
            features: { 'nesting-rules': false }
        },
    },
};

export default postcssConfig;