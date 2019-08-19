import {PluginObject, VueConstructor} from "vue"
import {Vue} from "vue/types/vue";

declare module 'vue-function-api' {
    interface SetupContext {
        [key:string]: any,
    }
}

let curVue: VueConstructor | null = null
const DEFAULT_EXTRA_KEYS = ['router', 'route']


export interface PluginOptions {
    extraKeys?: string[],
}



export const plugin: PluginObject<PluginOptions> = {
    install(Vue, options = {}) {
        if (curVue) {
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn('Vue function api helper init duplicated !')
            }
        }
        const pureVueProtoKeys = Object.keys(Vue.prototype)
        const pureVm = Object.keys(new Vue())

        const extraKeys = (options.extraKeys || []).concat(DEFAULT_EXTRA_KEYS)

        function wrapperSetup(this: Vue) {
            let vm = this
            let $options = vm.$options
            let setup = $options.setup
            if (!setup) {
                return
            }
            if (typeof setup !== 'function') {
                // eslint-disable-next-line no-console
                console.warn('The "setup" option should be a function that returns a object in component definitions.', vm)
                return
            }
            // wapper the setup option, so that we can use prototype properties and mixin properties in context
            $options.setup = function wrappedSetup(props, ctx) {
                // to extend context
                Object.keys(vm)
                    .filter(x => /^\$/.test(x) && pureVm.indexOf(x) === -1)
                    .forEach((x) => {
                        // @ts-ignore
                        ctx[x.replace(/^\$/, '')] = vm[x]
                    })
                Object.keys(vm.$root.constructor.prototype)
                    .filter(x => /^\$/.test(x) && pureVueProtoKeys.indexOf(x) === -1)
                    .forEach((x) => {
                        // @ts-ignore
                        ctx[x.replace(/^\$/, '')] = vm[x]
                    })
                // to extend context with router properties
                extraKeys.forEach((key) => {
                    // @ts-ignore
                    let value = vm['$' + key]
                    if (value) {
                        ctx[key] = value
                    }
                })
                // @ts-ignore
                return setup(props, ctx)
            }
        }

        Vue.mixin({
            beforeCreate: wrapperSetup,

        })
    },
}
