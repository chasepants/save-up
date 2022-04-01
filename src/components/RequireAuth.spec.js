jest.mock('react-router-dom')
jest.mock('react-redux')

import { render } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import authActions from '../redux/actions/authActions';
import RequireAuth from './RequireAuth';

describe('RequireAuth', () => {
    const dataProvider = [
        {
            testCaseDescription: 'It returns children and does not clear auth',
            selectorReturn: { username: 'johndoe', valid: true },
            isDispatchCalled: false,
            willPageNavigate: false
        },
        {
            testCaseDescription: 'It navigates away if valid is false',
            selectorReturn: { username: 'johndoe', valid: false },
            isDispatchCalled: false,
            willPageNavigate: true
        },
        {
            testCaseDescription: 'It calls dispatch navigates away if valid is false',
            selectorReturn: { valid: false },
            isDispatchCalled: true,
            willPageNavigate: true
        },
    ]

    dataProvider.forEach(data => {
        it(`${data.testCaseDescription}`, () => {
            useSelector.mockReturnValue(data.selectorReturn)
            useLocation.mockReturnValue({ location: '/login' })
            const dispatchMock = jest.fn()
            useDispatch.mockReturnValue(dispatchMock)
            Navigate.mockReturnValue(<div>New Page</div>)
            const { getByText } = render(<RequireAuth><div>Children</div></RequireAuth>)
            
            if (data.selectorReturn.valid) {
                expect(getByText('Children')).toBeVisible()
            }

            if (data.willPageNavigate) {
                expect(getByText('New Page')).toBeVisible()
            }

            if (data.isDispatchCalled) {
                expect(dispatchMock).toHaveBeenCalledWith(authActions.clearAuth())
            }
        })
    })
})
