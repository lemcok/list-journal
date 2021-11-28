import React from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notesAction';

export const JournalEntry = ({ id, date, title, body, url }) => {
    const dispatch = useDispatch();
    const noteDate = dayjs(date);

    
    const HandleSelectEntry = () => {
        dispatch( activeNote( id, {date, title, body, url} ) )
    }
    
    const { active: noteActive } = useSelector(state => state.notes)

    return (
        <div 
            className="journal__entry animate__animated animate__fadeIn animate_faster"
            onClick={ HandleSelectEntry }
        >
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${ (noteActive?.id === id) ? noteActive.url : url })`
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { (noteActive?.id === id) ? noteActive.title : title }
                </p>
                <p className="journal__entry-content">
                    { (noteActive?.id === id) ? noteActive.body : body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('DD')}</h4>
            </div>

        </div>
    )
}
