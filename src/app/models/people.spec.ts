import { People } from './people';

describe('People', () => {
  it('should create an instance', () => {
    expect(new People(req.body.id, req.body.firstName, req.body.lastName, new Date(req.body.birthday), req.body.jobs || [])).toBeTruthy();
  });
});
