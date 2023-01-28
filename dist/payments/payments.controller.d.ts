/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    test(): Promise<boolean>;
    postback(data: any): Promise<void>;
    createCreditCardOrder(data: any): Promise<any>;
    createPixOrder(data: any): Promise<any>;
    getPaidPayments(): Promise<(import("./schemas/paid-payment.schema").PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getPendingPayments(): Promise<(import("./schemas/pending-payment.schema").PendingPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getCreditCardPayments(): Promise<((import("./schemas/pending-payment.schema").PendingPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | (import("./schemas/paid-payment.schema").PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }))[]>;
    getPixPayments(): Promise<((import("./schemas/pending-payment.schema").PendingPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | (import("./schemas/paid-payment.schema").PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }))[]>;
    getPaymentsWithParams(): Promise<((import("./schemas/pending-payment.schema").PendingPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | (import("./schemas/paid-payment.schema").PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[])[]>;
    getPaymentsData(): Promise<{
        paidPaymentsTotalValue: any;
        paidPaymentsQuantity: number;
        pendingPaymentsTotalValue: any;
        pendingPaymentsQuantity: number;
    }>;
    deleteAllPendingPayments(): Promise<any>;
    deleteAllPaidPayments(): Promise<any>;
    deleteAllPayments(): Promise<{
        pendingPaymentsDeleted: any;
        paidPaymentsDeleted: any;
    }>;
}
