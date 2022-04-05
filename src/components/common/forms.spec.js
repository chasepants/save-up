import { fireEvent, render } from "@testing-library/react";
import { useSelector } from 'react-redux';
import { FormButton, FormDropDown, FormInput } from './forms';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}));

afterEach(() => jest.clearAllMocks())

describe('FormButton', () => {
    const dataProvider = [
        {
            description: 'shows ClipLoader when saving',
            state: { loginPage: { isSaving: true } },
            willClick: false,
            props: {
                formButtonText: 'Login',
                form: 'loginPage',
                showCustomButton: false,
                customButton: <div>Custom Button</div>,
                error: ''
            }
        },
        {
            description: 'does not show ClipLoader when not saving',
            state: { loginPage: { isSaving: false } },
            willClick: false,
            props: {
                formButtonText: 'Login',
                form: 'loginPage',
                showCustomButton: false,
                customButton: <div>Custom Button</div>,
                error: ''
            }
            
        },
        {
            description: 'does not show ClipLoader when error is present when saving',
            state: { loginPage: { isSaving: true } },
            willClick: false,
            props: {
                formButtonText: 'Login',
                form: 'loginPage',
                showCustomButton: false,
                customButton: <div>Custom Button</div>,
                error: 'Something went wrong'
            }
        },
        {
            description: 'calls handleFormSubmit on click',
            state: { loginPage: { isSaving: false } },
            willClick: true,
            props: {
                formButtonText: 'Login',
                form: 'loginPage',
                showCustomButton: false,
                customButton: <div>Custom Button</div>,
                error: ''
            }
        },
        {
            description: 'calls handleFormSubmit on click',
            state: { loginPage: { isSaving: false } },
            willClick: true,
            props: {
                formButtonText: 'Login',
                form: 'loginPage',
                showCustomButton: true,
                customButton: <div>Custom Button</div>,
                error: ''
            }
        }
    ]

    dataProvider.forEach(data => {
        it(data.description, async () => {
            //Arrange
            const isSaving = data.props.form === 'loginPage' ? data.state.loginPage.isSaving : data.state.addSavingsGoalForm.isSaving;
            useSelector.mockReturnValue(data.state)
            data.props.handleFormSubmit = jest.fn()

            //Act
            const { getByText, container } = render(
                <FormButton 
                    formButtonText={data.props.formButtonText}
                    handleFormSubmit={data.props.handleFormSubmit}
                    showCustomButton={data.props.showCustomButton}
                    customButton={data.props.customButton}
                    form={data.props.form}
                    error={data.props.error}/>
            );

            //Assert
            if (isSaving && data.props.error === '') { //how can I pass in these expectations, so that logic can be removed from test
                expect(container.getElementsByTagName('span').item(0)).toBeVisible();
            } else {
                expect(getByText(data.props.formButtonText)).toBeVisible();
            }

            if (data.props.showCustomButton) {
                expect(getByText('Custom Button')).toBeVisible();
            }

            if (!data.willClick) {
                return;
            }

            fireEvent.click(container.getElementsByTagName('button').item(0));
            expect(data.props.handleFormSubmit).toHaveBeenCalled();
        })
    })
})



describe('FormInput', () => {
    const dataProvider = [
        {
            description: 'renders with no errors',
            props: {
                label: "Username",
                name: "username",
                type: "text",
                handleInput: jest.fn(),
                error: ''
            },
            hasErrors: false,
        },
        {
            description: 'renders with no errors',
            props: {
                label: "Username",
                name: "username",
                type: "text",
                handleInput: jest.fn(),
                error: 'Please enter a username'
            },
            hasErrors: true,
        },
        {
            description: 'renders with no errors',
            props: {
                label: "Username",
                name: "username",
                type: "text",
                handleInput: jest.fn(),
                error: ''
            },
            hasErrors: false,
        }
    ]
    dataProvider.forEach(data => {
        it(data.description, () => {
            // Act 
            const { container, getByText } = render(
                <FormInput 
                    label={data.props.label} 
                    name={data.props.name}
                    type={data.props.type} 
                    handleInput={data.props.handleInput}
                    error={data.props.error}/>
            )

            // Assert
            expect(container.getElementsByTagName('input').length).toEqual(1);
            expect(getByText(data.props.label)).toBeVisible();
            if (data.hasErrors) {
                expect(getByText(data.props.error)).toBeVisible();
            }

            // Act
            fireEvent.change(container.getElementsByTagName('input').item(0), { target: { value: 'johndoe' } });
            expect(data.props.handleInput).toHaveBeenCalled()
        })
    })
})

describe('FromDropDown', () => {
    // it('renders all options on click')
    // it('call handleInpute on change')
    // it('shows errors')
    it('does all the above', () => {
        const props = {
            label: "Username",
            name: "username",
            options: [
                <option key='1' value='1'>1</option>,
                <option key='2' value='2'>2</option>,
                <option key='3' value='3'>3</option>
            ],
            handleInput: jest.fn(),
            error: 'Please enter a username'
        }

        const { container, getByText } = render(
            <FormDropDown error={props.error} label={props.label} name={props.name} options={props.options} handleInput={props.handleInput}/>
        );
        fireEvent.click(getByText(props.label));
        expect(container.getElementsByTagName('option').length).toEqual(props.options.length+1);
        expect(getByText(props.error)).toBeVisible();
    })
})
