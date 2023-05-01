import React, { useState } from "react";

// использование хуков реакт запоминает, чтобы при ререндере не опиратся на сайд ж=эффект от хуков

let ProfileStatusWithHooks =(props)=> {

let[editMode,setEditMode]=useState(false)


let activateEditMode=()=>{
  setEditMode(true)
}
let deActivateEditMode=()=>{
  setEditMode(false)
}

let[status,setStatus]=useState(props.status)

let onStatusChange=(e)=>{
  setStatus(e.currentTarget.value)
  props.updateStatus(status);//просто статус из хука
}

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
