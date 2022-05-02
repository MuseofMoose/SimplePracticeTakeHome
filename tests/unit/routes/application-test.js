import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Route | application', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:application');
    assert.ok(route);
  });

  hooks.beforeEach(function () {
    this.route = this.owner.lookup('route:application');
    this.intl = this.owner.lookup('service:intl');
  });

  test('sets the locale to the US region', function (assert) {
    sinon.spy(this.intl, 'setLocale');
    this.route.beforeModel();

    const setLocaleArgs = this.intl.setLocale.args[0][0];
    assert.deepEqual(setLocaleArgs[0], 'en-US');
  });
});
