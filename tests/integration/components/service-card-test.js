import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { t } from 'ember-intl/test-support';
import sinon from 'sinon';

module('Integration | Component | service-card', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.router = this.owner.lookup('service:router');
    this.selectionProgress = this.owner.lookup('service:selection-progress');
    this.testCptCode = this.server.create('cpt-code');
    await render(hbs`<ServiceCard @service={{this.testCptCode}}/>`);
  });

  test('it displays the expected service attributes', function (assert) {
    assert
      .dom('[data-test-title]')
      .hasText(
        this.testCptCode.description,
        'should display the service description'
      );
    assert
      .dom('[data-test-text]')
      .includesText(
        this.testCptCode.duration.toString(),
        'should display the service duration'
      );
    assert
      .dom('[data-test-select-button]')
      .hasText(t('general.select'), 'should display a select button');
  });

  test('clicking the select button performs the expected actions', async function (assert) {
    sinon.stub(this.router, 'transitionTo');
    sinon.stub(this.selectionProgress, 'completeStep');
    await click('[data-test-select-button]');

    assert.strictEqual(
      this.router.transitionTo.callCount,
      1,
      'calls transitionTo once'
    );

    const transitionToArgs = this.router.transitionTo.args[0];
    assert.strictEqual(
      transitionToArgs[0],
      'location',
      'transitions to the location route'
    );
    assert.strictEqual(
      transitionToArgs[1]?.queryParams?.cptCodeId,
      this.testCptCode.cptCodeId,
      'passes along the expected cptCodeId as a query param'
    );

    const selectionProgressArgs = this.selectionProgress.completeStep.args[0];
    const expectedDisplayValues = [
      this.testCptCode.description,
      `${this.testCptCode.duration} ${t('time.minutes')}`,
    ];
    assert.deepEqual(selectionProgressArgs[0], expectedDisplayValues);
  });
});
