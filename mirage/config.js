import ENV from 'sp-take-home/config/environment';

export default function () {
  this.urlPrefix = `${ENV.APP.clientPortalBaseURL}/client-portal-api`;

  this.get('/cpt-codes', (schema, request) => {
    const { 'filter[clinicianId]': clinicianId } = request.queryParams;
    return schema.cptCodes.where({ clinicianId });
  });

  this.get('/offices', (schema, request) => {
    const {
      'filter[clinicianId]': clinicianId,
      'filter[cptCodeId]': cptCodeId,
    } = request.queryParams;

    return schema.offices.where((office) => {
      return (
        office.clinicianId === clinicianId.toString() &&
        office.cptCodeIds.includes(cptCodeId.toString())
      );
    });
  });
}
