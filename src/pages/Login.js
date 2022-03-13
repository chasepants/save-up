import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../redux/thunks/user'
import { Button, Form } from 'react-bootstrap'
import loginActions from '../redux/actions/loginActions'

function Login() {
  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoginForm, setIsLoginForm] = useState(true)
  const loginPage = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const handleInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })

    //check for previous error, reset error for new input
    if (!!errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      })
    }
  }

  const handleLogin = () => {
    console.log('handling login')
    dispatch(login(inputs.username, inputs.password))
  }

  const handleSignup = () => {
    dispatch(signup(inputs.username, inputs.password))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('handling form submit ')

    const newErrors = getErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    isLoginForm ? handleLogin() : handleSignup()
  }

  const handleFormSwitch = (e) => {
    e.preventDefault()
    setIsLoginForm(!isLoginForm)
    setErrors({})
    dispatch(loginActions.setLoginPageError(''))
  }

  const getErrors = () => {
    const { 
      username,
      password, 
      confirm_password,
      lastname,
      firstname 
    } = inputs

    const newErrors = {}
    if (!username || username === '') newErrors.username = 'Enter username'
    if (!password || password === '') newErrors.password = 'Enter password'
    if (!isLoginForm) {
      if (!lastname || lastname === '') newErrors.lastname = 'Please enter a last name'
      if (!firstname || firstname === '') newErrors.firstname = 'Please enter a first name'
      if (!confirm_password || confirm_password === '') newErrors.confirm_password = 'Passwords do not match'
    }
    console.log('errors', newErrors)
    return newErrors
  }

  const formButton = isLoginForm ? 'Login' : 'Signup'
  const formBottomText = isLoginForm
    ? "Don't have an account? Create one!"
    : 'Already have an account? Login!'

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6 offset-sm-3 text-center">
            <h3>Save Up</h3>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-6 offset-sm-3">
            <Form>
              {!isLoginForm && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="first_name"
                      type="text"
                      onChange={(e) => handleInput(e)}
                      isInvalid={!!errors.firstname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstname}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastname"
                      type="text"
                      onChange={(e) => handleInput(e)}
                      isInvalid={!!errors.lastname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastname}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Do you agree you are 18 year or older?"
                    />
                  </Form.Group>
                </>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  onChange={(e) => handleInput(e)}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
                {
                  !isLoginForm && (
                    <Form.Text muted>This is your username</Form.Text>
                  )
                }
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={inputs.password || ''}
                  onChange={(e) => handleInput(e)}
                  type="password"
                  className="form-control"
                  isInvalid={!!errors.password}
                />
                {!isLoginForm && (
                  <Form.Text muted>
                    8 characters long using letters, number and characters
                  </Form.Text>
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              {!isLoginForm && (
                <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirm_password"
                  value={inputs.confirm_password || ''}
                  onChange={e => handleInput(e)}
                  type="password"
                  className="form-control"
                  isInvalid={!!errors.confirm_password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirm_password}
                </Form.Control.Feedback>
              </Form.Group>
              )}
              <Form.Group className='text-center'> 
                <Button
                  className="mb-3"
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleFormSubmit(e)}
                >
                  {formButton}
                </Button>
              </Form.Group>
              <Form.Group className='text-center'>
                <Form.Text muted>
                  <a className="a-pointer" onClick={(e) => handleFormSwitch(e)}>
                    {formBottomText}
                  </a>
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6 offset-sm-3 text-center">
          {
            loginPage.login_error && 
            <Form.Text className='text-danger'>Incorrect username or password</Form.Text>
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
