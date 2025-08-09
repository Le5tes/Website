import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MK1ProjectComponent } from './mk1-project.component';
import { BlogsService } from 'src/app/pages/blogs/services/blogs.service';
import { of } from 'rxjs';

describe('MK1ProjectComponent', () => {
  let component: MK1ProjectComponent;
  let fixture: ComponentFixture<MK1ProjectComponent>;
  let stubGetBlogs;

  beforeEach(async () => {
    stubGetBlogs = {getBlogs: vi.fn(() => of([]))}
    await TestBed.configureTestingModule({
      declarations: [MK1ProjectComponent],
      providers: [{provide: BlogsService, useValue: stubGetBlogs}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MK1ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
