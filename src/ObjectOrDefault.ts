import R from 'ramda'

const objectOrDefault = (value: unknown): Record<string, string> =>
    typeof value === 'object' && value != null ? (value as Record<string, string>) : {}
const _objectOrDefault: (value: unknown) => Record<string, string> = R.ifElse(
    R.both(R.is(Object), R.pipe(R.type, R.equals('Object'))),
    R.identity,
    R.always({})
)

console.log('Normal')
console.log(objectOrDefault({}))
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.log(objectOrDefault(() => {}))
console.log(objectOrDefault(null))
console.log(objectOrDefault(undefined))

console.log('Ramda')
console.log(_objectOrDefault({}))
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.log(_objectOrDefault(() => {}))
console.log(_objectOrDefault(null))
console.log(_objectOrDefault(undefined))

console.log(R.map(_objectOrDefault, [1, 2, '', 4, [], null, undefined, { a: 3 }]))
console.log()
