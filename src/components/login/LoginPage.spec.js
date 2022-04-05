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
    
            // Act
            const { getByText } = render(<LoginPage />)
            const submitButton = getByText(data.buttonText)
            fireEvent.click(submitButton)
    
            // Assert
            expect(dispatchMock).toHaveBeenCalledTimes(4)
            expect(dispatchMock).toHaveBeenCalledWith(loginPageActions.toggleIsSaving())  
        })
    })
    
    // it('switches forms on bottom link click')
})
