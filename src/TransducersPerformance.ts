import R, { times } from 'ramda'

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

const isEven = (num: number): boolean => num % 2 === 0
const endsWith0 = (num: number): boolean => num % 10 === 0
const square = (num: number): number => num ** 2
const addRandom = (num: number): number => num + randomInt(1000)

const tIsEven = tFilter<number, number[]>(isEven)
const tEndsWith0 = tFilter<number, number[]>(endsWith0)
const tSquare = tMap<number, number, number[]>(square)
const tAddRandom = tMap<number, number, number[]>(addRandom)

const toArray = <Value>(acc: Value[], current: Value) => {
    acc.push(current)
    return acc
}

const composed = R.compose(tIsEven, tAddRandom, tEndsWith0, tAddRandom, tSquare, tIsEven)(toArray)

const length = 1_000_000
const randomInt = (max: number): number => Math.floor(Math.random() * max)

console.time('Array fill')
const numbers = Array.from(Array(length), () => randomInt(length * 100))
console.timeEnd('Array fill')

console.time('Transducers')
console.log(R.reduce(composed, [], numbers))
console.timeEnd('Transducers')

console.time('Normal')
console.log(
    numbers
        .filter(isEven)
        .map(addRandom)
        .filter(endsWith0)
        .map(addRandom)
        .map(square)
        .filter(isEven)
)
console.timeEnd('Normal')
