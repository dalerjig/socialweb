const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

let initialState = {
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

const dialogsReducer = (state = initialState, action) => {
    //важно сначала передать стейт а потом уже экшн

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body//получаем сообщение в стейт
            return state

        case SEND_MESSAGE:

            let body = state.newMessageBody
            state.MessageData.push({ id: 5, message: body })
            state.newMessageBody = ''
            return state

        default:
            return state //вместо брейка в каждом кейсе, в случае, если ни один экшн не отработал
    }

}

export default dialogsReducer;

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyActionCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: body })

