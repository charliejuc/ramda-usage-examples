import R from 'ramda'

const buildObject = <Obj>(obj: Obj): Record<'key1', number> & Record<'key2', number> & Obj => ({
    ...obj,
    key1: 1,
    key2: 2
})
const _buildObject = R.pipe(R.assoc('key1', 1), R.assoc('key2', 2))

const obj = {
    init: true
}
console.log('Normal')
console.log(buildObject(obj))

console.log('Ramda')
console.log(_buildObject(obj))

console.log()
