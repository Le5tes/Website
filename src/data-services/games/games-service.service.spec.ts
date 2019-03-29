import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { GamesServiceService } from './games-service.service';

describe('GamesServiceService', () => {
  let service: GamesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(GamesServiceService);
  });

  it('should be created', () => {
    expect(service).to.exist;
  });

  describe('#games', () => {
    it('should return a list of games objects', () => {
      expect(service.games).to.deep.equal([
        {largeThumbnail: 'https://www.cats.org.uk/uploads/branches/231/Kit/Boba_red_sofa_small.jpg'},
        {largeThumbnail: 'https://www.cats.org.uk/uploads/branches/231/Kit/Boba_red_sofa_small.jpg'},
        {largeThumbnail: 'https://www.cats.org.uk/uploads/branches/231/Kit/Boba_red_sofa_small.jpg'},
        {largeThumbnail: 'https://www.cats.org.uk/uploads/branches/231/Kit/Boba_red_sofa_small.jpg'},
        {largeThumbnail: 'https://www.cats.org.uk/uploads/branches/231/Kit/Boba_red_sofa_small.jpg'}
      ]);
    });
  });
});
