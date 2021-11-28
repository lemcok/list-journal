import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'


import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux'
import { login } from '../actions/authAction'
import { useState } from 'react'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { startLoadingNotes } from '../actions/notesAction'


export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged( async(user) => {             
            if (user?.uid) {
                dispatch( login( user.uid, user.displayName ) )
                setIsLoggedIn( true );
                
                dispatch( startLoadingNotes( user.uid ) )
            }else {
                setIsLoggedIn( false );
            }
            setChecking( false );
        } ) 

    }, [ dispatch ])

    if (checking) {
        return <h2>espere...</h2>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        isLoggedIn={ isLoggedIn }
                        path="/auth" 
                        component={ AuthRouter } 
                    />
                    <PrivateRoute 
                        isLoggedIn={ isLoggedIn } 
                        exact 
                        path="/" 
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}

