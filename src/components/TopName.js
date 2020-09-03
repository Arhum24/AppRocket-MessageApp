import React from 'react'

export default function Name({ user, showName }) {
    return (
        <div className="name-component">
            {showName && <h3 className="name-title">{user.name}</h3>}
        </div>
    )
}
