import R from 'ramda'

const people = [
    { name: 'Emma', age: 70, weight: 62 },
    { name: 'Peter', age: 78 },
    { name: 'Mikhail', age: 62 }
]

const sortByAge =
    (sortDirection: (value: { age: number }, nextValue: typeof value) => number) =>
    <Value>(list: Array<Value & { age: number }>): typeof list =>
        list.slice().sort(sortDirection)

const _sortByAge = (
    sortDirection: typeof R.descend | typeof R.ascend
): (<Value>(list: Array<Value & { age: number }>) => typeof list) =>
    R.sort(sortDirection(R.prop('age')))

console.log('Normal')
console.log(sortByAge((value, nextValue) => nextValue.age - value.age)(people))
console.log(sortByAge((value, nextValue) => value.age - nextValue.age)(people))

console.log('Ramda')
console.log(_sortByAge(R.descend)(people))
console.log(_sortByAge(R.ascend)(people))

console.log()
