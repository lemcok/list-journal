import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notesAction';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, date } = formValues;

    const activeId = useRef( note.id );
    const urlNew = useRef( note.url );

    useEffect(() => {
        if( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
        urlNew.current = note.url;
    }, [ note, reset  ])

    useEffect(() => {
        dispatch( activeNote( formValues.id, { ...formValues, url: urlNew.current } ) )
    }, [formValues, dispatch])

    return (
        <div className="notes__main-content">
            <NotesAppBar date={ date } />

            <div className="notes__content">
                <input 
                    type="text"
                    name="title"
                    placeholder="Some title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />
                <textarea 
                    className="notes_textarea mb-5"
                    name="body"
                    placeholder="What happened" 
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>
                {
                    (note.url)
                        && (
                            <div className="notes__image">
                                <img 
                                    src={ note.url } 
                                    alt="imagen" 
                                />
                            </div>
                        )
                }
            </div>
            <button 
                className='btn btn-danger'
                onClick={ () => dispatch(startDeleting( note.id ))  }
            >Delete</button>

        </div>
    )
}
