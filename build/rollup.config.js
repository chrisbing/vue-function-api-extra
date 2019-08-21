import typescript from 'rollup-plugin-typescript';
import json from 'rollup-plugin-json'

const generateConfig = (format, filename) => {
    return {
        input: 'src/index.ts',
        output: {
            file: `dist/${filename}`,
            format: format,
            name: 'vueFunctionApiExtra',
            globals: {
                'vue-function-api': "vueFunctionApi"
            }
        },
        plugins: [
            json(),
            typescript(),
        ],
        external: ['vue-function-api']
    }
}

module.exports = [
    generateConfig('umd', 'vue-function-api-extra.js'),
    generateConfig('cjs', 'vue-function-api-extra.common.js'),
    generateConfig('esm', 'vue-function-api-extra.esm.js')
]
