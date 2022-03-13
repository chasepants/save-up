import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../redux/thunks/user'
import { Button, Form } from 'react-bootstrap'

function Login() {
  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoginForm, setIsLoginForm] = useState(true)
  const authentication = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleInput = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    if (!!errors[e.target.name])
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: null,
      }))
  }

  const handleLogin = () => {
    dispatch(login(inputs.username, inputs.password))
  }

  const handleSignup = () => {
    dispatch(signup(inputs.username, inputs.password))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
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
  }

  const getErrors = () => {
    const { username, password } = inputs
    const newErrors = {}
    if (!username || username === '') newErrors.username = 'Enter username'
    if (!password || password === '') newErrors.password = 'Enter password'
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
                      placeholder="John"
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
                      placeholder="Doe"
                      name="username"
                      type="text"
                      onChange={(e) => handleInput(e)}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
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
                  placeholder="john@example.com"
                  name="username"
                  type="text"
                  onChange={(e) => handleInput(e)}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
                <Form.Text muted>This is your username</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={inputs.password || ''}
                  onChange={(e) => handleInput(e)}
                  type="password"
                  className="form-control"
                  placeholder="enter your password"
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
              <Button
                className="mb-3"
                variant="primary"
                type="submit"
                onClick={(e) => handleFormSubmit(e)}
              >
                {formButton}
              </Button>
              <Form.Group>
                <Form.Text muted>
                  <a className="a-pointer" onClick={(e) => handleFormSwitch(e)}>
                    {formBottomText}
                  </a>
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-6 offset-sm-3 text-center"></div>
        </div>
      </div>
    </>
  )
}

export default Login

/**
  {(() => {
    if (!authentication.valid) {
      return (
        <div className="row">
          <div className="col-sm-6 offset-sm-3 text-center">
            <p>{authentication.error}</p>
          </div>
        </div>
      );
    }
  })()}
 */
