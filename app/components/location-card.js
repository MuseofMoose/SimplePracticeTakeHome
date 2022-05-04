import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LocationCardComponent extends Component {
  @service router;

  @action selectLocation(/* location */) {
    // Unimplemented as the next step was not required for this assignment
    //
    // const displayValues = [location.name, location.phone];
    // this.selectionProgress.completeStep('location', displayValues);
    // this.router.transitionTo('location', {s
    //   queryParams: { cptCodeId: service.cptCodeId },
    // });
  }
}
