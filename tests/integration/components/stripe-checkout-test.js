import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stripe-checkout', 'Integration | Component | stripe checkout', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stripe-checkout}}`);

  assert.equal(this.$().text().trim(), 'Pay with card');

  // Template block usage:
  this.render(hbs`
    {{#stripe-checkout}}
      template block text
    {{/stripe-checkout}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

/**
 * These tests are stubbed out until I'm able to learn how to test Ember
 * addons properly - documentation is sparse right now and I'm quite new
 * to qunit.
 * At the very least, these test stubs should help describe expected behaviour
 */
// test('it sends the opened action when the Stripe modal opens', function() {
//   expect(0);
//   // TODO
// });

// test('it sends the closed action when the Stripe modal closes', function() {
//   expect(0);
//   // TODO
// });

// test('it sends the primary action when a Stripe checkout completes', function() {
//   expect(0);
//   // TODO
// });

// test('it displays the configured values in the Stripe modal', function() {
//   expect(0);
//   // TODO: Use all component configurations and validate they display in the Stripe modal
// });

// test('it throws an exception if ENV.stripe.key is not defined in the app config', function() {
//   expect(0);
//   // TODO
// });
