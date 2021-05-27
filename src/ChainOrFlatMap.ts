import R from 'ramda'

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

const phonesList = R.chain(R.prop('phones'), users)
console.log(phonesList)

const phonesReplacePrefix: (value: string[]) => string[] = R.map(R.replace(/^\+[0-9]{2}/, ''))

console.log(R.chain<string[], string[], string[]>(R.concat, phonesReplacePrefix)(phonesList))
console.log
