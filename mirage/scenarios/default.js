import ENV from 'sp-take-home/config/environment';

export default function (server) {
  // Our primary clinician for this app.
  const clinicianOne = server.create('clinician', {
    clinicianId: ENV.APP.clinicianId,
    firstName: 'Stephen',
    lastName: 'De Lis',
    middleName: '',
    suffix: '',
    phone: '(123) 456-17890',
  });

  const [serviceOne, serviceTwo, serviceThree, serviceFour, serviceFive] =
    server.createList('cpt-code', 5, { clinician: clinicianOne });

  server.create('office', {
    clinician: clinicianOne,
    cptCodes: [serviceOne, serviceTwo, serviceThree],
  });

  server.create('office', {
    clinician: clinicianOne,
    cptCodes: [serviceTwo, serviceThree, serviceFour],
  });

  server.create('office', {
    clinician: clinicianOne,
    cptCodes: [serviceThree, serviceFour, serviceFive],
  });

  // A hypothetical second clinician that this demo client app won't care
  // about. Just to confirm the mirage lookups are working correctly.
  server.create('clinician', {
    clinicianId: ENV.APP.clinicianId + 1,
  });
}
