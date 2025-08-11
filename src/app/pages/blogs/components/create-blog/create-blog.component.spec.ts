import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { byDataQa } from 'src/test-utils/test-helpers';
import { ImageService } from '../../services/image.service';
import { BlogComponent } from '../blog/blog.component';
import { UploadComponent } from '../upload/upload.component';

import { CreateBlogComponent } from './create-blog.component';
import { ImagePipeModule } from 'src/modules/image-pipe/image-pipe.module';

describe('CreateBlogComponent', () => {
  let component: CreateBlogComponent;
  let fixture: ComponentFixture<CreateBlogComponent>;
  let nativeElement;
  let mockImageService;
  const context = describe

  beforeEach(async () => {
    mockImageService = {
      upload: vi.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CreateBlogComponent, BlogComponent, UploadComponent],
      imports: [
        ReactiveFormsModule,
        MarkdownModule.forRoot(),
        ImagePipeModule
      ],
      providers: [
        {provide: ImageService, useValue: mockImageService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBlogComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  describe('fields', () => {
    describe('title', () => {
      it('should exist and have form control', () => {
        expect(nativeElement.querySelector(byDataQa('title'))).to.exist;
        expect(component.form.get('title')).to.exist;
      });
    });
    
    describe('description', () => {
      it('should exist and have form control', () => {
        expect(nativeElement.querySelector(byDataQa('description'))).to.exist;
        expect(component.form.get('description')).to.exist;
      });
    });

    describe('image', () => {
      it('should exist and have form control', () => {
        expect(nativeElement.querySelector(byDataQa('image'))).to.exist;
        expect(component.form.get('image')).to.exist;
      });
    });

    describe('body', () => {
      it('should exist and have form control', () => {
        expect(nativeElement.querySelector(byDataQa('body'))).to.exist;
        expect(component.form.get('body')).to.exist;
      });
    });

    describe('tags', () => {
      it('should exist and have form control', () => {
        expect(nativeElement.querySelector(byDataQa('tags'))).to.exist;
        expect(component.form.get('tags')).to.exist;
      });
    });
  });

  describe('preview', () => {
    it('should show a blog with the blog post as it\'s being written', async () => {
      component.form.controls.body.setValue('my blog!!');
      fixture.detectChanges();
      await fixture.whenStable()

      expect(nativeElement.querySelector(byDataQa('preview')).textContent).to.include('my blog!!');
    });
  });

  describe('create blog button', () => {
    let createBlogButton;
    beforeEach(() => {
      createBlogButton = nativeElement.querySelector(byDataQa('create-blog'));
    })

    it('should exist', () => {
      expect(createBlogButton).to.exist;
    });

    context('when clicked', () => {
      it('should emit the blog post', () => {
        const stubEmit = vi.spyOn(component.createBlog, 'emit');

        createBlogButton.click();

        expect(stubEmit).toHaveBeenCalledWith(component.form.value);
      });

      it('should emit to close', () => {
        const stubEmit = vi.spyOn(component.closeComponent, 'emit');

        createBlogButton.click();

        expect(stubEmit).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('cancel button', () => {
    let cancelButton;
    beforeEach(() => {
      cancelButton = nativeElement.querySelector(byDataQa('cancel'));
    })

    it('should exist', () => {
      expect(cancelButton).to.exist;
    });

    it('should emit to close when clicked', () => {
      const stubEmit = vi.spyOn(component.closeComponent, 'emit');

      cancelButton.click();

      expect(stubEmit).toHaveBeenCalledWith(true);
    });
  });
});
