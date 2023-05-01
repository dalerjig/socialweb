// при добавлении логики в селекторы, например фильтрацию массива и тд, будет происходить перерендер всей компоненты, где этот селектор используется.
// решается реселектором, в будущем хуком юзСелектор

import { createSelector } from "reselect"

export const getUsersSelector=(state)=>{
    return state.usersPage.users
}

// реселектор имеет логику работы. Для примера у нас филтер(который всегда возвращает новый массив)
// при изменении стейта, нужно зафиксировать результат выполнения селектора(мемоизировать, кешировать)
// и перерисовать только если изменилась опр часть стейта


//ЕСЛИ СТЕЙТ НЕ ИЗМЕНИЛСЯ, РЕСЕЛЕКТ НЕ СДЕЛАЕТ РЕРЕНДЕР
export const getUsers=createSelector(getUsersSelector, 
    (users)=>{return users.filter(u=>true)} )
  



export const getPageSize=(state)=>{
    return state.usersPage.pageSize
}
export const getTotalUsersCount=(state)=>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage=(state)=>{
    return state.usersPage.currentPage
}
export const getIsFetching=(state)=>{
    return state.usersPage.isFetching
}
export const getFollowingProgress=(state)=>{
    return state.usersPage.followingInProgress
}