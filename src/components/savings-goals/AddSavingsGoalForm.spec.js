import { render } from "@testing-library/react"
import { AutomaticTransfersSectionTitle } from './AddSavingsGoalForm'


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

// describe('SavingsPlanAccountDropDown')
// describe('AddSavingsPlanInputs')
    // A LOT
// describe('AddSavingsGoalForm')
    // A LOT