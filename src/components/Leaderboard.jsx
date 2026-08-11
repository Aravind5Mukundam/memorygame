export default function Leaderboard({ entries, currentPlayer }) {
    if (!entries || entries.length === 0) return null

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    // Group entries by player name (case-insensitive), collect all times per player
    const grouped = []
    entries.forEach(entry => {
        const key = entry.name.trim().toLowerCase()
        const existing = grouped.find(g => g.key === key)
        if (existing) {
            existing.times.push(entry.time)
        } else {
            grouped.push({ key, name: entry.name.trim(), times: [entry.time] })
        }
    })

    // Sort each player's times ascending, then sort players by their best (first) time
    grouped.forEach(g => g.times.sort((a, b) => a - b))
    grouped.sort((a, b) => a.times[0] - b.times[0])

    return (
        <div className="leaderboard">
            <h2 className="leaderboard__title">🏆 LEADERBOARD</h2>
            <table className="leaderboard__table">
                <thead>
                    <tr>
                        <th className="leaderboard__th-rank">Rank</th>
                        <th className="leaderboard__th-player">Player</th>
                        <th className="leaderboard__th-times">Durations</th>
                    </tr>
                </thead>
                <tbody>
                    {grouped.map((entry, i) => {
                        const isCurrentPlayer = currentPlayer &&
                            entry.key === currentPlayer.trim().toLowerCase()
                        return (
                            <tr
                                key={entry.key}
                                className={`leaderboard__row ${isCurrentPlayer ? 'leaderboard__row--current' : ''}`}
                            >
                                <td className="leaderboard__rank">#{i + 1}</td>
                                <td className="leaderboard__name">{entry.name}</td>
                                <td className="leaderboard__times-cell">
                                    <div className="leaderboard__times-wrap">
                                        {entry.times.map((t, ti) => (
                                            <span key={ti} className="leaderboard__time-badge">
                                                {formatTime(t)}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}