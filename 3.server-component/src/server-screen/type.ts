
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
    F11:'122'
} as const;


export type KeyCode = typeof ValueKeyCode[keyof typeof ValueKeyCode];

export type KeyName = keyof typeof ValueKeyCode;

export type ContextualKeys = `${Altkey}${ControlKey}${ShiftKey}`;

export type ServerCodes = `${KeyCode}${ContextualKeys}`;
