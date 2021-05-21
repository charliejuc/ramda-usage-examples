import R from 'ramda'

const isDevelopment = true

const environmentOrDefault = (
    envVariable: string | undefined,
    defaultValue: string,
    isDevelopment: boolean
): string | undefined => {
    if (!isDevelopment) {
        return envVariable
    }

    if (envVariable !== undefined && envVariable.trim() !== '') {
        return envVariable
    }

    return defaultValue
}

const isValidEnvVariable = R.both(R.is(String), R.pipe(R.trim, R.complement(R.equals(''))))
export const _environmentOrDefault: (
    envVariable: string | undefined,
    defaultValue: string,
    isDevelopment: boolean
) => string | undefined = R.ifElse(
    R.nthArg(2),
    R.ifElse(isValidEnvVariable, R.nthArg(0), R.nthArg(1)),
    R.nthArg(0)
)

console.log('Normal')
console.log(environmentOrDefault(undefined, 'default', isDevelopment))
console.log(environmentOrDefault(undefined, 'default', !isDevelopment))
console.log(environmentOrDefault('value', 'default', isDevelopment))
console.log(environmentOrDefault('value', 'default', !isDevelopment))
console.log('--------------------------------')

console.log('Ramda')
console.log(_environmentOrDefault(undefined, 'default', isDevelopment))
console.log(_environmentOrDefault(undefined, 'default', !isDevelopment))
console.log(_environmentOrDefault('value', 'default', isDevelopment))
console.log(_environmentOrDefault('value', 'default', !isDevelopment))
console.log()
