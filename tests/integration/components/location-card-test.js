import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { t } from 'ember-intl/test-support';

module('Integration | Component | location-card', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.testLocation = this.server.create('office');
    await render(hbs`<LocationCard @location={{this.testLocation}}/>`);
  });

  test('it displays the expected location attributes', function (assert) {
    assert
      .dom('[data-test-name]')
      .hasText(this.testLocation.name, 'should display the location name');
    assert
      .dom('[data-test-phone]')
      .includesText(
        this.testLocation.phone,
        'should display the location phone number'
      );
    assert
      .dom('[data-test-select-button]')
      .hasText(t('general.select'), 'should display a select button');
  });

  // Unimplemented as the next step was not required for this assignment
  test.skip('clicking the select button routes you to the date page', function () {});
});
