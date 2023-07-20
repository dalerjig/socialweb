

import { getAuthUserDataThunk } from "./aurth-reducer";



const INITIALAIZED_SUCCESS = "INITIALAIZED_SUCCESS"

export type InitialStateType={
    initialized:boolean
}

let initialState:InitialStateType = {
    initialized: false

}


const appReducer = (state = initialState, action:any):InitialStateType => {
//debugger
    switch (action.type) {
        case INITIALAIZED_SUCCESS: {

            return {
                ...state,
                initialized: true
            }
        }

        
        default: return state;
    }
}
export default appReducer;

type InitializedSuccessActionType={
    type:typeof INITIALAIZED_SUCCESS
}

export const initialaizedSucces = ():InitializedSuccessActionType => ({ type: INITIALAIZED_SUCCESS})


export const initialaizeAppThunk =()=> (dispatch:any) => { 
 let promise= dispatch(getAuthUserDataThunk())
//  dispatch(smth)это все ассинхронно выполняетс.
//  dispatch(smth2) поэтому в getAuthUserDataThunk важен return и  дожидаемся выполнения
// всех диспатчей и чтобы только после них(а особенно после getAuthUserDataThunk ) перед строкой кода ниже
 //promise.then(()=>dispatch(initialaizedSucces()))
 //а если много промисов
 Promise.all([promise]).then(()=>{dispatch(initialaizedSucces())})
}
