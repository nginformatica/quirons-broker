export function parseTime(time: string): number {
    const dailyFormat = new RegExp('^([0-9]{1,3}):[0-5][0-9]$')
    const decimalFormat = new RegExp('^([0-9]+)([.,][0-9]+)?$')
 
    let result = 0
 
    if (dailyFormat.test(time)) {
        const [hours, minutes] = time.split(':')
        const decimals = (Number(minutes) / 6) * 10
        result = parseFloat(`${parseInt(hours, 10)}.${parseInt(decimals.toString(), 10)}`)
    } else if (decimalFormat.test(time)) {
        time = time.replace(',', '.')
        result = parseFloat(time)
    }
 
    return parseFloat(result.toFixed(2))
}