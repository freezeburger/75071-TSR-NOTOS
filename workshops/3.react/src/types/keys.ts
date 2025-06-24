type ScreenContextValue = '000' | '001' | '010' | '011' | '100' | '101' | '110' | '111';

const SCREEN_CONTEXT = {
    ENTER: '000',
    F1: '000',
    F2: '000',
    F3: '000',
    F4: '000',
    F5: '000',
    F6: '000',
    F7: '000',
    F8: '000',
    F9: '000',
    F10: '000',
} as const;

const SERVER_KEYCODES = {
    ENTER: '013',
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
} as const;

export type KeybaordCode = (typeof SERVER_KEYCODES)[keyof typeof SERVER_KEYCODES];

export type KeyMap = {
    [ K in keyof typeof SERVER_KEYCODES as `${Capitalize<Lowercase<K>>}_CODE` ]: `${typeof SERVER_KEYCODES[K]}${typeof SCREEN_CONTEXT[K]}`;
}
