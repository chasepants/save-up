jest.mock('react-redux');

import { fireEvent, render } from "@testing-library/react";
import {FormButton, FormInput} from "./LoginPage";
import { useSelector, useDispatch } from 'react-redux';

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
                signup_input_errors: {username: 'error'}
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
            isSaving: true,
            willClick: false
        },
        {
            description: 'does not show ClipLoader when not saving',
            isSaving: false,
            willClick: false
        },
        {
            description: 'calls handleFormSubmit on click',
            isSaving: false,
            willClick: true
        }
    ]

    dataProvider.forEach(data => {
        it(data.description, async () => {
            //Arrange
            useSelector.mockReturnValue(data.isSaving)

            const props = {
                handleFormSubmit: jest.fn(),
                formButtonText: 'Login'
            }

            //Act
            const { getByText, debug, container } = render(
                <FormButton formButtonText={props.formButtonText} handleFormSubmit={props.handleFormSubmit}/>
            );

            //Assert
            data.isSaving ? 
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
