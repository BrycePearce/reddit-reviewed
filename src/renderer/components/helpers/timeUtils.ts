const EPOCH_TIMES = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
] as const;

export const timeAgoFromEpoch = (timestamp: number | null | undefined) => {
    if (!timestamp || isNaN(timestamp)) {
        return '';
    }

    const seconds = Math.floor(Date.now() / 1000 - timestamp);

    if (seconds < 0) {
        return 'Invalid date';
    }

    for (const { unit, seconds: unitSeconds } of EPOCH_TIMES) {
        const interval = Math.floor(seconds / unitSeconds);
        if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }

    return 'just now';
};
