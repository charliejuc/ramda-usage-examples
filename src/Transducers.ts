import R from 'ramda'

type Reducer<Acc, Current> = (acc: Acc, current: Current) => Acc
const tMap =
    <Value, TransformResult, Acc>(transform: (value: Value) => TransformResult) =>
    (reducer: Reducer<Acc, TransformResult>) =>
    (acc: Acc, current: Value): Acc =>
        reducer(acc, transform(current))

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
const addComma = <Acc>() => tMap<string, string, Acc>((phone) => phone + ',')

const getUsersFirstNumberAsString = getUsersFirstNumber<string>()
const addCommaAsString = addComma<string>()

const composed = R.compose(getUsersFirstNumberAsString, addCommaAsString)

console.log(
    users.reduce(
        composed((acc, current) => acc + current),
        ''
    )
)
