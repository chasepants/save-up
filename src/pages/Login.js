import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/thunks/user";

function Login() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const authentication = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (!!errors[e.target.name])
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: null,
      }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = getErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(login(inputs.username, inputs.password));
    }
  };

  const getErrors = () => {
    const { username, password } = inputs;
    const newErrors = {};
    if (!username || username === "") newErrors.username = "Enter username";
    if (!password || password === "") newErrors.password = "Enter password";
    return newErrors;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-center">
          <h3>Login</h3>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6 offset-sm-3 text-center">
          <ul className="list-group">
            <li className="list-group-item">
              <div className="input-group flex-nowrap">
                <input
                  name="username"
                  value={inputs.username || ""}
                  onChange={(e) => handleInput(e)}
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <small className="text-danger">{errors.username}</small>
            </li>
            <li className="list-group-item">
              <div className="input-group flex-nowrap">
                <input
                  name="password"
                  value={inputs.password || ""}
                  onChange={(e) => handleInput(e)}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <small className="text-danger">{errors.password}</small>
            </li>
            <li className="list-group-item d-flex justify-content-evenly px-5 py-2">
              <button
                className="btn btn-primary"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  dispatch(signup(inputs.username, inputs.password))
                }
              >
                Signup
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6 offset-sm-3 text-center"></div>
      </div>
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
    </div>
  );
}

export default Login;
