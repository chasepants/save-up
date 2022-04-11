import { render } from "@testing-library/react"
import { useSelector } from "react-redux";
import { AddSavingsPlanInputs, AutomaticTransfersSectionTitle } from './AddSavingsGoalForm'


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}));
  
afterEach(() => jest.clearAllMocks())

describe('AutomaticTransfersSectionTitle', () => {
    it('show "Only available after linking more than one bank account" if length is 0', () => {
        const { getByText } = render(<AutomaticTransfersSectionTitle length={0}/>)
        expect(getByText("Only available after linking more than one bank account")).toBeVisible()
    })
})

describe('AddSavingsPlanInputs', () => {
    it('shows nothing when plaid items length is < 0', () => {
        // Arrange
        const plaid_items = [];
        const handleInput = jest.fn()

        useSelector.mockReturnValue({ savings_goal_input_errors: {} });
    
        // Act 
        const { container } = render(<AddSavingsPlanInputs plaid_items={plaid_items} handleInput={handleInput}/>)

        //Arrange
        expect(container.childElementCount).toEqual(1);
    })
    it('shows error when savings_goal_input_errors are present', () => {
        // Arrange
        const plaid_items = [{
            requestId: '1234',
            accounts: [],
            item: {}
        }];

        const handleInput = jest.fn()

        useSelector.mockReturnValue({ savings_goal_input_errors: { cadence: 'Error' } });

        // Act
        const { getByText } = render(<AddSavingsPlanInputs plaid_items={plaid_items} handleInput={handleInput}/>)

        // Arrange
        expect(getByText('Error')).toBeVisible();
    })
})
