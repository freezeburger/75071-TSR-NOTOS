import { ServerKeyCode } from "./types";

export function parseServerCode(code: string): ServerKeyCode {
    return {
        key: code.slice(0, 3),
        alt: code[3] === '1',
        shift: code[4] === '1',
        ctrl: code[5] === '1',
    };
}