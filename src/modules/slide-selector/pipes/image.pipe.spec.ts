import { ImagePipe } from './image.pipe';
import { describe, it, beforeEach, expect } from 'vitest';


describe('ImagePipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ImagePipe();
  });

  it('create an instance', () => {
    expect(pipe).to.exist;
  });

  it('should replace "/image-server/" with the image url', () => {
    pipe.environment = {blogUrl: 'http://server'}
    expect(pipe.transform('![](/image-server/file.jpg')).to.equal('![](http://server/images/file.jpg')
  });

  it('should replace all instances of "/image-server/"', () => {
    pipe.environment = {blogUrl: 'http://server'}
    expect(pipe.transform('![](/image-server/file.jpg\n![](/image-server/file2.jpg'))
    .to.equal('![](http://server/images/file.jpg\n![](http://server/images/file2.jpg');
  });
});
