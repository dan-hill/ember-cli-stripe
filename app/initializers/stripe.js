import config from '../config/environment';

export function initialize() {
  const application = arguments[1] || arguments[0];
  const stripe = config.stripe || {};

  application.register('config:stripe', stripe, { instantiate: false });
  application.inject('service:stripe', 'defaultOptions', 'config:stripe');

  const injectionFactories = stripe.injectionFactories || [];
  injectionFactories.forEach((factory) => {
    application.inject(factory, 'stripe', 'service:stripe');
  });
}

export default {
  name: 'stripe',
  initialize: initialize
};
