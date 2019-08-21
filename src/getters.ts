import {
    computed, SetupContext,
} from 'vue-function-api'
import {AnyObject} from "vue-function-api/dist/types/basic";

/**
 * helper function to use vuex getters
 * @param context
 * @param getters Name array of getters.
 */
export function useGetters(context: SetupContext, getters: string[]) {
    const computedObject: AnyObject = {}
    getters.forEach((key) => {
        computedObject[key] = computed(() => context.store.getters[key])
    })
    return computedObject
}
