import React from 'react'

const Option = ({ valueArray }) => {
    const optionEl = valueArray.map(({ name, value }) => (
        <option key={value} value={value}>
            {name ? name : value}
        </option>
    ))
    
    return <>{optionEl}</>
}

export default Option