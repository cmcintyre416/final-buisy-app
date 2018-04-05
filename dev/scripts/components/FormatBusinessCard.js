import React from 'react';

export default function (props) {
    return (
        <div className="card">
            <ul className="card__list">
                <li className="card__listItem name"><span></span> {props.card.name}</li>
                <li className="card__listItem"><span></span> {props.card.jobTitle}</li>
                <li className="card__listItem"><span></span> {props.card.company}</li>
                <li className="card__listItem"><span></span> {props.card.phone}</li>
                <li className="card__listItem"><span></span> {props.card.email}</li>
                <li className="card__listItem"><span>Interaction Notes:</span> {props.card.interactionNotes}</li>
                <li className="deleteButton">
                    <button onClick={() => props.remove(props.card.key)}>Delete Business Card</button>
                </li>
            </ul>

        </div>
    )
}
