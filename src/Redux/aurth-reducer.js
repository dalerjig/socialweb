const SET_USER_DATA = "SET_USER_DATA"


let initialState = {// берем из апи /auth
    userId: null,
    email: null,
    login: null,
    isAuth:false, //
    isFetching: false

}


const authReducer = (state = initialState, action) => {
//debugger
    switch (action.type) {
        case SET_USER_DATA: {

            return {
                ...state,
                ...action.data, //склеим userId, email,login в один объект data, который перезатрет state
                isAuth:true// если пришли данные с апи, значит залогинен
            }
        }

        
        default: return state;
    }
}
export default authReducer;


export const setAuthUserData = (userId, email,login) => ({ type: SET_USER_DATA, data:{userId, email,login}})
// data={userId:x,email:y,login:z} можно и так передавать в экшнкреатор