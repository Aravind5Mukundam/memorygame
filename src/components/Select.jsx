import React from 'react'
import { data } from '../data/data'
import Option from './Option'
const Select = ({handleChange}) => {
    const selectEl = Object.entries(data).map(([ key, value]) => (
        <div key={key} className="form__inner-wrapper">
            <label htmlFor={key}>Select a {key}</label>
            <select
                name={key}
                id={key}
                onChange={handleChange}
            >
                 <Option valueArray={value} />
            </select>
        </div>
    ))
  return (
    <>{selectEl}</>
  )
}

export default Select