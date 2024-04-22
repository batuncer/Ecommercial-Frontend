import { createContext, useEffect, useReducer, useCallback } from 'react';

import { setSession } from './util';

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
    if (action.type === TYPE_REGISTER) {
        return {
            ...state,
            isSuccessRegister: true
        }
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

            const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';



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
    const login = async (token) => {
        setSession(token);
        const user = JSON.parse(atob(token.split('.')[1]));
        dispatch({
            type: TYPE_LOGIN,
            payload: {
                user: user,
            },
        });

    };




    const register = async (email, password, name, file, role) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                    file,
                    role
                })
            });

            if (!response.ok) {
                // Hata durumunu kontrol et
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed");
            }

            const { token } = await response.json();

            setSession(token);
            dispatch({
                type: TYPE_SUCCESS_REGISTER
            });
        } catch (error) {
            // Hata durumunda işlemleri yönet
            console.error("Error during registration:", error);
            // Hata durumunu uygun şekilde işleyin veya kullanıcıya gösterin
        }
    };




    // LOGOUT
    const logout = async () => {
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