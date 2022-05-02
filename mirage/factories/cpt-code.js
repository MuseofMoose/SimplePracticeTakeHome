import { Factory } from 'miragejs';
import faker from 'faker';
import ENV from 'sp-take-home/config/environment';

export default Factory.extend({
  callToBook() {
    return faker.datatype.boolean();
  },

  cptCodeId() {
    return ENV.APP.clinicianId;
  },

  description() {
    return faker.lorem.words(3);
  },

  duration() {
    return faker.datatype.number(15, 50);
  },

  rate() {
    return faker.finance.amount(0, 100, 2);
  },
});
