export function parseTime(time: string) {
    const validTime = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')

    if (!validTime.test(time)) {
        return 0
    }

    const [hours, minutes] = time.split(':')
    const decimals = ((Number(minutes) / 6) * 10).toString()

    return parseFloat(parseInt(hours, 10) + '.' + parseInt(decimals, 10))
}