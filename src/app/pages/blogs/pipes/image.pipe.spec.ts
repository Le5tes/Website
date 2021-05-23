import { ImagePipe } from './image.pipe';
import { expect } from 'chai';

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
});
