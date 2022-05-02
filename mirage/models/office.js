import { Model, belongsTo, hasMany } from 'miragejs';

export default Model.extend({
  clinician: belongsTo(),
  cptCodes: hasMany(),
});
