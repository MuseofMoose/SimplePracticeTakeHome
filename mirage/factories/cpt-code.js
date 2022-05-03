import { Factory } from 'miragejs';
import faker from 'faker';
import { capitalize } from '@ember/string';

export default Factory.extend({
  callToBook() {
    return faker.datatype.boolean();
  },

  cptCodeId(i) {
    return i + 1;
  },

  description() {
    return `${capitalize(faker.random.word())} Therapy`;
  },

  duration() {
    return faker.datatype.number({ min: 15, max: 50 });
  },

  rate() {
    return faker.finance.amount(0, 100, 2);
  },
});
