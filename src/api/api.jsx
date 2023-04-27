import axios from "axios";

//let baseUrl='https://social-network.samuraijs.com/api/1.0'

//в delete with credenTional обязательно 2 объектом как и в get!!!
// в .post with credenTional обязательно 3-им объектом!!!(второй пусто {})
//create сам сделаем его третьим а не вторым!


// users?page=${currentPage}&count=${pageSize} это QuerryParametrs и цепляются через знак вопроса
// 'profile/status/'+userId а это URI Parameters(см в доку АПИ)

//get, delete могут только брать инфу с сервера отправляя url
//post и put могу отправить на серв объект

const instance = axios.create({
  //сущность, чтобы убрать повтор кода
  withCredentials: true, 
  baseURL: "https://social-network.samuraijs.com/api/1.0/", //важно что тут URL большие
  headers: { "API-KEY": "de5234cd-cc5c-4c5e-80ce-65cf4e8fd211" }, //
});


export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    //засунули все в объект(сделали методом), чтобы потом в разны частях вызывать так: usersAPI/followAPI.getSMTH
    return instance
      .get(
        `users?page=${currentPage}&count=${pageSize}`
        // {withCredentials:true}//убираем из за create(она сама это сделает)
      )
      .then((response) => {
        return response.data;
      }); //отсекаем все, что приходитв респонс кроме того что нам нужно(в апи это  data а в data -items)//это промис!
  },

  follow(u) {//
    
    return instance // postим в API подписоту на чела
      .post(`follow/` + u);
  },

  unFollow(u) {
    return instance
    .delete( `follow/` +u ) // deleteим в API подписоту на чела

  },
  getProfile(userId){
    console.warn("Obsolete method.Please use profileAPI")// ибо перенесли в profileAPI, чтобы сразу не искать во всех файлах где обращаемся к usersAPI.getProfile
    return profileAPI.getProfile(userId)
  }
};

export const authAPI={
    me(){ 
        return instance.get(`auth/me`)//get запросы формируеются через querry ?
    },
    login(email,password,rememberMe=false){//так как сюда придут из вне(из ФОРМ нашего)
      return instance.post(`auth/login`,{email,password,rememberMe})//post формируется с передаваемым объектом
  }  , 
    logout(){
      return instance.delete(`auth/login`) 
  }   
   
}


export const profileAPI = {

  getProfile(userId){
    return instance.get( `profile/`+userId )
  },

  getStatus(userId){
    return instance.get('profile/status/'+userId)// получи статус
  },

  //Properties : status: required(string - maxLength: 300) в доке в put
  //в put вторым параметром идет объект, где первый status-наш аргумент, второй из серва
  updateStatus(status){
    return instance.put('profile/status/',{status:status})//put-помести статус
  }

};
