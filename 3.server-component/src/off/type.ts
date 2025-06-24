

export type ContextualKeyValue = '0' | '1';

export type Altkey = ContextualKeyValue;

export type ControlKey = ContextualKeyValue;

export type ShiftKey = ContextualKeyValue;

export const ValueKeyCode = {
    Enter: '013',
    F1: '112',
    F2: '113',
    F3: '114',
    F4: '115',
    F5: '116',
    F6: '117',
    F7: '118',
    F8: '119',
    F9: '120',
    F10: '121',
    F11: '122',
} as const;


export type KeyCode = typeof ValueKeyCode[keyof typeof ValueKeyCode];

export type KeyName = keyof typeof ValueKeyCode;
// export const KeyCodeValues = Object.values(ValueKeyCode) as KeyCode[];

export type ReversedValueKeyCodeMap = {
    [V in typeof ValueKeyCode[keyof typeof ValueKeyCode]]: {
        [K in keyof typeof ValueKeyCode]: typeof ValueKeyCode[K] extends V ? K : never
    }[keyof typeof ValueKeyCode]
} & unknown;

export const ReversedValueKeyCode = Object.fromEntries(
    Object.entries(ValueKeyCode).map(([key, value]) => [value, key])
) as ReversedValueKeyCodeMap

export type ContextualKeys = `${Altkey}${ControlKey}${ShiftKey}`;

export type ServerCodes = `${KeyCode}${ContextualKeys}`;

/* 
type Alt = Extract<ContextualKeys,`1${ContextualKeyValue}${ContextualKeyValue}`>;
type Control = Extract<ContextualKeys,`${ContextualKeyValue}1${ContextualKeyValue}`>;
type Shift = Extract<ContextualKeys,`${ContextualKeyValue}${ContextualKeyValue}1`>;

type Keys = Exclude<ServerKeyCodes, `${KeyCode}${Alt | Control}`> 
*/

type InvertValueMap<T extends Record<string, string>, V extends string> =
    { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

type GetKeyName<C extends KeyCode> = InvertValueMap<typeof ValueKeyCode, C>;

type Name1 = GetKeyName<'013'>; // "Enter"
type Name2 = GetKeyName<'116'>; // "F5"

type IsValidServerCode<T extends string> = T extends ServerCodes ? true : false;

type Test1 = IsValidServerCode<'013000'>; // true
type Test2 = IsValidServerCode<'999000'>; // false
type Test3 = IsValidServerCode<'0131111'>; // false (trop long)


type ExtractContextualKeys<T extends ServerCodes> = T extends `${KeyCode}${infer M}` ? M : never;
type Modifiers1 = ExtractContextualKeys<'013000'>; // '000'
type Modifiers2 = ExtractContextualKeys<'121101'>; // '101'

type ExtractKeyCode<T extends ServerCodes> = T extends `${infer M}${ContextualKeys}` ? M : never;
type Key1 = ExtractKeyCode<'013000'>; // '000'
type Key2 = ExtractKeyCode<'121101'>; // '101'

type Demo = GetKeyName<ExtractKeyCode<'013000'>>; // "Enter"