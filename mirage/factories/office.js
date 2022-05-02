import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  geoLocation() {
    return {
      lat: faker.address.latitude(),
      lng: faker.address.longitude(),
    };
  },

  isPublic() {
    return faker.datatype.boolean();
  },

  isVideo() {
    return faker.datatype.boolean();
  },

  name() {
    return `${faker.address.county()} Therapy Center`;
  },

  phone() {
    return faker.phone.phoneNumber('(###) ###-####');
  },
});
