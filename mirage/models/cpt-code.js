import { Model, belongsTo } from 'miragejs';

export default Model.extend({
  clinician: belongsTo(),
});
