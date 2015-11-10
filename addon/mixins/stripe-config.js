import Ember from 'ember';

export default Ember.Mixin.create({
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
  name: "Demo Site",

  /**
   * A description of the product or service being purchased.
   */
  description: "2 widgets ($20.00)",

  /**
   * The amount (in cents) that's shown to the user. Note that you
   * will still have to explicitly include it when you create a
   * charge using the Stripe API.
   */
  amount: 2000,

  /**********************************
   * Optional attributes
   **********************************/

  /**
   * Accept Bitcoin payments.
   */
  bitcoin: false,

  /**
   * The currency of the amount (3-letter ISO code). The default is USD.
   */
  currency: "USD",

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
  zipCode: false,

  /**
   * Specify whether Checkout should collect the customer's billing address
   * (true or false). The default is false.
   */
  address: false,

  /**
   * If you already know the email address of your user, you can provide
   * it to Checkout to be pre-filled.
   */
  email: null,

  /**
   * The text to be shown on the default blue button.
   */
  label: "Pay with card",

  /**
   * Specify whether to include the option to "Remember Me" for future
   * purchases (true or false). The default is true.
   */
  allowRememberMe: true,

  /**
   * Specify whether to include the option to use alipay to
   * checkout (true or false or auto). The default is false.
   */
  alipay: false,

  /**
   * Specify whether to reuse alipay information to
   * checkout (true or false). The default is false.
   */
  'alipay-reusable': false,

  /**
   * Specify language preference.
   */
  locale: 'auto',

  stripeConfigOptions: [
    'key',
    'image',
    'name',
    'description',
    'amount',
    'bitcoin',
    'currency',
    'panelLabel',
    'zipCode',
    'address',
    'email',
    'label',
    'allowRememberMe',
    'aliPay',
    'locale',
  ],
});
