/**
* Eg. 2025-04-30T09:41:02.053Z
* 
* @example
* {
*   "createdAt": "2025-04-30T09:41:02.053Z"
* }
*/
export type Timestamp = string;

export type QrCodeUri = `https://cdn.dummyjson.com/public/${string}.png`;

/**
 * A string with a maximum length of 15 characters.
 */
export type TextShort = string;

/**
 * A string with a maximum length of 150 characters.
 */
export type TextLong = string;

/**
 * A string with a no length limitation.
 */
export type TextUnbounded = string;

/**
 * Should always be displayed as a two digit floating number with a currency symbol.
 * Represents a currency value, e.g. 19.99$.
 */
export type Currency = number;