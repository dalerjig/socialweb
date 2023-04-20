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

   componentDidUpdate(prevProps,prevState){//обновляем комп при изменении локального стейта
    //let a=this.state // в дебаге увидим, что после дабллкилка на стейт едит мод тру!

    //если только превПросп(пустой) не равен статусу из пропсов, то установи его в наш локальный стейт и отправь в инпут!
    //иначе зациклится(без иф)

    //didUpdate нужен потому чтов didMount в ContentContainer делает два запроса this.props.getUserProfile(userId) и this.props.getStatus(userId)
    // и пока компонента вмонитрована, она может еще раз сделать запрос ноне обновиться
   
    if(prevProps.status!==this.props.status){
        this.setState({
          status:this.props.status
        })
    }

   }

  render() {
    return (
      <div>
        {!this.state.editMode && ( // если не тру, то просто спан покажи/тут будет стейт из блл
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || 'пустой статус'}
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
