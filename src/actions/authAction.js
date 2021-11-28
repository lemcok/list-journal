import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import Swal from 'sweetalert2'
import { finishLoading, startLoading } from "./uiAction";
import { noteLogout } from "./notesAction";

export const startLoginEmailPassword = ( email, password ) => ( dispatch ) => {
    
    dispatch( startLoading() )

    firebase.auth().signInWithEmailAndPassword( email, password )
    .then( ({user}) => {
        dispatch( login( user.uid, user.displayName ) )
        dispatch( finishLoading() )
    } )
    .catch( e => {
        dispatch( finishLoading() )
        Swal.fire('Error', e.message, 'error');
    } )
}

export const startRegisterWithEmailPassword = ( email, password, name ) => ( dispatch ) => {
    firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async({ user }) => {
            await user.updateProfile({ displayName: name })
            dispatch( login( user.uid, user.displayName ) )
        } )
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
        } )
}


export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({user}) => {
                dispatch( login( user.uid, user.displayName ) )
            } )
    }
}

export const login = ( uid, displayName  ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => async( dispatch ) => {
    await firebase.auth().signOut();
    dispatch( logout() )
    dispatch( noteLogout() )
}
export const logout = () => ({
    type: types.logout,
})

