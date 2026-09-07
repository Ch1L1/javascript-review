import {validateUuid} from "./uuid.js";
import {ValidationError} from "./errors.js";

export class SupplierId {
    #value;

    constructor(value) {
        if(!validateUuid(value)){
            throw new ValidationError(`Invalid supplier id: ${value}. Must be a valid UUID.`);
        }
        this.#value = value;
        Object.freeze(this);
    }

    static generate(){
        return new SupplierId(crypto.randomUUID());
    }

    get value(){
        return this.#value;
    }

    equals(other){
        return other instanceof SupplierId && this.#value === other.value;
    }

    toString(){
        return this.#value;
    }
}
