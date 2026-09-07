import {ValidationError} from "../../../shared/domain/model/errors.js";
import {PurchaseOrderId} from "../../../shared/domain/model/purchase-order-id.js";
import {DateTime} from "../../../shared/domain/model/date-time.js";
import {Money} from "../../../shared/domain/model/money.js";

export class PurchaseOrderState {
    #MAX_ITEMS = 50;
    #id;
    #supplierId;
    #currency;
    #orderDate;
    #items;
    #state;

    constructor({supplierId, currency, orderDate = new DateTime()}) {
        if(!supplierId){
            throw new ValidationError(`Invalid supplier ID ${supplierId}. Must be a non-empty string.`);
        }
        if(!currency){
            throw new ValidationError(`Invalid currency ${currency}. Must be a non-empty string.`);
        }
        this.#id = PurchaseOrderId.generate();
        this.#supplierId = supplierId;
        this.#currency = currency;
        this.#orderDate = orderDate instanceof DateTime ? orderDate : new DateTime();
        this.#items = [];
        this.#state = new PurchaseOrderState();
    }

    addItem(item) {
        if(!this.#state.isDraft()){
            throw new ValidationError('Invalid purchase order state: ' + item);
        }
        if(this.#items.length >= this.#MAX_ITEMS){
            throw new ValidationError('Invalid purchase order state: ' + item);
        }
        if(!Number.isInteger(unitPrice) || unitPrice <= 0){
            throw new ValidationError(`Invalid unit price ${unitPrice}. Must be a positive integer.`);
        }
        this.#items.push(
            new PurchaseOrderState(
                {
                    orderId: this.#id,
                    productId,
                    quantity,
                    unitPrice: new Money({amount: unitPrice, currency: this.#currency})
                }
            )
        )
    }

    calculateTotalPrice(){
        if(this.#items.length === 0){
            throw new ValidationError('Invalid purchase order state: ' + this.#items.length);
        }
        return this.#items
            .reduce((sum, item) => sum.add(item.calculateSubtotal()),
                new Money({amount: 0, currency: this.#currency}));
    }

    submit(){
        this.#state = this.#state.toSubmittedFrom(this.#state);
    }
}
