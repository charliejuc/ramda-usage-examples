import R from 'ramda'

type Reducer<Acc, Current> = (acc: Acc, current: Current) => Acc
// (transform) => (reducer) => (acc, current) => reducer(acc, transform(current))
const tMap =
    <Value, TransformResult, Acc>(transform: (value: Value) => TransformResult) =>
    (reducer: Reducer<Acc, TransformResult>) =>
    (acc: Acc, current: Value): Acc =>
        reducer(acc, transform(current))

// (condition) => (reducer) => (acc, current) => condition(current) ? reducer(acc, current) : acc
const tFilter =
    <Value, Acc>(condition: (value: Value) => boolean) =>
    (reducer: Reducer<Acc, Value>) =>
    (acc: Acc, current: Value): Acc =>
        condition(current) ? reducer(acc, current) : acc

const users = [
    {
        username: 'Sara',
        phones: ['+34622918700', '+34750296795']
    },
    {
        username: 'Ethan',
        phones: ['+49657938702', '+49657296710']
    },
    {
        username: 'Lily',
        phones: ['+34757431300', '+34611490741']
    }
]

const getUsersFirstNumber = <Acc>() =>
    tMap<typeof users[number], string, Acc>((user) => user.phones[0])
const spanishNumbers = <Acc>() => tFilter<string, Acc>((phone) => phone.startsWith('+34'))

const getUsersFirstNumberAsString = getUsersFirstNumber<string>()
const spanishNumbersAsString = spanishNumbers<string>()

const composed = R.compose(getUsersFirstNumberAsString, spanishNumbersAsString)

console.log(
    users
        .reduce(
            composed((acc, current) => `${acc},${current}`),
            ''
        )
        .slice(1)
)
