import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { login, signup } from '../../redux/thunks/user';
import loginPageActions from '../../redux/actions/loginPageActions';
import ClipLoader from 'react-spinners/ClipLoader';
import { RootState } from '../../redux/reducers/index';
import { 
  FormButtonProps,
  FormErrorProps,
  FormInputProps,
  FormLinkProps,
  LoginErrors,
  LoginInputs,
  SignupErrors,
  SignupInputs 
} from './types';

function PageTitle(): JSX.Element {
  return (
    <div className="row">
      <div className="col-sm-6 offset-sm-3 text-center"> 
        <h3>Save Up</h3> 
      </div>
    </div>
  )
}

function FormInput(props: FormInputProps): JSX.Element {
  // const showFormText = !!props['FormText']
  const {label, name, type, errors, handleInput} = props

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        onChange={(e) => handleInput(e)}
        isInvalid={!!errors[name]}
      />
      {/* {showFormText ? <FormText/> : ''}  */}
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

function FormButton(props: FormButtonProps) {
  return (
    <Form.Group className='text-center'> 
      <Button
        className="mb-3"
        variant="primary"
        type="submit"
        onClick={(e) => props.handleFormSubmit(e)}
      >
        { props.isSaving ? <ClipLoader color="#ffffff" loading={props.isSaving} size={20} /> : props.formButtonText } 
      </Button>
    </Form.Group>
  )
}

function FormLink(props: FormLinkProps): JSX.Element {
  return (
    <Form.Group className='text-center'>
      <Form.Text muted>
        <a href='/' className="a-pointer" onClick={(e) => props.handleFormSwitch(e)}>
          {props.formBottomText}
        </a>
      </Form.Text>
    </Form.Group>
  )
}

function FormError(props: FormErrorProps): JSX.Element {
  return (
    <div className="row mt-2">
      <div className="col-sm-6 offset-sm-3 text-center">
        <Form.Text className='text-danger'>{props.error}</Form.Text>
      </div>
    </div>
  )
}

function PasswordFormText(): JSX.Element {
  return <Form.Text muted> 8 characters long using letters, number and characters </Form.Text>
}

function LoginPage(): JSX.Element {
  /** @todo: use typescript tooling here insteads of an array of keys if possible */
  const requiredLoginInputs = [
    'username',
    'password',
  ]

  /** @todo: use typescript tooling here insteads of an array of keys if possible */
  const requiredSignupInputs = [
    ...requiredLoginInputs,
    'firstname',
    'lastname',
    'confirm_password'
  ]

  const [inputs, setInputs] = useState<LoginInputs|SignupInputs|null>();
  const [errors, setErrors] = useState<LoginErrors|SignupErrors|null>();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const formButton = isLoginForm ? 'Login' : 'Signup'
  const formBottomText = isLoginForm ? "Don't have an account? Create one!" : 'Already have an account? Login!'

  const loginPage = useSelector((state: RootState) => state.loginPage)
  
  const dispatch = useDispatch()

  /** Helper function for getErrors */
  const isEmpty = (str: string) => !str || str === ''

  /** Validate inputs and return a list of new errors since last form submit */
  const getErrors = () => {
    let newErrors: LoginErrors|SignupErrors;
    const requiredInputs = isLoginForm ? requiredLoginInputs : requiredSignupInputs;

    for (const key of requiredInputs) {
      if (isEmpty(inputs[key])) {
        newErrors[key] = `Please enter a ${key}`;
      }
    }

    if (!isLoginForm && ((inputs as SignupInputs).confirm_password !== inputs.password)) {
      (newErrors as SignupErrors).confirm_password = 'Passwords do not match';
    }

    return newErrors;
  }

  /** On input change: 1. update state, 2. wipe out old errors */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })

    if (!!errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      })
    }
  }

  /** Dispatch login thunk */
  const handleLogin = async () => {
    dispatch(login(inputs.username, inputs.password))
  }

  /** Dispatch signup thunk */
  const handleSignup = async () => {
    dispatch(signup({
      username: inputs.username, 
      password: inputs.password,
      fullname: `${(inputs as SignupInputs).firstname} ${(inputs as SignupInputs).lastname}`,
      savings_items: [],
      plaid_items: []
    }))
  }

  /** On from submit: 1. validate, 2. showspinner, 3. login/signup 4. @TODO: navigate to homepage  */
  const handleFormSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newErrors = getErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSaving(true)

    if (isLoginForm) {
      handleLogin()
    } else {
      handleSignup()
    } 
  }

  /** Handle bottom form link being clicked */
  const handleFormSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoginForm(!isLoginForm)
    setErrors(null)
    dispatch(loginPageActions.setLoginPageError(''))
  }

  return (
    <>
      <div className="container mt-5">
        <PageTitle/>
        <div className="row mt-5">
          <div className="col-sm-6 offset-sm-3">
            <Form>
              <FormInput label="Email Address" name="username" type="text" errors={errors} handleInput={handleInput}/>
              <FormInput label="Password" name="password" type="password" errors={errors} handleInput={handleInput}/>
              {!isLoginForm && (
                <>
                  <FormInput label="First Name" name="firstname" type="text" errors={errors} handleInput={handleInput}/>
                  <FormInput label="Last Name" name="lastname" type="text" errors={errors} handleInput={handleInput}/>
                  <FormInput label="Confirm Password" name="confirm_password" type="password" errors={errors} handleInput={handleInput}/>
                </>
              )}
              <FormButton handleFormSubmit={handleFormSubmit} isSaving={isSaving} formButtonText={formButton}/>
              <FormLink handleFormSwitch={handleFormSwitch} formBottomText={formBottomText}/>
            </Form>
          </div>
        </div>
        { loginPage.login_error && <FormError error={loginPage.login_error}/> }
      </div>
    </>
  )
}

export default LoginPage;
