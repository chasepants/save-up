import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { login, signup } from '../../redux/thunks/user';
import loginPageActions from '../../redux/actions/loginPageActions';
import ClipLoader from 'react-spinners/ClipLoader';
import { RootState } from '../../redux/reducers/index';
import { LoginInputErrors, SignupInputErrors, getLoginInputErrorByKey, getSignupInputErrorByKey, DefaultLoginPage } from '../../redux/types/loginPageTypes';
import { 
  FormButtonProps,
  FormInputProps,
  FormLinkProps,
} from './types';
import { getLoginInputErrors, getSignupInputErrors } from '../../library/helpers';


function PageTitle(): JSX.Element {
  return (
    <div className="row">
      <div className="col-sm-6 offset-sm-3 text-center"> 
        <h3>Save Up</h3> 
      </div>
    </div>
  )
}

export function FormInput(props: FormInputProps): JSX.Element {
  const {label, name, type, handleInput} = props
  const loginPage = useSelector((state: RootState) => state.loginPage);
  console.log(loginPage)
  const errors = loginPage.isLoginForm ? loginPage.login_input_errors : loginPage.signup_input_errors;
  const error = loginPage.isLoginForm ? getLoginInputErrorByKey(name, errors) : getSignupInputErrorByKey(name, errors);
  console.log(error)
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        onChange={(e) => handleInput(e)}
        isInvalid={error === ''}
      />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export function FormButton(props: FormButtonProps) {
  const loginPage: DefaultLoginPage = useSelector((state: RootState) => state.loginPage)

  return (
    <Form.Group className='text-center'> 
      <Button
        className="mb-3"
        variant="primary"
        type="submit"
        onClick={props.handleFormSubmit}
      >
        { loginPage.isSaving ? <ClipLoader color="#ffffff" loading={loginPage.isSaving} size={20} /> : props.formButtonText } 
      </Button>
    </Form.Group>
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

function FormError(): JSX.Element {
  const login_error: string = useSelector((state: RootState) => state.loginPage.login_error)

  return (
    <div className="row mt-2">
      <div className="col-sm-6 offset-sm-3 text-center">
        <Form.Text className='text-danger'>{login_error}</Form.Text>
      </div>
    </div>
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

    const newErrors: LoginInputErrors|SignupInputErrors = loginPage.isLoginForm ? 
      getLoginInputErrors(loginPage.login_inputs) : 
      getSignupInputErrors(loginPage.signup_inputs);

    if (Object.keys(newErrors).length > 0) {
      let action = loginPage.isLoginForm ? loginPageActions.updateLoginInputErrors : loginPageActions.updateSignupInputErrors;
      dispatch(action(newErrors));
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

  return (
    <>
      <div className="container mt-5">
        <PageTitle/>
        <div className="row mt-5">
          <div className="col-sm-6 offset-sm-3">
            <Form>
              <FormInput label="Email Address" name="username" type="text" handleInput={handleInput}/>
              <FormInput label="Password" name="password" type="password" handleInput={handleInput}/>
              {!loginPage.isLoginForm && (
                <>
                  <FormInput label="Confirm Password" name="confirm_password" type="password" handleInput={handleInput}/>
                  <FormInput label="First Name" name="firstname" type="text" handleInput={handleInput}/>
                  <FormInput label="Last Name" name="lastname" type="text" handleInput={handleInput}/>
                </>
              )}
              <FormButton handleFormSubmit={handleFormSubmit} formButtonText={formButton}/>
              <FormLink handleFormSwitch={handleFormSwitch} formBottomText={formBottomText}/>
            </Form>
          </div>
        </div>
        { loginPage.login_error && <FormError /> }
      </div>
    </>
  )
}

export default LoginPage;
