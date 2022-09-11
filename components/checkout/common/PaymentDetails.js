import React, { Component } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import Radiobox from '../../common/atoms/Radiobox';
import PayPalButton from '../gateways/PayPalButton';
import Image from 'next/image';
export default class PaymentDetails extends Component {
  /**
   * Render a form for using the Chec test gateway.
   *
   * @returns {JSX.Element}
   */
  renderTestGateway() {
    const {
      gateways,
      onChangeGateway,
      selectedGateway,
      cardNumber,
      expMonth,
      expYear,
      cvc,
      billingPostalZipcode,
    } = this.props;

    if (!gateways || !gateways.available['test_gateway']) {
      return null;
    }

    // onCreditCardChange(event) {

    // }

    return (
      <div className="borderbottom border-color-gray500">
        <label
          onClick={() => onChangeGateway('test_gateway')}
          className="p-3 d-flex align-items-center cursor-pointer"
        >
          <Radiobox
            checked={selectedGateway === 'test_gateway'}
            className="mr-3"
          />
          <p className="font-weight-medium">Credit/debit card</p>
        </label>

        { selectedGateway === 'test_gateway' && (
          <div className="pl-5 pr-3 pb-3 payment-details-container">
            <div className="row">
              <div className="col-sm-8">
                <label className="w-100 mb-3 mt-2 mb-sm-0">
                  <p className="mb-1 font-size-caption font-color-light">
                    Card Number
                  </p>
                  <input
                    name="cardNumber"
                    type="tel"
                    pattern="[0-9\s]{13,19}"
                    value={cardNumber}
                    maxLength="19"
                    className="rounded-sm w-100"
                  />
                </label>
              </div>
              <div className="col-sm-3">
                <label className="w-100 mb-3 mt-2 mb-sm-0">
                  <p className="mb-1 font-size-caption font-color-light">
                    CVC (CVV)
                  </p>
                  <input
                    name="cvc"
                    value={cvc}
                    maxLength="3"
                    type="number"
                    className="rounded-sm w-100"
                  />
                </label>
              </div>
              <div className="col-sm-3">
                <label className="w-100 mb-3 mt-2 mb-sm-0">
                  <p className="mb-1 font-size-caption font-color-light">
                    Exp. Month
                  </p>
                  <input
                    name="expMonth"
                    type="number"
                    value={expMonth}
                    className="rounded-sm w-100"
                    placeholder="MM"
                  />
                </label>
              </div>
              <div className="col-sm-3">
                <label className="w-100 mb-3 mt-2 mb-sm-0">
                  <p className="mb-1 font-size-caption font-color-light">
                    Exp. Year
                  </p>
                  <input
                    type="number"
                    name="expYear"
                    value={expYear}
                    className="rounded-sm w-100"
                    placeholder="YY"
                  />
                </label>
              </div>
              <div className="col-sm-3">
                <label className="w-100 mb-3 mt-2 mb-sm-0">
                  <p className="mb-1 font-size-caption font-color-light">
                    Zip code*
                  </p>
                  <input
                    required
                    autoComplete="postal-code"
                    name="billingPostalZipcode"
                    value={billingPostalZipcode}
                    className="rounded-sm w-100"
                  />
                </label>
              </div>
            </div>
          </div>
        ) }
      </div>
    );
  }

  /**
   * Renders a Stripe Elements form for capturing payment information using Stripe as the gateway
   *
   * @returns {JSX.Element}
   */
  renderStripe() {
    const { gateways, onChangeGateway, selectedGateway } = this.props;

    if (!gateways || !gateways.available['stripe']) {
      return null;
    }

    const cardElementOptions = {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      }
    }

    return (
      <div className="borderbottom border-color-gray500">
        <label
          onClick={() => onChangeGateway('stripe')}
          className="p-3 d-flex align-items-center cursor-pointer"
        >
          <Radiobox
            checked={selectedGateway === 'stripe'}
            className="mr-3"
          />
          <p className="font-weight-medium">Credit/debit card (via Stripe)</p>
        </label>

        { selectedGateway === 'stripe' && (
          <div className="pl-5 pr-3 pb-3 payment-details-container">
            <CardElement options={cardElementOptions} />
          </div>
        ) }
      </div>
    );
  }

  renderGCash() {
    const { gateways, onChangeGateway, selectedGateway } = this.props;

    //gcash gateway id gway_3wpgx6AxvdxxlY
    var  gcashGateway = gateways?.manual?.find(m => m.id === 'gway_3wpgx6AxvdxxlY');

    if (!gateways || !gateways.available['manual'] || !gcashGateway) {
      return null;
    }

    return (
      <div className="borderbottom border-color-gray500">
        <label
          onClick={() => onChangeGateway('gcash')}
          className="p-3 d-flex align-items-center cursor-pointer"
        >
          <Radiobox
            checked={selectedGateway === 'gcash'}
            className="mr-3"
          />
          <p className="font-weight-medium">GCash</p>
        </label>

        {
          selectedGateway === 'gcash' && (
            <div className="pt-5 pl-3 pr-3 pb-3 payment-details-container">
              <Image
               src="/images/payment-details/sanicaswim-gcash-code.png"
               alt="GCash QR Code"
               layout="fixed"
               width="202px"
               height="202px"
              >
              </Image>

              <p align="center">Scan the QR Code or send to <br/>
                <b>+63 906 474 5542</b> <br />
                <b>Danica Surima</b> <br /> <br />
                Then click the &quot;Complete Order&quot; button, and send the proof of payment to <b>payments.sanicaswim@gmail.com</b> with the Order ID as the subject.
              </p>
            </div>
          )
        }
      </div>
    )
  }

  renderPayPal() {
    const {
      gateways,
      onChangeGateway,
      selectedGateway,
      live
    } = this.props;

    if (!gateways || !gateways.available['paypal']) {
      return null;
    }

    return (
      <div className="borderbottom border-color-gray500">
        <label
          onClick={() => onChangeGateway('paypal')}
          className="p-3 d-flex align-items-center cursor-pointer"
        >
          <Radiobox
            checked={selectedGateway === 'paypal'}
            className="mr-3"
          />
          <img src="paypal-mark.jpg" alt="Pay with PayPal" />
          <p className="font-weight-medium">PayPal</p>
        </label>

        { selectedGateway === 'paypal' && (
            <div className="pl-5 pr-5 pb-3 payment-details-container">
              {/* <PayPalButton
                live={live}
              >
              </PayPalButton> */}
              Paypal
            </div>
          )
        }
      </div>
    );
  }

  /**
   * Render the payment view, including payment options for each supported gateway
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <>
        <p className="font-size-subheader font-weight-semibold mb-3">
          Payment Detail
        </p>
        <div className="border rounded-sm border-color-gray400 mb-5">
          { this.renderTestGateway() }
          { this.renderStripe() }
          { this.renderGCash() }
          {/* { this.renderPayPal() } */}
          { /* todo support other gateways here */ }
        </div>
      </>
    );
  }
}

PaymentDetails.propTypes = {
  gateways: PropTypes.object,
  live: PropTypes.object,
  onChangeGateway: PropTypes.func,
  selectedGateway: PropTypes.string,
}
