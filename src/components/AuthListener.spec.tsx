import { render } from '@testing-library/react';
import { combineReducers, createStore } from 'redux';
import AuthListener from './AuthListener';
import auth, { AuthState } from '../redux/reducers/auth';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

describe('AuthListener', () => {
    it('renders children when auth.valid is false', () => {
        // Arrange
        const store = createStore(combineReducers({ auth }));

        // Act
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthListener> <p>Not Logged In</p> </AuthListener>
                </BrowserRouter>
            </Provider>
        );

        // Assert
        expect(getByText('Not Logged In')).toBeVisible();
    })

    it('renders children when auth.valid is true', async () => {
        // Arrange
        const authState: AuthState = {
            valid: true,
            token: '',
            error: 'none'
        }
        const store = createStore(combineReducers({ auth }), { auth: authState });

        console.log(store.getState());

        // Act
        const { getByText } = render(
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<AuthListener> <p>Not Logged In</p> </AuthListener>} />
                            <Route path="goals" element={<p>Goals</p>} />
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        );
        
        // Assert
        expect(getByText('Goals')).toBeVisible();
    })
})
