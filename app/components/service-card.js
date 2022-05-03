import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ServiceCardComponent extends Component {
  @service router;

  @action selectService(service) {
    // TODO: Needs to store the selection and update the sidebar card somehow.
    this.router.transitionTo('location', {
      queryParams: { cptCodeId: service.cptCodeId },
    });
  }
}
