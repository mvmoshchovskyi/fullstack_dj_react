import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    }
}
export const logaut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAutTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logaut())
        }, expirationTime * 1000)
    }
}

export const authLogin = (userName, password) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(`http://127.0.0.1:8000/rest-auth/login/`, {
            userName: userName,
            password: password
        })
            .then(res => {
                const token = res.data.key
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem('token', token)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(token))
                dispatch(checkAutTimeout(3600))
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authSignUp = (userName, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(`http://127.0.0.1:8000/rest-auth/registration/`, {
            userName: userName,
            email: email,
            password1: password1,
            password2: password2

        })
            .then(res => {
                const token = res.data.key
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem('token', token)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(token))
                dispatch(checkAutTimeout(3600))
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (token === undefined) {
            dispatch(logaut())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logaut())
            } else {
                dispatch(authSuccess(dispatch))
                dispatch(checkAutTimeout((expirationDate.getTime()-new Date().getTime()) / 1000))
            }
        }
    }
}