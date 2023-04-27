import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";


const SET_USER_DATA = "SET_USER_DATA"


let initialState = {// берем из апи /auth
    userId: null,
    email: null,
    login: null,
    isAuth:false, 
    isFetching: false

}


const authReducer = (state = initialState, action) => {
//debugger
    switch (action.type) {
        case SET_USER_DATA: {

            return {
                ...state,
                ...action.payload, //склеим userId, email,login в один объект data, который перезатрет state
                //isAuth:true// если пришли данные с апи, значит залогинен
            }
        }

        
        default: return state;
    }
}
export default authReducer;


export const setAuthUserData = (userId, email,login, isAuth) => ({ type: SET_USER_DATA, payload:{userId, email,login,isAuth}})
// data={userId:x,email:y,login:z} можно и так передавать в экшнкреатор

export const getAuthUserDataThunk = () => { 
    return (dispatch)=>{    
    authAPI.me()
    .then((response) => {
      if(response.data.resultCode===0){//resultCode=0 в докмуентации ==залогинен
        let{id,login,email}=response.data.data// тут id(не userId)ибо в дата на апи именно id
          dispatch(setAuthUserData(id,login,email,true))// первая data-в то что упаковывает аксиос, вторая data-разраб бэка сделал на апи
      }
    });
    }
}

export const loginThunk = (email,password,rememberMe) => { 
    return (dispatch)=>{    
    authAPI.login(email,password,rememberMe)
    .then((response) => {
      if(response.data.resultCode===0){
        dispatch(getAuthUserDataThunk())//после того как залогинился, верни инфу me
      } else 
      {
        let message=response.data.messages.length>0 ? response.data.messages[0]: "some error"
        let action=stopSubmit('login',{_error:message})//прекрати сабмитить форму Логин
        // _error -общая ошибка для всей формы. вместо него можно написать email/remeberMe/password
        dispatch(action)
      }
    });
    }
}

export const logoutThunk = () => { 
    return (dispatch)=>{    
    authAPI.logout()
    .then((response) => {
      if(response.data.resultCode===0){
        dispatch(setAuthUserData(null,null,null,false))
      }
    });
    }
}

//ThunkActionCreator