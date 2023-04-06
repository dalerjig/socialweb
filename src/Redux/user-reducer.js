const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS='SET_USERS'

let initialState = {
    users: [
    ]

}

const usersReducer = (state = initialState, action) => {
 
    switch (action.type){
        
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId){
                        return { ...u, followed: true }
                    }
                    return u
                })
        }
        // returnим копированный сетйт(...стейт), в котором в более глубоко скопированном массиве users
        // мапимся и если id стейта == id который придет из экшна, 
        //то меняем значение фолловед(при условии что сработал action.type, естественно)
    
        case UNFOLLOW: 
    return {
        ...state,
        users: state.users.map(u => {
            if (u.id === action.userId) {
                return { ...u, followed: false }
            }
            return u

        })
    
}
        case SET_USERS:{
            return {...state, users:[...state.users,...action.users]}
            //копируем стейт, далее копируем более глубоко и в конец массива вставляем нового пользователя из экшна
        }
        default:
                return state
    }
}


export default usersReducer;
export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unFollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET_USERS, users })





