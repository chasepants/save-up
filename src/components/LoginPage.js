import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { login, signup } from '../redux/thunks/user'
import loginPageActions from '../redux/actions/loginPageActions'
import ClipLoader from 'react-spinners/ClipLoader'

function PageTitle() {
  return (
    <div className="row">
      <div className="col-sm-6 offset-sm-3 text-center"> 
        <h3>Save Up</h3> 
      </div>
    </div>
  )
}

function FormInput(props) {
  const showFormText = !!props['FormText']
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

function FormButton({handleFormSubmit, isSaving, formButtonText}) {
  return (
    <Form.Group className='text-center'> 
      <Button
        className="mb-3"
        variant="primary"
        type="submit"
        onClick={(e) => handleFormSubmit(e)}
      >
        { isSaving ? <ClipLoader color="#ffffff" loading={isSaving} size={20} /> : formButtonText } 
      </Button>
    </Form.Group>
  )
}

function FormLink({handleFormSwitch, formBottomText}) {
  return (
    <Form.Group className='text-center'>
      <Form.Text muted>
        <a href='/' className="a-pointer" onClick={(e) => handleFormSwitch(e)}>
          {formBottomText}
        </a>
      </Form.Text>
    </Form.Group>
  )
}

function FormError({error}) {
  return (
    <div className="row mt-2">
      <div className="col-sm-6 offset-sm-3 text-center">
        <Form.Text className='text-danger'>{error}</Form.Text>
      </div>
    </div>
  )
}

const PasswordFormText = () => <Form.Text muted> 8 characters long using letters, number and characters </Form.Text>

function LoginPage() {
  const requiredLoginInputs = [
    'username',
    'password',
  ]

  const requiredSignupInputs = [
    ...requiredLoginInputs,
    'firstname',
    'lastname',
    'confirm_password'
  ]

  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [isSaving, setIsSaving] = useState(false);
  const formButton = isLoginForm ? 'Login' : 'Signup'
  const formBottomText = isLoginForm ? "Don't have an account? Create one!" : 'Already have an account? Login!'

  const loginPage = useSelector(state => state.loginPage)
  
  const dispatch = useDispatch()

  /** Helper function for getErrors */
  const isEmpty = str => !str || str === ''

  /** Validate inputs and return a list of new errors since last form submit */
  const getErrors = () => {
    const newErrors = {}
    const requiredInputs = isLoginForm ? requiredLoginInputs : requiredSignupInputs

    for (const key of requiredInputs) {
      if (isEmpty(inputs[key])) {
        newErrors[key] = `Please enter a ${key}`
      }
    }

    if (!isLoginForm && (inputs.confirm_password !== inputs.password)) {
      newErrors.confirm_password = 'Passwords do not match'
    }

    return newErrors
  }

  /** On input change: 1. update state, 2. wipe out old errors */
  const handleInput = (e) => {
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
      fullname: `${inputs.firstname} ${inputs.lastname}`,
      savings_items: [],
      plaid_items: []
    }))
  }

  /** On from submit: 1. validate, 2. showspinner, 3. login/signup 4. @TODO: navigate to homepage  */
  const handleFormSubmit = async (e) => {
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
  const handleFormSwitch = (e) => {
    e.preventDefault()
    setIsLoginForm(!isLoginForm)
    setErrors({})
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
              {
                isLoginForm ? //choose which pass word input to pass
                <FormInput label="Password" name="password" type="password" errors={errors} handleInput={handleInput}/> :
                <FormInput label="Password" name="password" type="password" errors={errors} handleInput={handleInput} FormText={PasswordFormText}/> 
              } 
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
