import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { ProgressStep } from 'sp-take-home/services/selection-progress';
import sinon from 'sinon';

module('Integration | Component | progress-side-bar', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.router = this.owner.lookup('service:router');
    this.selectionProgress = this.owner.lookup('service:selection-progress');

    const testSteps = [
      new ProgressStep('step1', '/step1', true),
      new ProgressStep('step2', '/step2'),
    ];

    this.selectionProgress.steps = testSteps;

    await render(hbs`<ProgressSideBar />`);
  });

  test('displays expected attributes', async function (assert) {
    const displayValues = ['potato', 'horse'];
    // Advancing a step so we have steps in a variety of different states.
    this.selectionProgress.completeStep(displayValues);
    await settled();

    assert
      .dom('[data-test-step]')
      .exists({ count: 2 }, 'should be two steps displayed');

    assert
      .dom('[data-test-step="0"]')
      .hasClass(/step/, 'completed step should have "step" class');
    assert
      .dom('[data-test-step="0"]')
      .hasClass(/complete/, 'completed step should have "complete" class');
    assert
      .dom('[data-test-step="0"]')
      .doesNotHaveClass(
        /active/,
        'completed step should not have "active" class'
      );
    assert
      .dom('[data-test-step="0"] [data-test-checkmark-bullet]')
      .isVisible('completed step should display checkmark bullet');
    assert
      .dom('[data-test-step="0"] [data-test-number-bullet]')
      .doesNotExist('completed step should not display number bullet');
    assert
      .dom('[data-test-step="0"] [data-test-title]')
      .hasText(
        this.selectionProgress.steps[0].title,
        'step 0 should have expected title'
      );

    displayValues.forEach((value, index) => {
      assert
        .dom(`[data-test-step="0"] [data-test-display-value="${index}"]`)
        .hasText(value, `completed step should have display value: ${value}`);
    });

    assert
      .dom('[data-test-step="1"]')
      .hasClass(/step/, 'active step should have step class');
    assert
      .dom('[data-test-step="1"]')
      .hasClass(/active/, 'active step should have active class');
    assert
      .dom('[data-test-step="1"]')
      .doesNotHaveClass(
        /complete/,
        'active step should not have complete class'
      );
    assert
      .dom('[data-test-step="1"] [data-test-checkmark-bullet]')
      .doesNotExist('active step should not display checkmark bullet');
    assert
      .dom('[data-test-step="1"] [data-test-number-bullet]')
      .isVisible('active step should display number bullet');
    assert
      .dom('[data-test-step="1"] [data-test-title]')
      .hasText(
        this.selectionProgress.steps[1].title,
        'step 1 should have expected title'
      );
    assert
      .dom('[data-test-step="1"] [data-test-display-value]')
      .doesNotExist('active step should not have any display values');
  });

  test('calls goToStep() with expected index when clicking a completed step', async function (assert) {
    sinon.stub(this.selectionProgress, 'goToStep');
    this.selectionProgress.completeStep([]);
    await settled();

    const index = 0;
    await click(`[data-test-step="${index}"]`);
    const goToStepArgs = this.selectionProgress.goToStep.args[0];
    assert.strictEqual(goToStepArgs[0], index);
  });

  test('does not call goToStep() when clicking an incomplete step', async function (assert) {
    sinon.stub(this.selectionProgress, 'goToStep');
    const index = 0;
    await click(`[data-test-step="${index}"]`);
    assert.strictEqual(this.selectionProgress.goToStep.callCount, 0);
  });
});
