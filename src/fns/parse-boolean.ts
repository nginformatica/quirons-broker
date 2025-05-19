export function parseBoolean(value: unknown): boolean | undefined {
    if (typeof value === 'string') {
        return value === 'true' || value === '1'
    }
    return value as boolean | undefined
}