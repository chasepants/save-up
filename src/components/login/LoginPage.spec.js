// jest.mock('react-redux');

import { fireEvent, render } from "@testing-library/react";
import LoginPage, {FormButton, FormInput} from "./LoginPage";
import { useDispatch, useSelector } from 'react-redux';
import loginPageReducer from "../../redux/reducers/loginPageReducer";
import loginPageActions from '../../redux/actions/loginPageActions';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

afterEach(() => jest.clearAllMocks())

describe('FormInput', () => {
    const dataProvider = [
        {
            description: 'renders for LoginForm correctly with no errors',
            props: {
                label: "Username",
                name: "username",
                type: "text",
                handleInput: () => {}
            },
            loginPageState: {
                isLoginForm: true,
                login_input_errors: {},
                signup_input_errors: {}
            },
            hasErrors: false,
            expectedError: '' //this should match loginPageState.login_input_errors.key
        },
        {
            description: 'renders for LoginForm correctly with errors',
            props: {
                label: "Username",
                name: "username",
                type: "text",
                handleInput: () => {}
            },
            loginPageState: {
                isLoginForm: true,
                login_input_errors: { username: 'error'},
                signup_input_errors: {}
            },
            hasErrors: true,
            expectedError: 'error' //this should match loginPageState.login_input_errors.key
        },
        {
            description: 'renders for Signup correctly with no errors',
            props: {
                label: "Username",
                name: "username",
                type: "text",
                handleInput: () => {}
            },
            loginPageState: {
                isLoginForm: false,
                login_input_errors: {},
                signup_input_errors: {}
            },
            hasErrors: false,
            expectedError: '' //this should match loginPageState.login_input_errors.key
        },
        {
            description: 'renders for SignupForm correctly with errors',
            props: {
                label: "Username",
                name: "username",
                type: "text",
                handleInput: () => {}
            },
            loginPageState: {
                isLoginForm: false,
                login_input_errors: {},
                signup_input_errors: { username: 'error' }
            },
            hasErrors: true,
            expectedError: 'error' //this should match loginPageState.signup_input_errors.key
        }
    ]
    dataProvider.forEach(data => {
        it(data.description, () => {
            // Arrange
            useSelector.mockReturnValue(data.loginPageState)
            
            // Act 
            const { container, getByText } = render(
                <FormInput 
                    label={data.props.label} 
                    name={data.props.name}
                    type={data.props.type} 
                    handleInput={data.props.handleInput}/>
            )
            // Assert
            expect(container.getElementsByTagName('input').length).toEqual(1);
            expect(getByText(data.props.label)).toBeVisible();
            if (data.hasErrors) {
                expect(getByText(data.expectedError)).toBeVisible();
            }
        })
    })
})

describe('FormButton', () => {
    const dataProvider = [
        {
            description: 'shows ClipLoader when saving',
            loginPage: { isSaving: true },
            willClick: false
        },
        {
            description: 'does not show ClipLoader when not saving',
            loginPage: { isSaving: false },
            willClick: false
        },
        {
            description: 'calls handleFormSubmit on click',
            loginPage: { isSaving: false },
            willClick: true
        }
    ]

    dataProvider.forEach(data => {
        it(data.description, async () => {
            //Arrange
            useSelector.mockReturnValue(data.loginPage)

            const props = {
                handleFormSubmit: jest.fn(),
                formButtonText: 'Login'
            }

            //Act
            const { getByText, container } = render(
                <FormButton formButtonText={props.formButtonText} handleFormSubmit={props.handleFormSubmit}/>
            );

            //Assert
            data.loginPage.isSaving ? 
                expect(container.getElementsByTagName('span').item(0)).toBeVisible() :
                expect(getByText(props.formButtonText)).toBeVisible();

            if (!data.willClick) {
                return;
            }

            fireEvent.click(container.getElementsByTagName('button').item(0));
            expect(props.handleFormSubmit).toHaveBeenCalled();
        })
    })
})

describe('LoginPage', () => {
    let dataProvider = [
        { isLoginForm: true },
        { isLoginForm: false }
    ];
    dataProvider.forEach(({isLoginForm}) => {
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
            useSelector.mockReturnValue(loginPage)
            const dispatchMock = action => {
                loginPage = loginPageReducer(loginPage, action)
            }
            useDispatch.mockReturnValue(dispatchMock)
            //Act 
            const { container } = render(<LoginPage />)
            const usernameInput = container.getElementsByTagName('input').item(0)
            fireEvent.change(usernameInput, {target: {value: 'John Doe'}})
            //Assert
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
            useSelector
                .mockReturnValue(data.loginPage) //default
                .mockReturnValueOnce(data.loginPage) //first call
                .mockReturnValueOnce(data.loginPage.isSaving) //second call
            
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

    // it('wipes errors on input change - login')
    // it('wipes errors on input change - signup')

    // it('on successful login it calls dispatch with login')
    // it('on successful signup it calls dispatch with signup')

    // it('switches forms on bottom link click')
})
