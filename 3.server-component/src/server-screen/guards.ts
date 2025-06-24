import { ContextualKeys, KeyCode, KeyName, ServerCodes, ValueKeyCode } from "./type";

export const isValidServerCode = (code: string): code is ServerCodes => {
    const [key, context] = code.split(/(?=(?:.{3})+$)/) as [KeyCode, ContextualKeys];

    return Object.values(ValueKeyCode).includes(key) && isValidContext(context);
}

export const isValidContext = (context: string): context is ContextualKeys => {
    return /^[01]{3}$/.test(context);
}

export const isValidKeyName = (key: string): key is KeyName => {
    return Object.keys(ValueKeyCode).includes(key)
}

export const serverCode = (strings: TemplateStringsArray, ...values: [KeyboardEvent['code'], KeyboardEvent['altKey'], KeyboardEvent['ctrlKey'], KeyboardEvent['shiftKey']]): ServerCodes => {
    return `${ValueKeyCode[values[0] as KeyName]}${values[1] ? '1' : '0'}${values[2] ? '1' : '0'}${values[3] ? '1' : '0'}` as ServerCodes;
}