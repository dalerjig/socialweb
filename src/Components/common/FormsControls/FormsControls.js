import React from "react"
import s from "./FormsControls.module.css"



//сюда в пропсы из за редаксФорм придет объект с инпут, мета. Остальное-ньюпосттекст-нами созданные пропсы   
//porps==={input,meta,...props} раскрыли так рест оператором. ниже текст ареа принимает два параметра,
//а выше три параметра. Отсекаем последним именно наши пропсы. Но берем только инпут
//и все что отсекли-ньюпосттекст
//именно в инпуте лежат все необходимые методы работы с веденными данными
const FormControl = ({ input, meta, ...props }) => {


    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>

            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}
//если в мета-еррор не андефинд, и мета тачед(то есть навели фокус), то покажи спан


export const Textarea = (props) => {//чтобы фиелд рисовал именно эту Тексареа
   const { input, meta, ...restProps } = props
    return <FormControl {...props}><textarea {...input}{...restProps} /></FormControl>

}
export const Input = (props) => {//чтобы фиелд рисовал именно этот Input в login
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><input {...input}{...restProps} /></FormControl>
}
