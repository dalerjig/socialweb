export const required=(value)=>{// обязательное поле
    if (value) return undefined//если не пустая строка
    return "Field is required"
}


// теперь в филд можно передать maxLengthCreator(n)
// чтобы при изменении длины(разработчиком) не менять кучу кода.
export const maxLengthCreator=(maxLength)=>(value)=>{// обязательное поле
    if (value.length>maxLength ) return 'Max length is'+{maxLength}
    return undefined
}

//валидация-проверка данных о данных
//meta -данные о данных!