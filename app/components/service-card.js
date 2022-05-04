import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ServiceCardComponent extends Component {
  @service intl;
  @service router;
  @service selectionProgress;

  @action selectService(service) {
    const displayValues = [
      service.description,
      `${service.duration} ${this.intl.t('time.minutes')}`,
    ];
    this.selectionProgress.completeStep(displayValues);
    this.router.transitionTo('location', {
      queryParams: { cptCodeId: service.cptCodeId },
    });
  }
}
