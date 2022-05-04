import { assert, module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { ProgressStep } from 'sp-take-home/services/selection-progress';
import sinon from 'sinon';

module('Unit | Service | selection-progress', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.service = this.owner.lookup('service:selection-progress');
    this.router = this.owner.lookup('service:router');
  });

  module('completeStep()', function () {
    test('calls the specified step`s completeStep() with expected params', function (assert) {
      const displayValues = ['potato', 'horse'];
      sinon.stub(this.service.steps[0], 'completeStep');
      this.service.completeStep(displayValues);

      const completeStepArgs = this.service.steps[0].completeStep.args[0];
      assert.deepEqual(completeStepArgs[0], displayValues);
    });

    test('increments the active step index and sets the next step to active', function (assert) {
      const previousIndex = this.service.activeStepIndex;
      this.service.completeStep(['potato']);
      assert.true(this.service.steps[1].isActive);
      assert.strictEqual(this.service.activeStepIndex, previousIndex + 1);
    });
  });

  test('goToStep()', function () {
    sinon.stub(this.router, 'transitionTo');
    this.service.completeStep(['potato']); // Advancing a step;
    this.service.goToStep(0);

    assert.false(
      this.service.steps[1].isActive,
      'previous step should no longer be active'
    );
    assert.false(
      this.service.steps[1].isComplete,
      'previous step should no longer be complete'
    );
    assert.true(
      this.service.steps[0].isActive,
      'targeted step should be active'
    );
    assert.strictEqual(
      this.service.activeStepIndex,
      0,
      'service should update the active index'
    );

    const transitionArgs = this.router.transitionTo.args[0];
    assert.strictEqual(
      transitionArgs[0],
      this.service.steps[0].route,
      'should transition to route of targeted step'
    );
  });

  module('ProgressStep class', function () {
    test('constructor() sets expected properties on instance', function (assert) {
      const progressStep = new ProgressStep('potato', '/potato', true);
      assert.strictEqual(
        progressStep.title,
        'potato',
        'should set title to passed in value'
      );
      assert.strictEqual(
        progressStep.route,
        '/potato',
        'should set route to passed in value'
      );
      assert.true(
        progressStep.isActive,
        'should set isActive to passed in value'
      );
      assert.deepEqual(
        progressStep.displayValues,
        [],
        'displayValues should remain an empty array'
      );
    });

    test('completeStep() performs expected operations', function (assert) {
      const progressStep = new ProgressStep('potato');
      const displayValues = ['chicken', 'horse'];
      progressStep.completeStep(displayValues);

      assert.deepEqual(
        progressStep.displayValues,
        displayValues,
        'should set displayValues'
      );
      assert.true(progressStep.isComplete, 'should set isComplete to true');
      assert.false(progressStep.isActive, 'should set isActive to false');
    });

    test('stepClasses() correctly computes value', function (assert) {
      let progressStep = new ProgressStep('potato');
      assert.strictEqual(progressStep.stepClasses, 'step  ');

      progressStep = new ProgressStep('potato', '/potato', true);
      assert.strictEqual(progressStep.stepClasses, 'step  active');

      progressStep = new ProgressStep('potato');
      progressStep.isComplete = true;
      assert.strictEqual(progressStep.stepClasses, 'step complete ');

      progressStep = new ProgressStep('potato', '/potato', true);
      progressStep.isComplete = true;
      assert.strictEqual(progressStep.stepClasses, 'step complete active');
    });
  });
});
