import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { t } from 'ember-intl/test-support';

module('Integration | Component | title-bar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await render(hbs`<TitleBar />`);
  });

  test('it displays a header with the expected intl string', function (assert) {
    assert.dom('[data-test-header]').hasText(t('widgetHeader'));
  });

  test('it displays a sub header with the practice name', function (assert) {
    assert.dom('[data-test-sub-header]').hasText(t('practiceName'));
  });
});
