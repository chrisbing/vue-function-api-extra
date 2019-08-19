import typescript from 'rollup-plugin-typescript';

const generateConfig = (format, filename) => {
    return {
        input: 'src/index.ts',
        output: {
            file: `dist/${filename}`,
            format: format,
            name: 'VueFunctionApiExtra',
        },
        plugins: [
            typescript()
        ]
    }
}

module.exports = [
    generateConfig('umd', 'vue-function-api-extra.js'),
    generateConfig('cjs', 'vue-function-api-extra.common.js'),
    generateConfig('esm', 'vue-function-api-extra.esm.js')
]
