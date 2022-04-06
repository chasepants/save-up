import { fireEvent, render } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { useDispatch, useSelector } from 'react-redux';
import loginPageReducer from "../../redux/reducers/loginPageReducer";
import loginPageActions from '../../redux/actions/loginPageActions';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

afterEach(() => jest.clearAllMocks())

describe('LoginPage', () => {
    let dataProvider = [
        { 
            isLoginForm: true,
            updateInputsAction: loginPageActions.updateLoginInputs,
            clearInputsAction: loginPageActions.updateLoginInputErrors
        },
        { 
            isLoginForm: false,
            updateInputsAction: loginPageActions.updateSignupInputs,
            clearInputsAction: loginPageActions.updateSignupInputErrors
        }
    ];
    dataProvider.forEach(({isLoginForm, updateInputsAction, clearInputsAction}) => {
        it('displays input on input change - login form and signup form', () => {
            //Arrange
            let loginPage = {
                isLoginForm: isLoginForm,
                isSaving: false,
                login_error: '',
                login_inputs: { username: '', password: '' },
                signup_inputs: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
                login_input_errors: { username: '', password: '' },
                signup_input_errors: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
            }

            const dispatchMock = jest.fn().mockImplementation(action => {
                loginPage = loginPageReducer(loginPage, action)
            })

            useDispatch.mockReturnValue(dispatchMock)
            useSelector.mockReturnValue(loginPage)

            let actionUpdate = isLoginForm ? { ...loginPage.login_inputs } : { ...loginPage.signup_inputs }
            let actionErrorUpdate = isLoginForm ? { ...loginPage.login_inputs } : { ...loginPage.signup_input_errors }
            actionUpdate.username = 'John Doe'
            actionErrorUpdate.username = ''

            //Act 
            const { container } = render(<LoginPage />)
            const usernameInput = container.getElementsByTagName('input').item(0)
            fireEvent.change(usernameInput, {target: {value: 'John Doe'}})

            //Assert
            expect(dispatchMock).toHaveBeenCalledTimes(4)
            expect(dispatchMock).toHaveBeenCalledWith(updateInputsAction(actionUpdate))
            expect(dispatchMock).toHaveBeenCalledWith(clearInputsAction(actionErrorUpdate))

            if (loginPage.isLoginForm) {
                expect(loginPage.login_inputs.username).toEqual('John Doe')
                expect(loginPage.login_input_errors.username).toEqual('')
                return;
            }
            expect(loginPage.signup_inputs.username).toEqual('John Doe')
            expect(loginPage.signup_input_errors.username).toEqual('')
        })
    })
    
    dataProvider = [
        {
            title: 'displays errors on empty login',
            buttonText: 'Login',
            loginPage: {
                isLoginForm: true,
                isSaving: false,
                login_error: '',
                login_inputs: { username: '', password: '' },
                signup_inputs: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
                login_input_errors: { username: '', password: '' },
                signup_input_errors: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
            },
            errors: { 
                username: 'Please enter a username',
                password: 'Please enter a password' 
            }
        },
        {
            title: 'displays errors on empty signup',
            buttonText: 'Signup',
            loginPage: {
                isLoginForm: false,
                isSaving: false,
                login_error: '',
                login_inputs: { username: '', password: '' },
                signup_inputs: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
                login_input_errors: { username: '', password: '' },
                signup_input_errors: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
            },
            errors: { 
                username: 'Please enter a username',
                password: 'Please enter a password', 
                confirm_password: 'Please confirm the password',
                firstname: 'Please enter a first name', 
                lastname: 'Please enter a last name' 
            }
        }
    ];
    dataProvider.forEach(data => {
        it(data.title, () => {
            //Arrange
            useSelector.mockReturnValue(data.loginPage)
            
            const dispatchMock = jest.fn()
            useDispatch.mockReturnValue(dispatchMock)
            const action = data.loginPage.isLoginForm ? loginPageActions.updateLoginInputErrors : loginPageActions.updateSignupInputErrors;
            //Act 
            const { getByText } = render(<LoginPage />)
            const submitButton = getByText(data.buttonText)
            fireEvent.click(submitButton)
    
            //Assert
            expect(dispatchMock).toHaveBeenCalledTimes(3)
            expect(dispatchMock).toHaveBeenLastCalledWith(action(data.errors))
        })
    })

    // it('on successful login it calls dispatch with login')
    dataProvider = [
        {
            title: 'on successful login it calls dispatch with login',
            buttonText: 'Login',
            loginPage: {
                isLoginForm: true,
                isSaving: false,
                login_error: '',
                login_inputs: { 
                    username: 'johndoe', 
                    password: '1234'
                },
                signup_inputs: { 
                    username: '', 
                    password: '',
                    confirm_password: '',
                    firstname: '',
                    lastname: '' 
                },
                login_input_errors: { username: '', password: '' },
                signup_input_errors: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
            }
        },
        {
            title: 'on successful signup it calls dispatch with signup',
            buttonText: 'Signup',
            loginPage: {
                isLoginForm: false,
                isSaving: false,
                login_error: '',
                login_inputs: { username: '', password: '' },
                signup_inputs: { 
                    username: 'johndoe', 
                    password: '1234',
                    confirm_password: '1234',
                    firstname: 'John',
                    lastname: 'Doe' 
                },
                login_input_errors: { username: '', password: '' },
                signup_input_errors: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
            }
        }
    ]
    dataProvider.forEach(data => {
        it(data.title, () => {
            // Arrange build up login page
            const dispatchMock = jest.fn()
            useSelector.mockReturnValue(data.loginPage)
            useDispatch.mockReturnValue(dispatchMock)
            const inputData = data.loginPage.isLoginForm ? data.loginPage.login_inputs : data.loginPage.signup_inputs;

            // Act
            const { getByText } = render(<LoginPage />)
            const submitButton = getByText(data.buttonText)
            fireEvent.click(submitButton)
    
            // Assert
            expect(getByText('Email Address')).toBeVisible()
            expect(getByText('Password')).toBeVisible()
            if (!data.loginPage.isLoginForm) {
                expect(getByText('Confirm Password')).toBeVisible()
                expect(getByText('First Name')).toBeVisible()
                expect(getByText('Last Name')).toBeVisible()
            }
            expect(dispatchMock).toHaveBeenCalledTimes(4)
            expect(dispatchMock).toHaveBeenCalledWith(loginPageActions.toggleIsSaving())  
        })
    })
    
    dataProvider = [
        {
            title: `loginPage is login form then the form button says login and the bottom link says "Don't have an account? Create one!"`,
            buttonText: 'Login',
            linkText: "Don't have an account? Create one!",
            action: loginPageActions.handleFormSwitchToSignup,
            loginPage: {
                isLoginForm: true,
                isSaving: false,
                login_error: '',
                login_inputs: { username: '', password: '' },
                signup_inputs: { 
                    username: '', 
                    password: '',
                    confirm_password: '',
                    firstname: '',
                    lastname: '' 
                },
                login_input_errors: { username: '', password: '' },
                signup_input_errors: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
            }
        },
        {
            title: "loginPage is not login form then the form button says signup and the bottom says 'Already have an account? Login!'",
            buttonText: 'Signup',
            linkText: 'Already have an account? Login!',
            action: loginPageActions.handleFormSwitchToLogin,
            loginPage: {
                isLoginForm: false,
                isSaving: false,
                login_error: '',
                login_inputs: { username: '', password: '' },
                signup_inputs: { 
                    username: '', 
                    password: '',
                    confirm_password: '',
                    firstname: '',
                    lastname: '' 
                },
                login_input_errors: { username: '', password: '' },
                signup_input_errors: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
            }
        }
    ]

    dataProvider.forEach(data => {
        it(data.title, () => {
             // Arrange build up login page
             const dispatchMock = jest.fn();
             useSelector.mockReturnValue(data.loginPage);
             useDispatch.mockReturnValue(dispatchMock);
 
             // Act
             const { getByText } = render(<LoginPage />);

             // Assert 
            expect(getByText(data.buttonText)).toBeVisible();
            expect(getByText(data.linkText)).toBeVisible();
            fireEvent.click(getByText(data.linkText));
            expect(dispatchMock).toHaveBeenCalledTimes(3);
            expect(dispatchMock).toHaveBeenLastCalledWith(data.action());
        })
    })

    it('Shows error after login error', () => {
        // Arrange
        const loginPage = {
            isLoginForm: false,
            isSaving: false,
            login_error: 'There has been a problem',
            login_inputs: { username: '', password: '' },
            signup_inputs: { 
                username: '', 
                password: '',
                confirm_password: '',
                firstname: '',
                lastname: '' 
            },
            login_input_errors: { username: '', password: '' },
            signup_input_errors: { username: '', password: '', confirm_password: '', firstname: '', lastname: '' },
        }

        const dispatchMock = jest.fn();
        useSelector.mockReturnValue(loginPage);
        useDispatch.mockReturnValue(dispatchMock);

        // Act
        const { getByText } = render(<LoginPage />);

        // Assert
        expect(getByText(loginPage.login_error)).toBeVisible();
    })
})
