export function parseBoolean(value: unknown): boolean {
    if (typeof value === 'string') {
        return value === 'true' || value === '1'
    }
    return !!value
}