import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import  * as chai from 'chai';
import { MarkdownModule } from 'ngx-markdown';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { byDataQa } from 'src/test-utils/test-helpers';
import { ImagePipe } from '../../pipes/image.pipe';
import { BlogComponent } from '../blog/blog.component';


import { CreateBlogComponent } from './create-blog.component';

describe('CreateBlogComponent', () => {
  let expect;
  let component: CreateBlogComponent;
  let fixture: ComponentFixture<CreateBlogComponent>;
  let nativeElement;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBlogComponent, BlogComponent, ImagePipe],
      imports: [
        ReactiveFormsModule,
        MarkdownModule.forRoot()
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

  describe('preview', () => {
    it('should show a blog with the blog post as it\'s being written', () => {
      component.form.controls.body.setValue('my blog!!');
      fixture.detectChanges();

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
        const stubEmit = sinon.stub(component.createBlog, 'emit');

        createBlogButton.click();

        expect(stubEmit).to.have.been.calledWith(component.form.value);
      });

      it('should emit to close', () => {
        const stubEmit = sinon.stub(component.closeComponent, 'emit');

        createBlogButton.click();

        expect(stubEmit).to.have.been.calledWith(true);
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
      const stubEmit = sinon.stub(component.closeComponent, 'emit');

      cancelButton.click();

      expect(stubEmit).to.have.been.calledWith(true);
    });
  });
});
