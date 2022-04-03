import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { expect } from 'chai';
import { of } from 'rxjs';

import { BlogByIdComponent } from './blog-by-id.component';

describe('BlogByIdComponent', () => {
  let component: BlogByIdComponent;
  let fixture: ComponentFixture<BlogByIdComponent>;
  let mockRoute;

  beforeEach(async () => {
    mockRoute = {paramMap: of()};

    await TestBed.configureTestingModule({
      declarations: [ BlogByIdComponent ],
      providers: [{provide: ActivatedRoute, useValue: mockRoute}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should make a call to get the blog by id based on the route param', () => {

  });
});
