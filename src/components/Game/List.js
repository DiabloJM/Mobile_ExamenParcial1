import React from 'react';
import './List.css'

const List = props => {
    const {attempts} = props;
    
    return (
        <ul>
            {
                attempts.map((attempt) => (
                <li>
                    {attempt.attemptNumber}
                </li>
            ))

            }
        </ul>
    );
};

export default List;