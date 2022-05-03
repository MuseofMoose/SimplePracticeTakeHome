import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | services-container', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.testServices = this.server.createList('cpt-code', 4);
    await render(hbs`<ServicesContainer @services={{this.testServices}}/>`);
  });

  test('it creates a service card for each service', function (assert) {
    assert
      .dom('[data-test-service-card]')
      .exists({ count: this.testServices.length });
  });
});
