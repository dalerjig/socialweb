
import contentReducer, { addPostActionCreator, deletePost } from "./content-reducer";

let state = {
    PostData: [
        { id: 0, message: "Hi! How are you?", LikesCount: 13 },
        { id: 1, message: "It is my first post!", LikesCount: 26 },
    ]

}

// test('new post added test',()=>{
//     let action =addPostActionCreator('postik')
//     let newState=contentReducer(state,action)
//    expect(newState.PostData.length).toBe(3)// но лучше делать 1 експект в одном тесте
//    expect(newState.PostData[2].message).toBe('postik')
// })


// //напишем тест на еще не существующую логику
// // и только потом deletepost напишем в редюсере
// test('length after deleting pose decremented',()=>{
// let action=deletePost(1)
// let newState=contentReducer(state,action)
// expect(newState.PostData.length).toBe(1)
// })
