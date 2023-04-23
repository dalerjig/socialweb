import { Field, Form, reduxForm } from "redux-form";

//form сама умеет сабмитить
// в доке видим что инпуты надо поменять на Field, который имеет три типа:
//'input' or 'select' or 'textarea'
//Field-компонента, которая рисует другую компоненту!
//name- название свой-ства объекта под которым будем отправлять на серв

// мы могли бы написать сами все инпуты с обработчиками и стейтом и редюсером, но
//редаксФорм библиотека(в будущем формик) делает все за нас, нам надо создать только форму
//и в форме в пропсах есть коллбэк(КОТОРЫЙ ПРИХОДИТ ИЗ КОНТЕЙНЕРНОЙ) хандлсабмит, который организует flux при вводе
const LoginForm = (props) => {
    console.log('rer')
  //этот дебаггер позволит нам увидеть, какие коллбэки в пропсы передал reduxForm хок
  return (
   // handleSubmit(управляй отправкой)-коллбэк из пропсов, предоставляемый reduxForm
    <Form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Login"} name={'login'} component={'input'} />
      </div>

      <div>
        <Field placeholder={"Password"} name={'password'} component={'input'} />
      </div>

      <div>
        <Field type={"checkbox"} name={'rememberMe'} component={'input'} /> remember me
      </div>

      <div>
        <button type={'submit'}>Login</button>
      </div>
    </Form>

    
  );
};

const LoginReduxForm = reduxForm({
  form: "login", //данный form не из редюсера. Тут по доке настраиваем.
  //по факту это mapStateToProps
})(LoginForm);



const Login = (props) => {

  const onSubmit = (val) => {
    
    console.log(val);
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
