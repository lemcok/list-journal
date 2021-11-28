import dayjs from 'dayjs'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, starUploading } from '../../actions/notesAction';

export const NotesAppBar = ({ date }) => {
    const dispatch = useDispatch();
    const noteDate = dayjs( date );
    const { active: note } = useSelector(state => state.notes)

    const handleSaveNote = () => {
        dispatch( startSaveNote( note ) )
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }
    
    const handleFileChange = ( e ) => {
        const file = e.target.files[0];

        if ( file ) {
            dispatch( starUploading( file ) )
        }
    }
    

    return (
        <div className="notes__appbar">

            <span>{ noteDate.format('DD dddd YYYY') }</span>

            <input 
                id="fileSelector"
                type="file" 
                name='file'
                style={{ display: 'none' }} 
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureUpload }
                >
                    picture
                </button>
                <button 
                    className="btn"
                    onClick={ handleSaveNote }
                >
                    save
                </button>
            </div>

        </div>
    )
}
