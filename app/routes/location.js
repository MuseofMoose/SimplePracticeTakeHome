import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'sp-take-home/config/environment';

export default class LocationRoute extends Route {
  @service store;

  model(params) {
    return this.store.query('office', {
      filter: {
        clinicianId: ENV.APP.clinicianId,
        cptCodeId: params?.cptCodeId,
      },
    });
  }
}
