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

const getUsersFirstNumber = (user: typeof users[number]) => user.phones[0]
const getSpanishNumbers = (phone: string) => phone.startsWith('+34')

const tGetUsersFirstNumberAsString = tMap<typeof users[number], string, string>(getUsersFirstNumber)
const tGetSpanishNumbersAsString = tFilter<string, string>(getSpanishNumbers)

const composed = R.compose(tGetUsersFirstNumberAsString, tGetSpanishNumbersAsString)

console.log(
    'Transducers',
    users
        .reduce(
            composed((acc, current) => `${acc},${current}`),
            ''
        )
        .slice(1)
)

console.log('Normal', users.map(getUsersFirstNumber).filter(getSpanishNumbers).join())
