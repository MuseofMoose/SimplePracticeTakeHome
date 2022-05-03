import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | locations-container', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.testLocations = this.server.createList('office', 4);
    await render(hbs`<LocationsContainer @locations={{this.testLocations}}/>`);
  });

  test('it creates a location card for each location', function (assert) {
    assert
      .dom('[data-test-location-card]')
      .exists({ count: this.testLocations.length });
  });
});
