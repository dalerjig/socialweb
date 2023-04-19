import React from "react";

//при рендере классовой компоненты, реакт создает объект
//в этом объекте есть локалный стейт, с которым можно работать
//ф-я компонента не создает объект

class ProfileStatus extends React.Component {

  state = {
    editMode: false, // режим редактирования(при наведении)
  };


  //если объявить как метод : activateEditMode(){}, то потеряется контекст и в onClick нужно будет биндить:onDoubleClick={this.activateEditMode.bind(this)}
  
  activateEditMode=()=>{ 
    //this.state.editMode=true//поменяли, но не перерисовалось 
    //this.forceUpdate()можно перерисовать все так, но это дичь

    //setState перезаписывает только ту часть объекта state, которую передаем в аргументе в качестве объекта.
    //setState ассинхронен, поэтому в консоли мы не увидим изменения сразу, пока находимся в этом методе
    this.setState({
        editMode:true
    })
  }

  //onBlur-фокус на объекте
  deActivateEditMode=()=>{ 
    this.setState({
        editMode:false
    })
  }

  render() {
    return (
      <div>
        {!this.state.editMode && ( // если не тру, то просто спан покажи
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
          </div>
        )}

        {this.state.editMode && ( // если тру, то буду редактировать
          <div>
            <input onBlur={this.deActivateEditMode} value={this.props.status} />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
