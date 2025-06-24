export interface ServerKeyCode {
    key: string;         // "013" for Enter
    alt: boolean;        // "1" or "0"
    shift: boolean;
    ctrl: boolean;
}


export interface KeyBinding {
    serverCode: ServerKeyCode;
    callback: () => void;
}