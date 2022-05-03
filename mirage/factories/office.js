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

  name(i) {
    return i % 2 === 0
      ? `${faker.address.county()} Therapy Center`
      : `${faker.company.companyName()} Counseling Center`;
  },

  phone() {
    return faker.phone.phoneNumber('(###) ###-####');
  },
});
