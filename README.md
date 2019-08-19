# vue-function-api-extra

Providing plugin and helper functions for [vue-function-api](https://github.com/vuejs/vue-function-api), so that we can use vue-route, vuex, helpers in prototype ...

```js

import { useGetters } from 'vue-function-api-extra'
import {
    value,
} from 'vue-function-api'

export default {
    setup(props, context){
        
        const getters = useGetters(context, ['userInfo', 'otherGetter'])
        
        // use route
        const route = context.route
        const id = value(route.params.id)
        const goBack = () => {
            context.router.goBack()
        }
        
        // use store
        const store = context.store
        
        // use properties
        // if you run "Vue.prototype.$isAndroid = true" before
        const isAndroid = context.isAndroid
        
        
        return {
            ...getters,
            id,
            goBack,
        }
    }
    
}

```

# install

```
yarn add vue-function-api-extra
```

or

```
npm install vue-function-api-extra --save
```

# Install Plugin

First you should install the plugins.

**Notice: You should install the plugin before other plugins installed**

```js

import Vue from 'vue'
import { plugin } from 'vue-function-api-extra'

Vue.use(plugin)

// use other plugins

```

# Use properties in context

```js
export default {
    setup(props, context){
        
        // use route
        const route = context.route
        
        // use store
        const store = context.store
        
        // use properties
        // if you run "Vue.prototype.$isAndroid = true" before
        const isAndroid = context.isAndroid
        
        return {
            ...getters
        }
    }
    
}
```


# Helpers

## useGetters

### description
 
use Getters in Vuex

### params

#### context

**description:** Setup Context in ```vue-function-api``` 

**type:** SetupContext


#### getters

**description** names of getters

**type:** string[]

### example

```js
import { useGetters } from 'vue-function-api-extra'

export default {
    setup(props, context){
        
        const getters = useGetters(context, ['userInfo', 'otherGetter'])

        return {
            ...getters
        }
    }
    
}
```
