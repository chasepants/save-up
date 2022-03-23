export type LoginInputs = { username: string, password: string}
export interface I_LoginInput extends Iterable<I_LoginInput> { username: string, password: string}

const defaultLoginInputs: I_LoginInput = {
    username: 'John',
    password: 'Doe'
}