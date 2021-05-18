import R from 'ramda'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throwed = (value: any): boolean => {
    try {
        return Boolean(JSON.parse(value))
    } catch (error) {
        return false
    }
}
const _throwed = R.tryCatch((value): boolean => Boolean(JSON.parse(value)), R.F)

console.log('Normal')
console.log(throwed('safsdaf'))
console.log(throwed('{}'))

console.log('Ramda')
console.log(_throwed('safsdaf'))
console.log(_throwed('{}'))

console.log()
