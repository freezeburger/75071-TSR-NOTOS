

type ContextualKeyValue = '0' | '1';

type Altkey = ContextualKeyValue;

type ControlKey = ContextualKeyValue;

type ShiftKey = ContextualKeyValue;

const ValueKeyCode = {
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
    F10: '121' 
} as const;

type KeyCode = typeof ValueKeyCode[keyof typeof ValueKeyCode];

type ContextualKeys = `${Altkey}${ControlKey}${ShiftKey}`;

type ServerKeyCodes = `${KeyCode}${ContextualKeys}`;

/* 
type Alt = Extract<ContextualKeys,`1${ContextualKeyValue}${ContextualKeyValue}`>;
type Control = Extract<ContextualKeys,`${ContextualKeyValue}1${ContextualKeyValue}`>;
type Shit = Extract<ContextualKeys,`${ContextualKeyValue}${ContextualKeyValue}1`>;

type Keys = Exclude<ServerKeyCodes, `${KeyCode}${Alt | Control}`> 
*/