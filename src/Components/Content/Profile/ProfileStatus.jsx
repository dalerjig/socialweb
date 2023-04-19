import React from "react";

//при рендере классовой компоненты, реакт создает объект
//в этом объекте сделаем локалный стейт, с которым можно работать через useState
//ф-я компонента не создает объект

class ProfileStatus extends React.Component {
  state = {
    editMode: false, // режим редактирования(при наведении)
    status: this.props.status,
  };

  //если объявить как метод : activateEditMode(){}, то потеряется контекст и в onClick нужно будет биндить:onDoubleClick={this.activateEditMode.bind(this)}
  //уже не актуально в новой версии реакт

  activateEditMode = () => {
    //this.state.editMode=true//поменяли, но не перерисовалось
    //this.forceUpdate()можно перерисовать все так, но это дичь

    //setState перезаписывает только ту часть объекта state, которую передаем в аргументе в качестве объекта.
    //setState ассинхронен, поэтому в консоли мы не увидим изменения сразу, пока находимся в этом методе
    this.setState({
      editMode: true,
    });
  };

  //onBlur-фокус на объекте
  deActivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status); //обнови статус в строке 
  };

  onStatusChange=(e)=>{
    this.setState({
        status:e.currentTarget.value
    })
  }

  render() {
    return (
      <div>
        {!this.state.editMode && ( // если не тру, то просто спан покажи/тут будет стейт из блл
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status}
            </span>
          </div>
        )}

        {this.state.editMode && ( // если тру, то буду редактировать
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deActivateEditMode}
              value={this.state.status} //достанем из локального стейта
            />
          </div> //autoFocus-ставит фокус, чтобы сразу писать
        )}
      </div>
    );
  }
}

export default ProfileStatus;
