import React, { useEffect, useState } from "react";

// использование хуков реакт запоминает, чтобы при ререндере не опиратся на сайд ж=эффект от хуков

let ProfileStatusWithHooks =(props)=> {
console.log('rer')



let[editMode,setEditMode]=useState(false)


let activateEditMode=()=>{
  setEditMode(true)
}
let deActivateEditMode=()=>{
  setEditMode(false);
  props.updateStatus(status);//просто статус из хука
}

let[status,setStatus]=useState(props.status)

let onStatusChange=(e)=>{
  setStatus(e.currentTarget.value)
  
}

//синхронизация состояния(то же самое что и componentDidUpdate)
useEffect(()=>{ 
console.log('useEf') ;setStatus(props.status)},[props.status])
//при пустом массиве выполнится 1 раз. Так лучше не делать
//выполнись тогда, когда придет статус из пропсов новый!!!!!!!!!!
  return (
      <div>
        {!editMode && ( 
          <div>
            <span onDoubleClick={activateEditMode}>
              {props.status || 'пустой статус'}
            </span>
          </div>
        )}

        {editMode && ( 
          <div>
            <input
              onChange={onStatusChange}
              autoFocus={true}
              onBlur={deActivateEditMode}
              value={status} 
            />
          </div> 
        )}
      </div>
   
  ) 
}

export default ProfileStatusWithHooks;
