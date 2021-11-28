import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/authAction';
import { startNewNote } from '../../actions/notesAction';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);        

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNew = () => {
        dispatch( startNewNote() )
    }
    

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">
                <h3>
                    <i className="far fa-moon mr-1"></i>
                    <span>{ name }</span>
                </h3>
                <button 
                    className="btn"
                    onClick={ handleLogout }
                >Logout</button> 
            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleAddNew }
            >
                <i className="far fa-calendar-plus fa-3x"></i>
                <p className="mt-5">new entry</p>
            </div>

            <JournalEntries  />

        </aside>
    )
}
