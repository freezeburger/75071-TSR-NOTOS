/**
 * Decrire une pattern Observer ( patron de conception comportemental )
 * 
 * - Subscriber - callback qui accepte un paramètre  "data"
 * 
 * Méthodes :
 * - register(subscriber: Subscriber): void
 * - notify(): void
 * 
 * Genérique
 * 
 * Rendre le typage de "data" générique
 * 
 */

type Subscriber<T> = (data:T) => void;

export interface Observable<DataType>{
    subscribers:Subscriber<DataType>[]
    register(subscriber: Subscriber<DataType>): void;
    notify(): void;
}

/* class Semaphore implements Observable<'open'|'locked'>{

    subscribers: Subscriber<"open" | "locked">[] = [];

    register(subscriber: Subscriber<"open" | "locked">): void {
        throw new Error("Method not implemented.");
    }
    notify(): void {
        throw new Error("Method not implemented.");
    }


} */