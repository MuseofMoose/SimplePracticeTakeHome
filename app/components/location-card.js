import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LocationCardComponent extends Component {
  @service router;

  @action selectLocation(/* location */) {
    // TODO: Needs to store the selection and update the sidebar card somehow
    // Transition to date selection route would go here. Something like:
    // this.router.transitionTo('date');
  }
}
