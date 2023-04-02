const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

let initialState = {
    PostData: [
        { id: 0, message: "Hi! How are you?", LikesCount: 13 },
        { id: 1, message: "It is my first post!", LikesCount: 26 },
    ],
    newPostText: "Halloou"
}


const contentReducer = (state=initialState,action) => {//для начальной компиляции используем начальный стейт
    if (action.type === ADD_POST) {
        let newPost = { id: 5, message: state.newPostText, LikesCount: 0 }
        state.PostData.push(newPost)
        state.newPostText = ''
        return state
    }
    else if (action.type === UPDATE_NEW_POST_TEXT) {
        state.newPostText = action.newText//ибо UpdateNewPostText(newText)
        return state;
    }
    return state;
}

export default contentReducer;

// export const addPostActionCreator=()=>{
//     return {type:ADD_POST}
//   }
export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })