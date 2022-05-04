import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ProgressSideBarComponent extends Component {
  @service selectionProgress;

  @action
  transitionIfComplete(step, index) {
    if (!step.isComplete) return;
    this.selectionProgress.goToStep(index);
  }
}
