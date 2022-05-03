import Model, { attr } from '@ember-data/model';

export default class CptCodeModel extends Model {
  @attr('boolean') callToBook;
  @attr('number') cptCodeId;
  @attr('string') description;
  @attr('number') duration;
  @attr('string') rate; // Using string to preserve the decimal place on display.
}
