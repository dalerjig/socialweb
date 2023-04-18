import { usersAPI } from "../api/api"

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SET_USER_PROFILE='SET_USER_PROFILE'

let initialState = {
    PostData: [
        { id: 0, message: "Hi! How are you?", LikesCount: 13 },
        { id: 1, message: "It is my first post!", LikesCount: 26 },
    ],
    newPostText: "",
    profile:null //для пользователей
}

// reducer должен как и все наши фун-е компоненты быть иммутабельным
// на входе имеет стейт и экшн. стейт меняется==нарушение иммутабельности
// для этого делаем внутри функции локальную копию стейта, в которой будут происходить изменения
// 1) вход-ориг стейт, 2) создание копии стейта(работа с копией) 3) выход-ориг стейт


const contentReducer = (state = initialState, action) => {//для начальной компиляции используем начальный стейт

    switch (action.type){
    case ADD_POST: {

        let newPost = { id: 5, message: state.newPostText, LikesCount: 0 }
        return {
            ...state,
            PostData: [...state.PostData, newPost],
            newPostText: ''
        }
    }

    case UPDATE_NEW_POST_TEXT: {
        let stateCopy = {
            ...state,
            newPostText: action.newText
        }
        return stateCopy;
    }
    
    case SET_USER_PROFILE:{
        
        return{...state, profile:action.profile}
    }
    default: return state;
}
}
export default contentReducer;

// export const addPostActionCreator=()=>{
//     return {type:ADD_POST}
//   }
export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile})

export const getUserProfileThunk = (userId) => {
    return (dispatch)=>{
        usersAPI.getProfile(userId)
        .then((response) => {
          //debugger //лучше тут дебажить чтобы посмотреть что приходит с сервера. С сервера приходит http-обеъкт+информация о разметке
          dispatch(setUserProfile(response.data));// объект сидит в дата,через дебаг увидели
         
        });

    }
}