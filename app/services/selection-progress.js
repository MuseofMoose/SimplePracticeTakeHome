import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

/*
  I've opted to leave this here due to its specificity and small size. I would advise
  moving this out into its own file if it ever grows or if this file starts to feel crowded.
*/
export class ProgressStep {
  @tracked displayValues = [];
  @tracked isActive;
  @tracked isComplete = false;
  route = '';
  title = '';

  get stepClasses() {
    const completeClass = this.isComplete ? 'complete' : '';
    const activeClass = this.isActive ? 'active' : '';
    return `step ${completeClass} ${activeClass}`;
  }

  constructor(title, route, isActive = false) {
    this.isActive = isActive;
    this.route = route;
    this.title = title;
  }

  completeStep(displayValues) {
    this.displayValues.replace(0, this.displayValues.length, displayValues);
    this.isComplete = true;
    this.isActive = false;
  }

  resetStep() {
    this.isComplete = false;
    this.isActive = false;
    this.displayValues.clear();
  }
}

/*
  This service is responsible for handling the state of a user's progress through the selection flow.
  All state updates should be done through functions exposed by this service and it will take care of updating
  the appropriate state. On the consumer end, by making use of the tracked variables exposed by this service,
  you can be sure that they will update as the state changes.
*/
export default class SelectionProgressService extends Service {
  @service intl;
  @service router;

  activeStepIndex = 0;

  steps = [
    new ProgressStep(this.intl.t('sideBarSteps.service'), '/service', true),
    new ProgressStep(this.intl.t('sideBarSteps.location'), '/location'),
  ];

  completeStep(displayValues) {
    this.steps[this.activeStepIndex].completeStep(displayValues);
    this.#setActive((this.activeStepIndex += 1));
  }

  goToStep(stepIndex) {
    // Note that this only works for two steps (which is all we need, presently). For multiple steps
    // you could imagine walking through the steps between the current index and the targeted index
    // and reset them all so they aren't active or complete any more. Or perhaps you let the user
    // jump around between steps they've completed without resetting progress.
    this.steps[this.activeStepIndex].resetStep();
    this.router.transitionTo(this.steps[stepIndex].route);
    this.steps[stepIndex].resetStep();
    this.#setActive(stepIndex);
  }

  #setActive(stepIndex) {
    this.steps[stepIndex].isActive = true;
    this.activeStepIndex = stepIndex;
  }
}
