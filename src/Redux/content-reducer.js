import { profileAPI, usersAPI } from "../api/api"

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    PostData: [
        { id: 0, message: "Hi! How are you?", LikesCount: 13 },
        { id: 1, message: "It is my first post!", LikesCount: 26 },
    ],
    // newPostText: "",
    profile: null, //для пользователей
    status: ""
}

// reducer должен как и все наши фун-е компоненты быть иммутабельным
// на входе имеет стейт и экшн. стейт меняется==нарушение иммутабельности
// для этого делаем внутри функции локальную копию стейта, в которой будут происходить изменения
// 1) вход-ориг стейт, 2) создание копии стейта(работа с копией) 3) выход-ориг стейт


const contentReducer = (state = initialState, action) => {//для начальной компиляции используем начальный стейт

    switch (action.type) {
        case ADD_POST: {

            let newPost = {
                id: 5,
                message: action.newPostText, //ибо теперь этот текст не из нашего стейта, а из экшн, а экш берет из редаксФорм Стейта
                LikesCount: 0
            }
            return {
                ...state,
                PostData: [...state.PostData, newPost],
                newPostText: ''
            }
        }
        case DELETE_POST: {

            return {
                ...state,
                PostData: [state.PostData.filter(p => p.id !== action.postId)]
            }
        }

        case SET_USER_PROFILE: {

            return { ...state, profile: action.profile }
        }

        case SET_STATUS: {

            return { ...state, status: action.status }
        }
       
        case SAVE_PHOTO_SUCCESS:{
           
            return {...state, profile:{...state.profile, photos:action.photos}}
        }
        default: return state;
           
    }
}
export default contentReducer;

// export const addPostActionCreator=()=>{
//     return {type:ADD_POST}
//   }
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
//export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })//PHOTOS ИЗ АПИ



// чтобы убрать из компоненты всю логику запросов надо:
// 1)Создать ThunkAC который вернет Thunk функцию, учитывая что она делает асинхронные операции.
// 2)Thunk функция возвращает в виде промиса диспатч, который вызывает либо экшн креатор, либо просто функцию

export const getUserProfileThunk = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then((response) => {
                //debugger //лучше тут дебажить чтобы посмотреть что приходит с сервера. С сервера приходит http-обеъкт+информация о разметке
                dispatch(setUserProfile(response.data));// объект сидит в дата,через дебаг увидели

            });
    }
}

// export const getStatusThunk = (userId) => {
//     return (dispatch) => {
//         profileAPI.getStatus(userId)
//             .then((response)=>{
//                 dispatch(setStatus(response.data))
//             })
// }
// }
//ПИШИ ТЕПЕРЬ ТОЛЬКО ТАААК
export const getStatusThunk = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)

    dispatch(setStatus(response.data))


}

export const updateStatusThunk = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then((response) => {
                if (response.data.resultCode === 0) { dispatch(setStatus(status)) }
            })
    }

}
export const savePhotoThunk = (file)=> async(dispatch)=> {
    
     let response=await profileAPI.savePhoto(file) 
     if (response.data.resultCode === 0) dispatch(savePhotoSuccess(response.data.data.photos))//дебаж для правильного пути!!!
    
}