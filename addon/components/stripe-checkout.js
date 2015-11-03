import Ember from 'ember';
import layout from '../templates/components/stripe-checkout';

/**
 * Stripe checkout component for accepting payments with
 * an embedded form.
 *
 * Stripe docs: https://stripe.com/docs/tutorials/checkout
 *
 * Usage:
 * {{stripe-checkout
 *   description=billingPlan.description
 *   amount=billingPlan.amount
 * }}
 */
export default Ember.Component.extend({
  layout: layout,
  tagName: 'button',
  classNames: ['stripe-checkout'],
  attributeBindings: ['isDisabled:disabled'],

  stripe: Ember.inject.service(),
  source: Ember.computed.oneWay('stripe'),

  /**********************************
   * Required attributes
   **********************************/

  /**
   * Your publishable key (test or live).
   */
  key: null,

  /**********************************
   * Highly recommended attributes
   **********************************/

  /**
   * A relative URL pointing to a square image of your brand or
   * product. The recommended minimum size is 128x128px.
   * Eg. "/square-image.png"
   */
  image: null,

  /**
   * The name of your company or website.
   */
  name: null,

  /**
   * A description of the product or service being purchased.
   */
  description: null,

  /**
   * The amount (in cents) that's shown to the user. Note that you
   * will still have to explicitly include it when you create a
   * charge using the Stripe API.
   */
  amount: null,

  /**********************************
   * Optional attributes
   **********************************/

  /**
   * Accept Bitcoin payments.
   */
  bitcoin: null,

  /**
   * The currency of the amount (3-letter ISO code). The default is USD.
   */
  currency: null,

  /**
   * The label of the payment button in the Checkout form (e.g. “Subscribe”,
   * “Pay {{amount}}”, etc.). If you include {{amount}}, it will be replaced
   * by the provided amount. Otherwise, the amount will be appended to the
   * end of your label.
   */
  panelLabel: null,

  /**
   * Specify whether Checkout should validate the billing ZIP code
   * (true or false). The default is false.
   */
  zipCode: null,

  /**
   * Specify whether Checkout should collect the customer's billing address
   * (true or false). The default is false.
   */
  address: null,

  /**
   * If you already know the email address of your user, you can provide
   * it to Checkout to be pre-filled.
   */
  email: null,

  /**
   * The text to be shown on the default blue button.
   */
  label: null,

  /**
   * Specify whether to include the option to "Remember Me" for future
   * purchases (true or false). The default is true.
   */
  allowRememberMe: null,

  /**
   * Specify whether to include the option to use alipay to
   * checkout (true or false or auto). The default is false.
   */
  alipay: null,

  /**
   * Specify whether to reuse alipay information to
   * checkout (true or false). The default is false.
   */
  'alipay-reusable': null,

  /**
   * Specify language preference.
   */
  locale: null,

  /**********************************
   * Extras
   **********************************/

  /**
   * Bind to this attribute to disable the stripe
   * button until the user completes prior requirements
   * (like choosing a plan)
   */
  isDisabled: false,

  /**
   * By default we add stripe button classes.
   * Set to false to disable Stripe styles
   *
   * TODO: Need to load stripe styles in order for this to apply
   */
  useStripeStyles: true,

  setupStripe: Ember.on('init', function() {
    this.get('source').setTarget(this);

    // setup event listeners
    ['opened', 'closed', 'token'].forEach((eventName) => {
      if (this.get(eventName)) {
        const eventListener = 'on_' + eventName.classify();
        this.get('source').on(eventName, this, eventListener);
      }
    });
 }),

  closeOnDestroy: Ember.on('willDestroyElement', function() {
    this.get('source').setTarget(null);

    ['opened', 'closed', 'token'].forEach((eventName) => {
      if (this.get(eventName)) {
        this.get('source').off(eventName);
      }
    });

    // Close modal if the user navigates away from page
    this.closeCheckout();
  }),

  /**
   * Kick up the modal if we're clicked
   */
  click: function(e) {
    this.openCheckout();
    e.preventDefault();
  },

  /**
   * Opens the Stripe modal for payment
   */
  openCheckout: function() {
    this.get('source').open();
  },

  closeCheckout: function() {
    this.get('source').close();
  },

  /**
   * Send component 'opened' action when the Stripe checkout modal is opened.
   */
  onOpened: function() {
    this.sendAction('opened');
  },

  /**
   * Sends component 'closed' action when the Stripe checkout modal is closed.
   */
  onClosed: function() {
    this.sendAction('closed');
  },

  /**
   * Sends component default action ('action') with the Stripe token when checkout succeeds.
   * Source: https://stripe.com/docs/api#tokens
   */
  onToken: function(token) {
    this.sendAction('action', token);
  },
});
