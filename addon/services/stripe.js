import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {

  /**********************************
   * Required attributes
   **********************************/

  /**
   * Your publishable key (test or live).
   * INJECTED
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

  init: function() {
    this._super(...arguments);
    this.setupOptions();
  },

  setupOptions: function() {
    const options = this.get('defaultOptions');
    for (let key in options) {
      const optionValue = options[key];
      const value = this.getOptionOrDefault(key, optionValue);

      this.set(key, value);
    }
  },

  initHandler: function() {
    var self = this;
    const handler = StripeCheckout.configure({
      key: this.get('key'),
      locale: this.get('locale'),
      token: function(token) {
        self.trigger('token', token);
      },
      opened: function() {
       self.trigger('opened');
      },
      closed: function() {
        self.trigger('closed');
      }
    });

    this.set('handler', handler);
  },

  setTarget: function(component) {
    // TODO: improve working with multiple components on the same page
    Ember.assert("You can't use same Stripe service with multiple {{stripe-checkout}} components! Please add a source to the `second` {{stripe-checkout}} component", !this.get('target') || component === null);
    this.set('target', component);
  },

  open: function() {
    let options = this.getStripeOptions();
    this.getHandler().open(options);
  },

  close: function() {
    this.getHandler().close();
  },

  getHandler: function() {
    if (this.get('handler')) {
      return this.get('handler');
    }

    if (Ember.isNone(this.get('key'))) {
      throw [
        "Your Stripe key must be set to use the `ember-cli-stripe` addon. ",
        "Set the key in your environment.js file (ENV.stripe.key) or set the ",
        "key property on the component when instantiating it in your hbs template. ",
        "Find your Stripe publishable key at https://dashboard.stripe.com/account/apikeys"
      ].join('\n');
    }

    this.initHandler();

    return this.get('handler');
  },

  /**
   * Returns an array of properties supported by Stripe Checkout
   */
  allowedAttrKeys: function() {
    return Object.keys(this.get('allowedAttrs'));
  },

  getStripeOptions: function() {
    const stripeConfigKeys = this.get('stripeConfigOptions');
    var options = Ember.Object.create(this.getProperties(stripeConfigKeys));

    if (this.get('target')) {
      const componentOptions = this.get('target').getProperties(stripeConfigKeys);
      for (let key in componentOptions) {
        const optionValue = componentOptions[key];
        const value = this.getOptionOrDefault(key, optionValue);

        options.set(key, value);
      }
    }

    return options;
  },

  getOptionOrDefault: function(key, value) {
    const defaultValue = this.get(key);
    if (Ember.isBlank(value)) {
       return defaultValue;
    }

    return value;
  },
});
