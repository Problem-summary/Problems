import { createState }  from 'redux'
import rootReducer from '../reducers'



export default function configureStore(initialState){
    const store = createStore(rootReducer,initialState)

    if(module.hot){
        ........
    }

    return store
}