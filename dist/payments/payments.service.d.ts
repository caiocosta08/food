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
/// <reference types="mongoose/types/inferschematype" />
import { Log, LogDocument } from '../app.schema';
import { PaidPayment, PaidPaymentDocument } from './schemas/paid-payment.schema';
import { PendingPayment, PendingPaymentDocument } from './schemas/pending-payment.schema';
import { Model } from 'mongoose';
import { Connection } from 'mongoose';
export declare class PaymentsService {
    private logsModel;
    private paidPaymentModel;
    private pendingPaymentModel;
    private connection;
    constructor(logsModel: Model<LogDocument>, paidPaymentModel: Model<PaidPaymentDocument>, pendingPaymentModel: Model<PendingPaymentDocument>, connection: Connection);
    create(log: any): Promise<Log>;
    createPendingPayment(pendingPayment: any): Promise<PendingPayment>;
    createPaidPayment(paidPayment: any): Promise<(PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        message: string;
    }>;
    createCreditCardPendingPayment(pendingPayment: any): Promise<PendingPayment>;
    createCreditCardPaidPayment(paidPayment: any): Promise<PaidPayment>;
    createPixPayment(pixPayment: any): Promise<(PendingPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | (PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    getPaidPayments(): Promise<(PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getPendingPayments(): Promise<(PendingPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getCreditCardPayments(): Promise<((PendingPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | (PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }))[]>;
    getPixPayments(): Promise<((PendingPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | (PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }))[]>;
    deleteAllPendingPayments(params?: any): Promise<any>;
    deleteAllPaidPayments(params?: any): Promise<any>;
    deleteAllPayments(): Promise<{
        pendingPaymentsDeleted: any;
        paidPaymentsDeleted: any;
    }>;
    getPaymentsWithParams(params?: any): Promise<((PendingPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | (PaidPayment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[])[]>;
    getPaymentsData(): Promise<{
        paidPaymentsTotalValue: any;
        paidPaymentsQuantity: number;
        pendingPaymentsTotalValue: any;
        pendingPaymentsQuantity: number;
    }>;
    findAll(): Promise<Log[]>;
}
