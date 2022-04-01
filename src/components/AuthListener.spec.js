jest.mock('react-router-dom')

import { render } from "@testing-library/react"
import AuthListener from "./AuthListener"
import * as redux from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'

describe('AuthListener', () => {
    const useSelectorSpy = jest.spyOn(redux, 'useSelector'); 

    it('Renders children from props correctly if auth.valid is false', () => {
        //ARRANGE 
        const auth = { valid: false }
        useSelectorSpy.mockReturnValue(auth)

        useLocation.mockReturnValue({ location: 'localhost:3000/login' });
        
        //ACT
        const { getByText } = render(<AuthListener><h1>Children</h1></AuthListener>)

        //ASSERT
        expect(getByText("Children")).toBeVisible()
    })

    it('Renders a <Navigate/> element if auth.valid is true', () => {
        //ARRANGE 
        const auth = { valid: true }
        useSelectorSpy.mockReturnValue(auth)
        Navigate.mockReturnValue(<div>Page</div>)

        //ACT
        const { getByText } = render(<AuthListener><h1>Children</h1></AuthListener>)

        //ASSERT
        expect(getByText("Page")).toBeVisible()
    })
})
