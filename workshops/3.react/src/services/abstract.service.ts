import axios from "axios";
import { CrudService } from "../types/crud.pattern";


export abstract class AbstractCrud<T extends {id:number}> implements CrudService<T>{

    state: T[] = [];

    constructor(private endpoint:string){
        if(!this.endpoint) console.error('Missing Endpoint');
    }

    create(data: Omit<T, "id">): Promise<T> {
        return axios.post<T>(this.endpoint, data)
                        .then( ({data}) => {   
                            this.state.unshift(data);
                            return data;
                        })
    }

    read(): Promise<T[]>;
    read(id: T["id"]): Promise<T>;
    read(id?: T["id"] ): Promise<T | T[]> {
        if(!id) {
            return axios.get<T[]>(this.endpoint)
                        .then( ({data}) => {
                            this.state = data;
                            return data;
                        });
        }
            return axios.get<T>(`${this.endpoint}/${id}`)
                        .then( ({data}) => {
                            return data;
                        });
    }

    update(target: T, modifiers: Partial<Omit<T, "id">>): Promise<T> {
        const url = `${this.endpoint}/${target.id}`;
        const updatedData = { ...target, ...modifiers };
        return axios.put<T>(url, updatedData)
                        .then( ({data}) => {
                            this.state = this.state.map(item => item.id === data.id ? data : item);
                            return data;
                        })
    }

    delete(target: T): Promise<T> {
        return axios.delete<T>( `${this.endpoint}/${target.id}` )
                        .then( ({data}) => {   
                            this.state = this.state.filter(item => item.id !== target.id);
                            return data;
                        })
    }

}