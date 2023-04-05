const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

let initialState = {
    PostData: [
        { id: 0, message: "Hi! How are you?", LikesCount: 13 },
        { id: 1, message: "It is my first post!", LikesCount: 26 },
    ],
    newPostText: ""
}

// reducer должен как и все наши фун-е компоненты быть иммутабельным
// на входе имеет стейт и экшн. стейт меняется==нарушение иммутабельности
// для этого делаем внутри функции локальную копию стейта, в которой будут происходить изменения
// 1) вход-ориг стейт, 2) создание копии стейта(работа с копией) 3) выход-ориг стейт


const contentReducer = (state = initialState, action) => {//для начальной компиляции используем начальный стейт

    if (action.type === ADD_POST) {

        let newPost = { id: 5, message: state.newPostText, LikesCount: 0 }
        return {
            ...state,
            PostData: [...state.PostData, newPost],
            newPostText: ''
        }
        //stateCopy.PostData=[...state.PostData]//делаем глубокую копию массива==объекта
        //stateCopy.PostData.push(newPost)
        //stateCopy.newPostText = ''
        //eturn stateCopy
    }
    else if (action.type === UPDATE_NEW_POST_TEXT) {
        let stateCopy = {
            ...state,
            newPostText: action.newText
        }// копируем только то что нужно
        //stateCopy.newPostText = action.newText//ибо UpdateNewPostText(newText)
        return stateCopy;
    }
    return state;
}

export default contentReducer;

// export const addPostActionCreator=()=>{
//     return {type:ADD_POST}
//   }
export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })