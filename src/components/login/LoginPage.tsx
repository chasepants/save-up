import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { login, signup } from '../../redux/thunks/user';
import loginPageActions from '../../redux/actions/loginPageActions';
import { RootState } from '../../redux/reducers/index';
import { getLoginInputErrorByKey, getSignupInputErrorByKey } from '../../redux/types/loginPageTypes';
import { FormLinkProps } from './types';
import { getLoginInputErrors, getSignupInputErrors } from '../../library/helpers';
import { FormButton, FormError, FormInput } from '../common/forms'

function PageTitle(): JSX.Element {
  return (
    <div className="row">
      <div className="col-sm-6 offset-sm-3 text-center"> 
        <h3>Save Up</h3> 
      </div>
    </div>
  )
}

function FormLink(props: FormLinkProps): JSX.Element {
  return (
    <Form.Group className='text-center'>
      <Form.Text muted>
        <a href='/' className="a-pointer" onClick={props.handleFormSwitch}>
          {props.formBottomText}
        </a>
      </Form.Text>
    </Form.Group>
  )
}

function LoginPage(): JSX.Element {
  const loginPage = useSelector((state: RootState) => state.loginPage)

  const formButton = loginPage.isLoginForm ? 'Login' : 'Signup'
  const formBottomText = loginPage.isLoginForm ? "Don't have an account? Create one!" : 'Already have an account? Login!'

  const dispatch = useDispatch()

  /** On input change: 1. update state, 2. wipe out old errors */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateInputsAction = loginPage.isLoginForm ? loginPageActions.updateLoginInputs({
      ...loginPage.login_inputs,
      [e.target.name]: e.target.value
    }) : loginPageActions.updateSignupInputs({
      ...loginPage.signup_inputs,
      [e.target.name]: e.target.value
    })

    dispatch(updateInputsAction);

    const updateInputErrorsAction = loginPage.isLoginForm ? loginPageActions.updateLoginInputErrors({
      ...loginPage.login_input_errors, 
      [e.target.name]: ''
    }) : loginPageActions.updateSignupInputErrors({
      ...loginPage.signup_input_errors, 
      [e.target.name]: ''
    })

    dispatch(updateInputErrorsAction);
  }

  /** Dispatch login thunk */
  const handleLogin = async () => {
    dispatch(login(loginPage.login_inputs))
  }

  /** Dispatch signup thunk */
  const handleSignup = async () => {
    dispatch(signup(loginPage.signup_inputs))
  }

  /** On from submit: 1. validate, 2. showspinner, 3. login/signup 4. @TODO: navigate to homepage  */
  const handleFormSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const { errors, allErrorsEmpty } = loginPage.isLoginForm ? 
      getLoginInputErrors(loginPage.login_inputs) : 
      getSignupInputErrors(loginPage.signup_inputs);
    
    if (!allErrorsEmpty) {
      let action = loginPage.isLoginForm ? loginPageActions.updateLoginInputErrors : loginPageActions.updateSignupInputErrors;
      dispatch(action(errors));
      return;
    }

    dispatch(loginPageActions.toggleIsSaving())
    loginPage.isLoginForm ? handleLogin() : handleSignup();
  }

  /** Handle bottom form link being clicked */
  const handleFormSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const action = loginPage.isLoginForm ? loginPageActions.handleFormSwitchToSignup : loginPageActions.handleFormSwitchToLogin;
    dispatch(action());
  }

  useEffect(() => {
    const inputs = loginPage.isLoginForm ? loginPage.login_inputs : loginPage.signup_inputs;
    const inputAction = loginPage.isLoginForm ? loginPageActions.updateLoginInputs : loginPageActions.updateSignupInputs;
    dispatch(loginPageActions.clearForm())
    dispatch(inputAction(inputs))
  }, [dispatch, loginPageActions])

  const errors = loginPage.isLoginForm ? loginPage.login_input_errors : loginPage.signup_input_errors;
  const username_error = loginPage.isLoginForm ? getLoginInputErrorByKey('username', errors) : getSignupInputErrorByKey('username', errors);
  const password_error = loginPage.isLoginForm ? getLoginInputErrorByKey('password', errors) : getSignupInputErrorByKey('password', errors);
  const confirm_password_error = loginPage.isLoginForm ? getLoginInputErrorByKey('confirm_password', errors) : getSignupInputErrorByKey('confirm_password', errors);
  const firstname_error = loginPage.isLoginForm ? getLoginInputErrorByKey('firstname', errors) : getSignupInputErrorByKey('firstname', errors);
  const lastname_error = loginPage.isLoginForm ? getLoginInputErrorByKey('lastname', errors) : getSignupInputErrorByKey('lastname', errors);

  return (
    <>
      <div className="container mt-5">
        <PageTitle/>
        <div className="row mt-5">
          <div className="col-sm-6 offset-sm-3">
            <Form>
              <FormInput label="Email Address" name="username" type="text" handleInput={handleInput} error={username_error}/>
              <FormInput label="Password" name="password" type="password" handleInput={handleInput} error={password_error}/>
              {!loginPage.isLoginForm && (
                <>
                  <FormInput label="Confirm Password" name="confirm_password" type="password" handleInput={handleInput} error={confirm_password_error}/>
                  <FormInput label="First Name" name="firstname" type="text" handleInput={handleInput} error={firstname_error}/>
                  <FormInput label="Last Name" name="lastname" type="text" handleInput={handleInput} error={lastname_error}/>
                </>
              )}
              <FormButton 
                handleFormSubmit={handleFormSubmit}
                formButtonText={formButton} 
                form='loginPage' 
                customButton={<span></span>}
                showCustomButton={false}
                error={loginPage.login_error}/>
              <FormLink handleFormSwitch={handleFormSwitch} formBottomText={formBottomText}/>
            </Form>
          </div>
        </div>
        { loginPage.login_error && <FormError error={loginPage.login_error} /> }
      </div>
    </>
  )
}

export default LoginPage;
