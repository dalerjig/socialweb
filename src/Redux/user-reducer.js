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
    followingInProgress:[]//для отсечения многкратных нажатий и запросов. будем помещать в массив id пользователя, чтобы disabled был именно на его кнопке
  
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
           
            return {
                ...state, 

                followingInProgress: action.isFetching?//тк массив, делаем глубокое копирование, фильтруем ,пропуская все id кроме той
                [...state.followingInProgress, action.userId]://если в экш упал тру, то помести userId в массивв стейте (ЧТОБЫ У НЕГО СТАЛА КНОПКА НЕ АКТИВНА)           
                state.followingInProgress.filter(id=>id!==action.userId)// если экшн вернул фалсе-помести всех кроме того, у кого тру()
                // ИБО ВСЕ С ФАЛСЕ БУДУТ ИМЕТЬ АКТИВНЫЕ!!!!!!! КНОПКИ  P.S(ФИЛЬТР И ТАК ВЕРНЕТ НОВЫЙ МАССИВ, НАМ НЕ НАДО ДЕЛАТЬ ГЛУБОКОЕ КОПИРОВАНИЕ)
            }
                                                                                                
            
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
export const toggleIsFollowingProgress = (isFetching,userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching,userId })


//!!!type: SET_CURRENT_PAGE, currentPage === type: SET_CURRENT_PAGE, currentPage:currentPage




