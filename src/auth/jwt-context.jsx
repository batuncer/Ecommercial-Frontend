import { createContext, useEffect, useReducer, useCallback } from 'react';

import { setSession } from './util';
import { config } from '../config';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------
const TYPE_INITIALIZE = "INITIALIZE"
const TYPE_LOGIN = "LOGIN"
const TYPE_REGISTER = "REGISTER"
const TYPE_LOGOUT = "LOGOUT"
const TYPE_SUCCESS_REGISTER = "SUCESS_REGISTER"

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
    isSuccessRegister: false
};

const reducer = (state, action) => {
    if (action.type === TYPE_INITIALIZE) {
        return {
            isInitialized: true,
            isAuthenticated: action.payload.isAuthenticated,
            user: action.payload.user,
            isSuccessRegister: false

        };
    }
    if (action.type === TYPE_LOGIN) {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,

        };
    }
    if (action.type === TYPE_REGISTER) {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
        };
    }
    if (action.type === TYPE_LOGOUT) {
        return {
            ...state,
            isAuthenticated: false,
            user: null,

        };
    }
    if (action.type === TYPE_SUCCESS_REGISTER) {
        return {
            ...state,
            isSuccessRegister: true
        };
    }

    return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------



export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const initialize = useCallback(async () => {
        try {

            const accessToken = typeof window !== 'undefined' ? localStorage.getItem('token') : '';


            if (accessToken) {
                setSession(accessToken);
                const user = JSON.parse(atob(accessToken.split('.')[1]));
                dispatch({
                    type: TYPE_INITIALIZE,
                    payload: {
                        isAuthenticated: true,
                        user,
                    },
                });
            }
            else {
                dispatch({
                    type: TYPE_INITIALIZE,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }

        } catch (error) {
            console.error(error);
            dispatch({
                type: TYPE_INITIALIZE,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    // LOGIN
    const login = async (username, password, navigate) => {
        try {
            const response = await fetch(`${config.api.url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });


            const data = await response.json();

            const { user, token } = data;
            if (!token) {
                throw new Error('Token not found in response');
            }

            localStorage.setItem('token', token);
            dispatch({
                type: TYPE_LOGIN,
                payload: {
                    user
                },
            });
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
        }
    };



    const register = async (email, password, username, role) => {
        try {
            const response = await fetch(`${config.api.url}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed");
            }

            const { token } = await response.json();

            setSession(token);
            dispatch({
                type: TYPE_SUCCESS_REGISTER
            });
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };



    // LOGOUT
    const logout = async () => {
        localStorage.removeItem('token');
        setSession(null);
        dispatch({
            type: TYPE_LOGOUT,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
                register,


            }}
        >
            {children}
        </AuthContext.Provider>
    );
}