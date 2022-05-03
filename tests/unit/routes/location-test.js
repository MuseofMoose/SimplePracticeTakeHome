import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import ENV from 'sp-take-home/config/environment';

module('Unit | Route | location', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.route = this.owner.lookup('route:location');
    this.store = this.owner.lookup('service:store');

    this.mockedResponse = 'potato';
    sinon.stub(this.store, 'query').returns(this.mockedResponse);
  });

  test('model hook queries with expected params', async function (assert) {
    const params = { cptCodeId: 1 };
    await this.route.model(params);

    const queryArgs = this.store.query.args[0];
    assert.strictEqual(queryArgs[0], 'office', 'queries the correct model');
    assert.strictEqual(
      queryArgs[1]?.filter?.clinicianId,
      ENV.APP.clinicianId,
      'filters by clinicianId ENV var'
    );
    assert.strictEqual(
      queryArgs[1]?.filter?.cptCodeId,
      params.cptCodeId,
      'filters by cpyCodeId query param'
    );
  });

  test('model hook returns store query response', async function (assert) {
    const model = await this.route.model();
    assert.strictEqual(model, this.mockedResponse);
  });
});
