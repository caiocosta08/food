/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import axios from 'axios';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('/')
  async test() {
    return true;
  }

  @Post('postback')
  async postback(@Body() data: any) {
    if (data.type == 'charge.paid' && data.data.status == 'paid') {
      await this.paymentsService.createPaidPayment(data);
      await this.paymentsService.deleteAllPendingPayments({
        'data.code': data.data.code,
      });
    }
    if (
      data.type == 'order.paid' &&
      data.data.status == 'paid' &&
      data.data.payment_method == 'pix'
    ) {
      await this.paymentsService.createPaidPayment(data);
      await this.paymentsService.deleteAllPendingPayments({
        'data.code': data.data.code,
      });
    }
  }

  @Post('create_credit_card_order')
  async createCreditCardOrder(@Body() data: any) {
    const options = {
      method: 'POST',
      url: 'https://api.pagar.me/core/v5/orders',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic ' + process.env.PAGARME_API_KEY,
      },
      data: {
        items: data.items,
        customer: data.customer,
        payments: data.payments,
      },
    };

    const response = await axios.request(options);
    if (response.data.status == 'paid')
      await this.paymentsService.createCreditCardPaidPayment(response);
    if (response.data.status != 'paid')
      await this.paymentsService.createCreditCardPendingPayment(response);
    return response.data;
  }

  @Post('create_pix_order')
  async createPixOrder(@Body() data: any) {
    const options = {
      method: 'POST',
      url: 'https://api.pagar.me/core/v5/orders',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic ' + process.env.PAGARME_API_KEY,
      },
      data: {
        items: data.items,
        customer: data.customer,
        payments: data.payments,
      },
    };

    const response = await axios.request(options);
    if (response.data) {
      await this.paymentsService.createPixPayment(response);
      return response.data;
    } else return { error: response };
  }

  @Get('get_paid_payments')
  async getPaidPayments() {
    const payments = await this.paymentsService.getPaidPayments();
    return payments;
  }

  @Get('get_pending_payments')
  async getPendingPayments() {
    const payments = await this.paymentsService.getPendingPayments();
    return payments;
  }

  @Get('get_credit_card_payments')
  async getCreditCardPayments() {
    const payments = await this.paymentsService.getCreditCardPayments();
    return payments;
  }

  @Get('get_pix_payments')
  async getPixPayments() {
    const payments = await this.paymentsService.getPixPayments();
    return payments;
  }

  @Get('get_payments_with_params')
  async getPaymentsWithParams() {
    const payments = await this.paymentsService.getPaymentsWithParams({
      'data.payment_method': 'pix',
    });
    return payments;
  }

  @Get('get_payments_data')
  async getPaymentsData() {
    const payments = await this.paymentsService.getPaymentsData();
    return payments;
  }

  @Get('delete_all_pending_payments')
  async deleteAllPendingPayments() {
    const payments = await this.paymentsService.deleteAllPendingPayments();
    return payments;
  }

  @Get('delete_all_paid_payments')
  async deleteAllPaidPayments() {
    const payments = await this.paymentsService.deleteAllPaidPayments();
    return payments;
  }

  @Get('delete_all_payments')
  async deleteAllPayments() {
    const payments = await this.paymentsService.deleteAllPayments();
    return payments;
  }
}

/**
 * 1. Requisição para o pagar.me para criar o pedido;
 *
 * 2. Se o status retornou com pagamento PAGO eu crio em paidPayments
 * 2.1 Se o status retornou com pagamento PENDENTE OU OUTRO eu crio em pendingPayments
 *
 * 3. Quando eu recebo o WEBHOOK
 *
 * 3.1 Se for pedido PAGO: Verifico se o pedido já foi pago
 * 3.2 Se não foi pago, crio ele no paidPayments
 * 3.3 Se foi pago, ignoro...
 *
 * 4. Após a criação no webhook, excluo do pendingPayments
 *
 *
 *
 *
 *
 */
