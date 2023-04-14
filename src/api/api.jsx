import axios from "axios"

//let baseUrl='https://social-network.samuraijs.com/api/1.0'

const instance=axios.create({//сущность, чтобы убрать повтор кода
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/', //важно что тут URL большие
    headers:{"API-KEY":"de5234cd-cc5c-4c5e-80ce-65cf4e8fd211"}
})


export const usersAPI={
    getUsers(currentPage=1,pageSize=10){ //засунули все в объект(сделали методом), чтобы потом в разны частях вызывать так: usersAPI/followAPI.getSMTH
        return instance
             .get(`users?page=${currentPage}&count=${pageSize}`,
                  // {withCredentials:true}//убираем из за create(она сама это сделает)
             ).then((response)=>{return response.data})//отсекаем все, что приходитв респонс кроме того что нам нужно(в апи это  data а в data -items)//это промис!
     }
}
