import Controller from '@ember/controller';

export default class LocationController extends Controller {
  queryParams = ['cptCodeId'];

  cptCodeId = null;
}
