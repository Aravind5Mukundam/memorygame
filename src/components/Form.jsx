import { useRef, useEffect } from 'react'
import RegularButton from './RegularButton'
import Select from './Select'

export default function Form({ handleSubmit, handleChange, handleNameChange, playerName, isFirstRender }) {
    const divRef = useRef(null)

    useEffect(() => {
        !isFirstRender && divRef.current.focus()
    }, [isFirstRender])

    return (
        <div className="form-container" ref={divRef} tabIndex={-1}>
            <p className="p--regular">
                Select an emoji category and the number of memory cards to play the game.
            </p>
            <form className="wrapper" onSubmit={handleSubmit}>
                <Select handleChange={handleChange} />

                <div className="form__inner-wrapper">
                    <label htmlFor="playerName">Your Name</label>
                    <input
                        id="playerName"
                        name="playerName"
                        type="text"
                        placeholder="e.g. Alex"
                        value={playerName}
                        onChange={handleNameChange}
                        required
                        maxLength={24}
                        className="player-name-input"
                        autoComplete="off"
                    />
                </div>

                <RegularButton handleClick={handleSubmit}>
                    Start Game
                </RegularButton>
            </form>
        </div>
    )
}