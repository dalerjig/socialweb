import { getAuthUserDataThunk } from "./aurth-reducer";



const INITIALAIZED_SUCCESS = "INITIALAIZED_SUCCESS"


let initialState = {
    initialaized: false

}


const appReducer = (state = initialState, action) => {
//debugger
    switch (action.type) {
        case INITIALAIZED_SUCCESS: {

            return {
                ...state,
                initialaized: true
            }
        }

        
        default: return state;
    }
}
export default appReducer;


export const initialaizedSucces = () => ({ type: INITIALAIZED_SUCCESS})


export const initialaizeAppThunk =()=> (dispatch) => { 
 let promise= dispatch(getAuthUserDataThunk())
//  dispatch(smth)это все ассинхронно выполняетс.
//  dispatch(smth2) поэтому в getAuthUserDataThunk важен return и  дожидаемся выполнения
// всех диспатчей и чтобы только после них(а особенно после getAuthUserDataThunk ) перед строкой кода ниже
 //promise.then(()=>dispatch(initialaizedSucces()))
 
 //а если много промисов
 Promise.all([promise]).then(()=>{dispatch(initialaizedSucces())})
}






//ThunkActionCreator