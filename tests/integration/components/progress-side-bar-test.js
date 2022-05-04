import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | progress-side-bar', function (hooks) {
  setupRenderingTest(hooks);

  // This needs tests but I've unfortunately run up against my time limit.

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ProgressSideBar />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <ProgressSideBar>
        template block text
      </ProgressSideBar>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
