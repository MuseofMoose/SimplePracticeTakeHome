import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'sp-take-home/config/environment';

export default class ServiceRoute extends Route {
  @service store;

  model() {
    return this.store.query('cpt-code', {
      filter: {
        clinicianId: ENV.APP.clinicianId,
      },
    });
  }
}
