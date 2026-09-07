import {Currency} from "./currency.js";

export class Money {
    #amount;
    #currency;

    constructor({amount, currency}) {
        if (!Number.isFinite(amount) || amount < 0) {
            throw new Error(`Invalid amount: ${amount}. Amount must be a non-negative finite number.`);
        }
        if (!(currency instanceof Currency)) {
            throw new Error(`Invalid currency: ${currency}. Must be an instance of Currency.`);
        }
        this.#amount = Number(amount.toFixed(2));
        this.#currency = currency;
        Object.freeze(this);
    }

    get amount() {
        return this.#amount;
    }

    get currency() {
        return this.#currency;
    }

    add(other) {
        if (!(other instanceof Money) || !this.#currency.equals(other.currency)) {
            throw new Error(`Cannot add money in different currencies.`);
        }
        return new Money({
            amount: this.#amount + other.amount,
            currency: this.#currency
        });
    }

    multiple(multiple){
        if(!Number.isFinite(multiple) || multiple < 0){
            throw new Error(`Invalid multiple: ${multiple}. Multiple must be a non-negative finite number.`);
        }
        return new Money({
            amount: this.#amount * multiple,
            currency: this.#currency
        });
    }

    toString() {
        return `${this.#amount.toFixed(2)} ${this.#currency.toString()}`;
    }

    equals(other) {
        return other instanceof Money &&
            this.#amount === other.amount &&
            this.#currency.equals(other.currency);
    }
}