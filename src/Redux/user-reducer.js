const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS='SET_USERS'
const SET_CURRENT_PAGE='SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT='SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS='TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [],
    totalUsersCount:0,
    pageSize:5,
    currentPage:1, //текущая выбранная страница
    isFetching: true, //получены данные или нет
    followingInProgress:false//для отсечения многкратных нажати и запросов
  
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
            return {...state, users:[...action.users]}
            //копируем стейт, далее копируем более глубоко и в конец массива вставляем нового пользователяv из экшна
        }

        case SET_CURRENT_PAGE:{
            return {...state, currentPage:action.currentPage}
            
        }
        case SET_TOTAL_USERS_COUNT:{
            return {...state, totalUsersCount:action.count}
            
        }
        
        case TOGGLE_IS_FETCHING:{
            return {...state, isFetching:action.isFetching}
        }
        
        case TOGGLE_IS_FOLLOWING_PROGRESS:{
           
            return {...state, followingInProgress:action.isFetching}
            
        }

        default:
                return state
    }
}


export default usersReducer;

export const follow = (userId) => ({ type: FOLLOW, userId })
export const unFollow = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count:totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsFollowingProgress = (isFetching) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching })


//!!!type: SET_CURRENT_PAGE, currentPage === type: SET_CURRENT_PAGE, currentPage:currentPage




