import {PurchaseOrderId} from "../../../shared/domain/model/purchase-order-id.js";
import {ValidationError} from "../../../shared/domain/model/errors.js";
import {ProductId} from "../../../shared/domain/model/product-id.js";
import {Money} from "../../../shared/domain/model/money.js";

export class PurchaseOrderItem{
    #orderId;
    #productId;
    #quantity;
    #unitPrice;

    constructor({orderId, productId, quantity, unitPrice}){
        if (!orderId instanceof PurchaseOrderId) {
            throw new ValidationError(`Invalid purchase order ID ${orderId}. Must be an instance of PurchaseOrderId.`);
        }
        if(!productId instanceof ProductId){
            throw new ValidationError(`Invalid product ID ${productId}. Must be an instance of ProductId.`);
        }
        if(!Number.isInteger(quantity) || quantity < 0 || quantity > 1000){
            throw new ValidationError(`Invalid quantity ${quantity}. Must be a non-negative integer.`);
        }
        if(!(unitPrice instanceof Money)){
            throw new ValidationError(`Invalid unit price ${unitPrice}. Must be an instance of Money.`);
        }
        this.#orderId = orderId;
        this.#productId = productId;
        this.#quantity = quantity;
        this.#unitPrice = unitPrice;
    }

    get orderId(){
        return this.#orderId;
    }

    get productId(){
        return this.#productId;
    }

    get quantity(){
        return this.#quantity;
    }

    get unitPrice(){
        return this.#unitPrice;
    }

    calculateSubtotal(){
        return this.#unitPrice.multiply(this.#quantity);
    }
}
