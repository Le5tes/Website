import { ComponentFixture, TestBed } from '@angular/core/testing';
import  * as chai from 'chai';
import { of, scheduled } from 'rxjs';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { byDataQa } from 'src/test-utils/test-helpers';
import { ImageService } from '../../services/image.service';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let expect;
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      providers: [
        {provide: ImageService, useValue: sinon.createStubInstance(ImageService)}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  describe('file input', () => {
    beforeEach(() => {
      (component.service.upload as sinon.SinonStub).returns(of(true))
    });

    it('should exist', () => {
      expect(fixture.nativeElement.querySelector(byDataQa('file-input'))).to.exist;
    });

    it('should make a call to the service', () => {
      const file = new File([''], 'filename.jpeg', { type: 'image/jpeg' });

      const fileEvent = {
        target: {
          files: [
            file
          ]
        }
      };

      component.fileChanged(fileEvent);

      expect(component.service.upload).to.have.been.calledWith(file);
    });
  });
});
