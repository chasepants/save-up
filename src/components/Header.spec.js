import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header, { DropDownItem, Logo } from './Header'
import * as redux from 'react-redux';
import * as user from '../redux/thunks/user'
import React from 'react'

beforeEach(() => jest.clearAllMocks())
afterEach(() => {
  jest.clearAllMocks()
  cleanup()  
})

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('DropDownItem behaves correctly', () => {
  it('calls handle link', async () => {
    // ARRANGE
    const props = {
      label: 'Bank Accounts',
      handleLinkClick: jest.fn(),
      path: 'bank-accounts'
    }

    // ACT
    render(<DropDownItem label={props.label} path={props.path} handleLinkClick={props.handleLinkClick} />)
    let event = fireEvent.click(screen.getByText(props.label))

    // ASSERT
    expect(screen.getByText(props.label)).toBeVisible()
    expect(props.handleLinkClick).toHaveBeenCalled()
  })
})

describe('Logo behaves correctly', () => {
  it('calls handle link', async () => {
    // ACT
    render(<Logo />)
    fireEvent.click(screen.getByText('Save Up'))

    // ASSERT
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/goals', { replace: true });
  })
})

describe('Header behaves correctly', () => {
  const useDispatchSpy = jest.spyOn(redux, 'useDispatch'); 
  const useSelectorSpy = jest.spyOn(redux, 'useSelector'); 
  const mockDispatchFn = jest.fn();

  [ true, false ].forEach(valid => {
    it(`renders passed on auth being ${valid}`, () => {
      // ARRANGE
      const auth = { valid }

      useDispatchSpy.mockReturnValue(mockDispatchFn);
      useSelectorSpy.mockReturnValue(auth)

      // ACT
      let { container, getByText } = render(<Header />)

      // ASSERT
      if (valid) {
        expect(getByText('Save Up')).toBeVisible()
      } else {
        expect(container.firstChild).toBeEmptyDOMElement()
      }
    })
  })

  it('handles link clicks correctly', async () => {
    // ARRANGE
    const auth = { valid: true }
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useSelectorSpy.mockReturnValue(auth)

    const setShowMenuOptionsMock = jest.fn();
    const useStateMock = any => [any, setShowMenuOptionsMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    
    // ACT
    const { getByText } = render(<Header />)
    fireEvent.click(getByText('Bank Accounts'))

    // ASSERT
    expect(mockedUsedNavigate).toBeCalledWith('bank-accounts', {replace: true})
    expect(setShowMenuOptionsMock).toBeCalledWith(false)
  })

  it('handles logout correctly', async () => {
    // ARRANGE
    const auth = { valid: true }
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useSelectorSpy.mockReturnValue(auth)

    const setShowMenuOptionsMock = jest.fn();
    const useStateMock = any => [any, setShowMenuOptionsMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    
    const logoutMockReturn = jest.fn()
    jest.spyOn(user, 'logout').mockReturnValue(logoutMockReturn)

    // ACT
    const { getByText } = render(<Header />)
    fireEvent.click(getByText('Logout'))

    // ASSERT
    expect(mockDispatchFn).toBeCalledWith(logoutMockReturn)
    expect(setShowMenuOptionsMock).toBeCalledWith(false)
  })
})
