import { profileAPI, usersAPI } from "../api/api"

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

type PostType = {
    id: number,
    message: String,
    LikesCount: number
}

type ContactsType={
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}

type PhotosType={
    small:string|null,
    large:string|null
}
type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string, 
    contacts: ContactsType, 
    photos:PhotosType
}
// type StatusType={
//     status:string
// } излишнее

let initialState = {
    PostData: [
        { id: 0, message: "Hi! How are you?", LikesCount: 13 },
        { id: 1, message: "It is my first post!", LikesCount: 26 },
    ] as Array<PostType>,
    profile: null as ProfileType | null, //для пользователей
    status: "",
    newPostText:""
}

export  type InitialStateType=typeof initialState
// reducer должен как и все наши фун-е компоненты быть иммутабельным
// на входе имеет стейт и экшн. стейт меняется==нарушение иммутабельности
// для этого делаем внутри функции локальную копию стейта, в которой будут происходить изменения
// 1) вход-ориг стейт, 2) создание копии стейта(работа с копией) 3) выход-ориг стейт


const contentReducer = (state = initialState, action:any):InitialStateType => {//для начальной компиляции используем начальный стейт

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
                PostData: state.PostData.filter(p => p.id !== action.postId)
            }
        }

        case SET_USER_PROFILE: {

            return { ...state, profile: action.profile }
        }

        case SET_STATUS: {

            return { ...state, status: action.status }
        }

        case SAVE_PHOTO_SUCCESS: {

            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType}
        }
        default: return state;

    }
}
export default contentReducer;


type AddPostActionCreatorActionType={
    type:typeof ADD_POST,
    newPostText:string
}
// export const addPostActionCreator=()=>{
//     return {type:ADD_POST}
//   }
export const addPostActionCreator = (newPostText:string):AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText })
//export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })

type SetUserProfileActionType={
    type:typeof SET_USER_PROFILE,
    profile:ProfileType
}

export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type SetStatusActionType={
    type:typeof SET_STATUS,
    status:string
}

export const setStatus = (status:string):SetStatusActionType => ({ type: SET_STATUS, status })

type DeletePostActionType={
    type: typeof DELETE_POST,
    postId:number
}

export const deletePost = (postId:number):DeletePostActionType => ({ type: DELETE_POST, postId })

export type SavePhotoSuccessActionType={
    type: typeof SAVE_PHOTO_SUCCESS, 
    photos:PhotosType
}

export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })//PHOTOS ИЗ АПИ



// чтобы убрать из компоненты всю логику запросов надо:
// 1)Создать ThunkAC который вернет Thunk функцию, учитывая что она делает асинхронные операции.
// 2)Thunk функция возвращает в виде промиса диспатч, который вызывает либо экшн креатор, либо просто функцию

export const getUserProfileThunk = (userId:number) => {
    return (dispatch:any) => {
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
export const getStatusThunk = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId)

    dispatch(setStatus(response.data))


}

export const updateStatusThunk = (status:string) => {
    return (dispatch:any) => {
        profileAPI.updateStatus(status)
            .then((response) => {
                if (response.data.resultCode === 0) { dispatch(setStatus(status)) }
            })
    }

}
export const savePhotoThunk = (file:any) => async (dispatch:any) => {

    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) dispatch(savePhotoSuccess(response.data.data.photos))//дебаж для правильного пути!!!

}