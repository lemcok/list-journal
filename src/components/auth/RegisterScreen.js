import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegisterWithEmailPassword } from '../../actions/authAction'
import { removeError, setError } from '../../actions/uiAction'
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui)
    

    const [ formValues, handleInputChange ] = useForm({
        name: 'Adriana',
        email: 'adri@example.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            console.log('form is ok')
        }

        dispatch( startRegisterWithEmailPassword( email, password, name ) )
    }

    const isFormValid = () => {
        if ( name.trim().length <= 3 ) {
            dispatch( setError( 'name is required' ) )
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError( 'email is not correct' ) )
            return false;
        } else if( password !== password2 || password.length < 3 ) {
            dispatch( setError( 'password should be at least 6 characters and match each other' ) )
            return false;
        }
        
        dispatch( removeError() )
        return true;
    }
    

    return (
        <>
            <h3 className="auth__title">Register</h3>
            
            <form 
                onSubmit={ handleRegister }
                className='animate__animated animate__fadeIn animate_faster'
            >
                {
                    msgError && 
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    autoComplete="off"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ name }
                />
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    autoComplete="off"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ email }
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ password }
                />
                <input 
                    type="password" 
                    name="password2" 
                    placeholder="confirm" 
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ password2 }
                />
                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>
            </form>
        </>
    )
}
