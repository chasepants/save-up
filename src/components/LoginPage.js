import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { login, signup } from '../redux/thunks/user'
import { useNavigate } from 'react-router-dom'
import loginPageActions from '../redux/actions/loginPageActions'
import ClipLoader from 'react-spinners/ClipLoader'

function LoginPage() {
  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [isSaving, setIsSaving] = useState(false);

  const loginPage = useSelector((state) => state.loginPage)
  
  const dispatch = useDispatch()
  const navigate = useNavigate();

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

  const handleLogin = async () => {
    dispatch(login(inputs.username, inputs.password))
  }

  const handleSignup = async () => {
    dispatch(
      signup({
        username: inputs.username, 
        password: inputs.password,
        fullname: `${inputs.firstname} ${inputs.lastname}`
      })
    )
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const newErrors = getErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsSaving(true)
    isLoginForm ? handleLogin() : handleSignup()
    setTimeout(() => {
      setIsSaving(false)
      navigate('/goals', { replace: true })
    }, 1000)
  }

  const handleFormSwitch = (e) => {
    e.preventDefault()
    setIsLoginForm(!isLoginForm)
    setErrors({})
    dispatch(loginPageActions.setLoginPageError(''))
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
      if (!confirm_password || confirm_password === '' || confirm_password !== password) newErrors.confirm_password = 'Passwords do not match'
    }
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
                      name="firstname"
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
                 { isSaving ? <ClipLoader color="#ffffff" loading={isSaving} size={20} /> : formButton } 
                </Button>
              </Form.Group>
              <Form.Group className='text-center'>
                <Form.Text muted>
                  <a href='/' className="a-pointer" onClick={(e) => handleFormSwitch(e)}>
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
            <Form.Text className='text-danger'>{loginPage.login_error}</Form.Text>
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage;
