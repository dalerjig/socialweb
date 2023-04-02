import contentReducer from "./content-reducer"
import dialogsReducer from "./dialogs-reducer"


let store = {

    _State: {
        profilePage: {
            PostData: [
                { id: 0, message: "Hi! How are you?", LikesCount: 13 },
                { id: 1, message: "It is my first post!", LikesCount: 26 },
            ],
            newPostText: "Halloou"
        },

        dialogPage: {
            DialogData: [
                { id: 1, name: "Daler" },
                { id: 2, name: "July" },
                { id: 3, name: "Polina" },
                { id: 4, name: "Dior" },
            ],

            MessageData: [
                { id: 1, message: "hi" },
                { id: 2, message: "FROOOGS" },
                { id: 3, message: "WHOOOAAAA" },
                { id: 4, message: "4:20" },
            ],
            newMessageBody: ''
        }
    },
    _callSubscriber() {
        console.log('State was changed')
    },


    getState() {
        return this._State
    },
    
    subscribe(observer) {
        this._callSubscriber = observer
    },



    dispatch(action) {//action={type:"ADD-POST"}
        this._State.profilePage = contentReducer(action, this._State.profilePage)//запись в стейт
        this._State.dialogPage = dialogsReducer(action, this._State.dialogPage)//запись в стейт
        this._callSubscriber(this._State)

    }



}







window.sstateee = store//для отображения в консоли. window-глобальный объект
export default store



// S. Принцип единственной ответственности(Single responsibility)
// O. Принцип открытости/закрытости (Open-closed)
// L. Принцип подстановки Барбары Лисков (Liskov substitution)
// I. Принцип разделения интерфейса (Interface segregation)
// D. Принцип инверсии зависимостей (Dependency Invertion)