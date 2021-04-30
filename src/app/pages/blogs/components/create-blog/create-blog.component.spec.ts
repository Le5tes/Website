import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import  * as chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { byDataQa } from 'src/test-utils/test-helpers';


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
      declarations: [CreateBlogComponent],
      imports: [ReactiveFormsModule]
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
