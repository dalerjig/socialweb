export const required=(value)=>{// обязательное поле
    if (value) return undefined//если не пустая строка
    return "Field is required"
}


// теперь в филд можно передать maxLengthCreator(n)
// чтобы при изменении длины(разработчиком) не менять кучу кода.
export const maxLengthCreator=(maxLength)=>(value)=>{
    
    if (value.length>maxLength ) return `Max length is ${maxLength}`
    return undefined
}
// ` ` только такие преобразовывают maxLength в число и позволяю вывести его не как [object,object]
//валидация-проверка данных о данных
//meta -данные о данных!