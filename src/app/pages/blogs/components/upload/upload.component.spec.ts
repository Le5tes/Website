import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { NEVER, of, scheduled } from 'rxjs';
import { byDataQa } from 'src/test-utils/test-helpers';
import { ImageService } from '../../services/image.service';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let mockImageService;

  beforeEach(async () => {
    mockImageService = {
      upload: vi.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      providers: [
        {provide: ImageService, useValue: mockImageService}]
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
      mockImageService.upload.mockReturnValue(of(true));
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

      expect(mockImageService.upload).toHaveBeenCalledWith(file);
    });

    it('should show the filename in a list with the pending icon while it is uploading', () => {
      mockImageService.upload.mockReturnValue(NEVER);

      const file = new File([''], 'filename.jpeg', { type: 'image/jpeg' });

      const fileEvent = {
        target: {
          files: [
            file
          ]
        }
      };

      component.fileChanged(fileEvent);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector(byDataQa('uploaded-file'))).to.exist;
      expect(fixture.nativeElement.querySelector(byDataQa('uploaded-file')).textContent).to.include('filename.jpeg');
      expect(fixture.nativeElement.querySelector(byDataQa('uploaded-file')).classList.toString()).to.include('pending');
    });


    it('should show the filename in a list with the success icon while it is uploaded', () => {
      mockImageService.upload.mockReturnValue(of('Success'));

      const file = new File([''], 'filename.jpeg', { type: 'image/jpeg' });

      const fileEvent = {
        target: {
          files: [
            file
          ]
        }
      };

      component.fileChanged(fileEvent);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector(byDataQa('uploaded-file'))).to.exist;
      expect(fixture.nativeElement.querySelector(byDataQa('uploaded-file')).textContent).to.include('filename.jpeg');
      expect(fixture.nativeElement.querySelector(byDataQa('uploaded-file')).classList.toString()).to.include('success');
    });
  });
});
