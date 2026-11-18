import { ImagePrefetchService } from './image-prefetch.service';

describe('ImagePrefetchService', () => {
  let service: ImagePrefetchService;

  beforeEach(() => {
    service = new ImagePrefetchService();
    (service as any).imagePipe.environment = { imageUrl: 'http://cdn' };
  });

  it('extracts and resolves markdown and html images, without duplicates', () => {
    const body = 'text ![a](/image-server/a.jpg) ![b](/image-server/b.jpg "title")\n<img class="x" src="/image-server/a.jpg"> ![a](/image-server/a.jpg)';
    expect(service.extractImageUrls(body)).to.deep.equal(['http://cdn/a.jpg', 'http://cdn/b.jpg']);
  });

  it('returns nothing for an empty body', () => {
    expect(service.extractImageUrls(undefined)).to.deep.equal([]);
  });
});
