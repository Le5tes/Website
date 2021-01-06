import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(GamesService);
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
        {largeThumbnail: 'https://www.warrenphotographic.co.uk/photography/cats/27940.jpg'}
      ]);
    });
  });
});
