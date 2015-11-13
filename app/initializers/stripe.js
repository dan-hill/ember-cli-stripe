import config from '../config/environment';
import Stripe from 'ember-cli-stripe/services/stripe';

export function initialize() {
  const application = arguments[1] || arguments[0];
  const stripe = config.stripe || {};

  application.register('service:stripe', Stripe, { singleton: false });

  // should be moved in an instance-initializer, leaving till we upgrade to Ember 1.12+
  application.register('config:stripe', stripe, { instantiate: false });
  application.inject('service:stripe', 'defaultOptions', 'config:stripe');

  // doing this right now, because our Stripe service is not a singleton and what we do above (injecting the config
  // options as a property on the service) should be done in an instance initializer, but our current Ember version
  // 1.11.x doesn't support this yet.
  Stripe.setDefaultOptions(stripe);

  // const injectionFactories = stripe.injectionFactories || [];
  // injectionFactories.forEach((factory) => {
  //   application.inject(factory, 'stripe', 'service:stripe');
  // });
}

export default {
  name: 'stripe',
  initialize: initialize
};
