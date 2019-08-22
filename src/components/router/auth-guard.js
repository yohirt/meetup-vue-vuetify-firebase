import {store} from '../../store/index'
console.log('aut-gurrds');
export default (to,form,next) =>{
    if(store.getters.user){
        next()
    }else{
        next('/signin')
    }
}