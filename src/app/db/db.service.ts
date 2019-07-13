import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as faker from 'faker';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const jobs = [
      { id: 1, applicationName: faker.company.companyName() , scheduledStartTime: faker.date.past(), scheduledEndTime: faker.date.past(), actualStartTime: faker.date.past(), actualEndTime: faker.date.past()},
      { id: 2, applicationName: faker.company.companyName() , scheduledStartTime: faker.date.past(), scheduledEndTime: faker.date.past(), actualStartTime: faker.date.past(), actualEndTime: faker.date.past()},
      { id: 3, applicationName: faker.company.companyName() , scheduledStartTime: faker.date.past(), scheduledEndTime: faker.date.past(), actualStartTime: faker.date.past(), actualEndTime: faker.date.past()},
      { id: 4, applicationName: faker.company.companyName() , scheduledStartTime: faker.date.past(), scheduledEndTime: faker.date.past(), actualStartTime: faker.date.past(), actualEndTime: faker.date.past()},
      { id: 5, applicationName: faker.company.companyName() , scheduledStartTime: faker.date.past(), scheduledEndTime: faker.date.past(), actualStartTime: faker.date.past(), actualEndTime: faker.date.past()},
      { id: 6, applicationName: faker.company.companyName() , scheduledStartTime: faker.date.past(), scheduledEndTime: faker.date.past(), actualStartTime: faker.date.past(), actualEndTime: faker.date.past()},
      { id: 7, applicationName: faker.company.companyName() , scheduledStartTime: faker.date.past(), scheduledEndTime: faker.date.past(), actualStartTime: faker.date.past(), actualEndTime: faker.date.past()},
      { id: 8, applicationName: faker.company.companyName() , scheduledStartTime: faker.date.past(), scheduledEndTime: faker.date.past(), actualStartTime: faker.date.past(), actualEndTime: faker.date.past()},
      { id: 9, applicationName: faker.company.companyName() , scheduledStartTime: faker.date.past(), scheduledEndTime: faker.date.past(), actualStartTime: faker.date.past(), actualEndTime: faker.date.past()},

    ];
    return { jobs };
  }
}
