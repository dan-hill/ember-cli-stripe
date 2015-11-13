import Ember from 'ember';
import StripeConfigMixin from '../../../mixins/stripe-config';
import { module, test } from 'qunit';

module('Unit | Mixin | stripe config');

// Replace this with your real tests.
test('it works', function(assert) {
  var StripeConfigObject = Ember.Object.extend(StripeConfigMixin);
  var subject = StripeConfigObject.create();
  assert.ok(subject);
});
