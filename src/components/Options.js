import React from 'react'

function Options({ name, active, handleClick ,icon}) {
    return (
        <button 
          className={`sidebar-item ${active ? 'active' : ''}`}
          onClick={handleClick}
        >
          {/* {name} */}
          <img src={icon} title={name} alt={name} className="option__icon"/>
        </button>
    )
}

export default Options
