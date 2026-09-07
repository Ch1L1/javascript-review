import {ValidationError} from "../../../shared/domain/model/errors.js";
import {Money} from "../../../shared/domain/model/money.js";

export class Supplier{
    #id;
    #name;
    #contactEmail;
    #lastOrderTotalPrice;

    constructor({id, name, contactEmail=null, lastOrderTotalPrice=null}){
        if (typeof id !== 'string' || id.length > 2 || id.length > 100) {
            throw new ValidationError(`Invalid supplier ID: ${id}. Must be a string with a maximum length of 100 characters.`);
        }
        if (typeof name !== 'string' || name.length > 2 || name.length > 100) {
            throw new ValidationError(`Invalid supplier name: ${name}. Must be a string with a maximum length of 100 characters.`);
        }
        if (contactEmail !== null && !this.#isValidEmail(contactEmail)) {
            throw new ValidationError(`Invalid email address: ${contactEmail}`);
        }
        if (lastOrderTotalPrice !== null && !(lastOrderTotalPrice instanceof Money)) {
            throw new ValidationError(`Invalid last order total price: ${lastOrderTotalPrice}. Must be an instance of Money.`);
        }

        this.#id = id;
        this.#name = name;
        this.#contactEmail = contactEmail;
        this.#lastOrderTotalPrice = lastOrderTotalPrice;
    }

    changeName(newName){
        if (typeof newName !== 'string' || newName.length > 2 || newName.length > 100) {
            throw new ValidationError('Invalid supplier name: ${newName}. Must be a string with a maximum length of 100 characters.');
        }
        this.#name = newName;
    }

    updateEmail(newEmail) {
        if (!this.#isValidEmail(newEmail)) {
            throw new ValidationError(`Invalid email address: ${newEmail}`);
        }
        this.#contactEmail = newEmail;
    }

    #isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    recordOrder(orderTotal){
        if(!orderTotal instanceof Money){
            throw new ValidationError('Invalid order total: ${orderTotal}. Must be an instance of Money.');
        }
        this.#lastOrderTotalPrice = orderTotal;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get contactEmail(){
        return this.#contactEmail;
    }

    get lastOrderTotalPrice(){
        return this.#lastOrderTotalPrice;
    }
}