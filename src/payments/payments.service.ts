/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Log, LogDocument } from '../app.schema';
import {
  PaidPayment,
  PaidPaymentDocument,
} from './schemas/paid-payment.schema';
import {
  PendingPayment,
  PendingPaymentDocument,
} from './schemas/pending-payment.schema';
import { Model } from 'mongoose';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Log.name) private logsModel: Model<LogDocument>,
    @InjectModel(PaidPayment.name)
    private paidPaymentModel: Model<PaidPaymentDocument>,
    @InjectModel(PendingPayment.name)
    private pendingPaymentModel: Model<PendingPaymentDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(log: any): Promise<Log> {
    const createdLog = new this.logsModel(log);
    return createdLog.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createPendingPayment(pendingPayment: any): Promise<PendingPayment> {
    const createdPendingPayment = new this.pendingPaymentModel(pendingPayment);
    return createdPendingPayment.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createPaidPayment(paidPayment: any) {
    const oldPaidPayment = await this.paidPaymentModel
      .find({ 'data.code': paidPayment.data.code })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });

    if (oldPaidPayment.length > 0)
      return { message: 'Paid payment code already exists.' };

    const createdPaidPayment = new this.paidPaymentModel(paidPayment);
    return createdPaidPayment.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createCreditCardPendingPayment(
    pendingPayment: any,
  ): Promise<PendingPayment> {
    const createdPendingPayment = new this.pendingPaymentModel(pendingPayment);
    return createdPendingPayment.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createCreditCardPaidPayment(paidPayment: any): Promise<PaidPayment> {
    const createdPaidPayment = new this.paidPaymentModel(paidPayment);
    return createdPaidPayment.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createPixPayment(pixPayment: any) {
    if (pixPayment.data.status == 'pending') {
      const createdPendingPayment = new this.pendingPaymentModel(pixPayment);
      return createdPendingPayment.save().catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    } else if (pixPayment.data.status == 'paid') {
      const createdPaidPayment = new this.paidPaymentModel(pixPayment);
      return createdPaidPayment.save().catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    }
  }

  async getPaidPayments() {
    return this.paidPaymentModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async getPendingPayments() {
    return this.pendingPaymentModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async getCreditCardPayments() {
    const pendingPayments = await this.pendingPaymentModel
      .find({ 'data.payment_method': 'credit_card' })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const paidPayments = await this.paidPaymentModel
      .find({ 'data.payment_method': 'credit_card' })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });

    return [...paidPayments, ...pendingPayments];
  }

  async getPixPayments() {
    const pendingPayments = await this.pendingPaymentModel
      .find({ 'data.payment_method': 'pix' })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const paidPayments = await this.paidPaymentModel
      .find({ 'data.payment_method': 'pix' })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });

    return [...paidPayments, ...pendingPayments];
  }

  async deleteAllPendingPayments(params: any = null) {
    return this.pendingPaymentModel.remove(params).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async deleteAllPaidPayments(params: any = null) {
    return this.paidPaymentModel.remove(params).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async deleteAllPayments() {
    const pendingPaymentsDeleted = await this.pendingPaymentModel
      .remove()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const paidPaymentsDeleted = await this.paidPaymentModel
      .remove()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });

    return { pendingPaymentsDeleted, paidPaymentsDeleted };
  }

  async getPaymentsWithParams(params: any = null) {
    const paidPayments = await this.paidPaymentModel
      .find(params)
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const pendingPayments = await this.pendingPaymentModel
      .find(params)
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });

    return [...[paidPayments, ...pendingPayments]];
  }

  async getPaymentsData() {
    const paidPayments = await this.paidPaymentModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const pendingPayments = await this.pendingPaymentModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const paidPaymentsTotalValue = paidPayments
      .map((p) => p.data.amount)
      .reduce((a, b) => a + b, 0);
    const paidPaymentsQuantity = paidPayments.length;
    const pendingPaymentsTotalValue = pendingPayments
      .map((p) => p.data.amount)
      .reduce((a, b) => a + b, 0);
    const pendingPaymentsQuantity = pendingPayments.length;

    return {
      paidPaymentsTotalValue,
      paidPaymentsQuantity,
      pendingPaymentsTotalValue,
      pendingPaymentsQuantity,
    };
  }

  async findAll(): Promise<Log[]> {
    return this.logsModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }
}
