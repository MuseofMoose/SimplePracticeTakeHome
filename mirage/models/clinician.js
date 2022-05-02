import { Model, hasMany } from 'miragejs';

export default Model.extend({
  cptCodes: hasMany(),
  offices: hasMany(),
});
