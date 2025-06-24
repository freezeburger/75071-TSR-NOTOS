/**
 * 
 * Creer une inteface generique CrudService
 * 
 * Generique :Le DataType de donne gerer est passe en parametre de type generique
 * 
 * Contrainte
 * 
 * DataType doit au moins etre un object avec une cle "id" (number)
 * 
 * Attribut;
 * 
 * state: une collection de type DataType
 * 
 * Methodes
 * 
 * create 
 *  - accepte "data" de type DataType sans cle "id"
 *  - retourne une promesse de DataType
 * read 
 *  - accepte "id" de type DataType[id] ou rien
 *  - retourne une promesse de DataType si "id"  specifié
 *  - retourne une promesse de DataType[] si  "id" NON specifié
 * update 
 * - accepte "target" de type DataType 
 * - accepte "modifiers" n'importe quelle cle de DataType sauf "id"
 * - retourne une promesse de DataType
 * delete
 * - accepte "target" de type DataType 
 * - retourne une promesse de DataType
 * 
 * 
 */


export interface CrudService<DataType extends {id:number}>{

    state:DataType[];

    create(data:Omit<DataType,'id'>):Promise<DataType>;

    read():Promise<DataType[]>;
    read(id:DataType['id']):Promise<DataType>;
    read(id?:DataType['id']):Promise<DataType | DataType[]>;

    update(target:DataType, modifiers:Partial<Omit<DataType,'id'>>):Promise<DataType>;

    delete(target:DataType):Promise<DataType>;

}

