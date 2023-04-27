import { Field, Form, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { loginThunk } from "../../Redux/aurth-reducer";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import s from "../common/FormsControls/FormsControls.module.css"

//form сама умеет сабмитить
// в доке видим что инпуты надо поменять на Field, который имеет три типа:
//'input' or 'select' or 'textarea'
//Field-компонента, которая рисует другую компоненту!
//name- название свой-ства объекта под которым будем отправлять на серв

// мы могли бы написать сами все инпуты с обработчиками и стейтом и редюсером, но
//редаксФорм библиотека(в будущем формик) делает все за нас, нам надо создать только форму
//и в форме в пропсах есть коллбэк(КОТОРЫЙ ПРИХОДИТ ИЗ КОНТЕЙНЕРНОЙ) хандлсабмит, который организует flux при вводе
const LoginForm = (props) => {

  return (
    // handleSubmit(управляй отправкой)-коллбэк из пропсов, предоставляемый reduxForm
    <Form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"email"}
          name={"email"}
          component={Input}
          validate={[required]}
        />
      </div>

      <div>
        <Field
          placeholder={"Password"}
          type={"password"}
          name={"password"}
          component={Input}
          validate={[required]}
        />
      </div>

      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={Input} />{" "}
        remember me
      </div>
        {props.error&& <div className={s.formSummaryError}>{props.error}</div>}
      <div>
        <button type={"submit"}>Login</button>
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
    //console.log(val);
    props.loginThunk(val.email, val.password, val.remeberMe);
  };
  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { loginThunk })(Login);
