import {ValidationError} from "../../../shared/domain/model/errors.js";

export class PurchaseOrderState {
    static #VALID_STATES = {
        DRAFT: 'Draft',
        SUBMITTED: 'Submitted',
        APPROVED: 'Approved',
        SHIPPED: 'Shipped',
        COMPLETED: 'Completed',
        CANCELLED: 'Cancelled'
    };
    #value;

    constructor(value = PurchaseOrderState.#VALID_STATES.DRAFT) {
        this.#validateState(value);
        this.#value = value;
    }

    #validateState(state){
        if (!Object.values(PurchaseOrderState.#VALID_STATES).includes(state)) {
            throw new ValidationError('Invalid purchase order state: ' + state + '. Must be one of the following: ' + Object.values(PurchaseOrderState.#VALID_STATES).join(', '));
        }
    }

    get value(){
        return this.#value;
    }

    equals(other){
        return other instanceof PurchaseOrderState && this.#value === other.value;
    }

    isDraft(){
        return this.#value === PurchaseOrderState.#VALID_STATES.DRAFT;
    }

    toSubmittedFrom(currentState){
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.DRAFT){
            throw new ValidationError('Invalid purchase order state: ' + currentState.value);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SUBMITTED);
    }

    toApprovedFrom(currentState){
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.SUBMITTED){
            throw new ValidationError('Invalid purchase order state: ' + currentState.value);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.APPROVED);
    }

    toShippedFrom(currentState){
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.APPROVED){
            throw new ValidationError('Invalid purchase order state: ' + currentState.value);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SHIPPED);
    }

    toCompletedFrom(currentState){
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.SHIPPED){
            throw new ValidationError('Invalid purchase order state: ' + currentState.value);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.COMPLETED);
    }

    toCancelledFrom(currentState){
        if(currentState.value === PurchaseOrderState.#VALID_STATES.COMPLETED){
            throw new ValidationError('Invalid purchase order state: ' + currentState.value);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.CANCELLED);
    }
}