import { useEffect, useRef } from 'react'
import RegularButton from './RegularButton'
import Leaderboard from './Leaderboard'
import MemoryCard from './MemoryCard'

export default function GameOver({
    handleReset,
    handlePlayAgain,
    playerName,
    timeTaken,
    leaderboard,
    emojisData,
    matchedCards
}) {
    const divRef = useRef(null)

    useEffect(() => {
        divRef.current?.focus()
    }, [])

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const totalPairs = emojisData ? emojisData.length / 2 : 0
    const matchedPairs = matchedCards ? matchedCards.length / 2 : 0

    return (
        <div className="gameover-page" tabIndex={0} ref={divRef}>
            {/* ── Top header bar ── */}
            <header className="gameover-header">
                <h1 className="gameover-header__title">MEMORY GAME</h1>
                <div className="gameover-header__right">
                    <span className="gameover-header__player">Player: <strong>{playerName}</strong></span>
                    <span className="gameover-header__timer">TIME: {formatTime(timeTaken)}</span>
                </div>
            </header>

            {/* ── Win banner ── */}
            <div className="gameover-banner">
                <p className="gameover-banner__text">
                    🎉 You Matched All Cards in <strong>{formatTime(timeTaken)}</strong>!
                </p>
                <div className="gameover-banner__actions">
                    <RegularButton handleClick={handlePlayAgain}>Play Again</RegularButton>
                    <button className="btn btn--outline" onClick={handleReset}>Reset Game</button>
                </div>
            </div>

            {/* ── Body: board + leaderboard side by side ── */}
            <div className="gameover-body">
                {/* Left: frozen game board */}
                <div className="gameover-board">
                    <p className="gameover-board__label">
                        GameBoard ({matchedPairs} / {totalPairs} Matches)
                    </p>
                    {emojisData && (
                        <MemoryCard
                            handleClick={() => {}}
                            data={emojisData}
                            selectedCards={[]}
                            matchedCards={matchedCards || []}
                        />
                    )}
                </div>

                {/* Right: leaderboard */}
                <aside className="gameover-leaderboard">
                    <Leaderboard entries={leaderboard} currentPlayer={playerName} />
                </aside>
            </div>
        </div>
    )
}