import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersProjectComponent } from './masters-project.component';
import { ImagePipeModule } from 'src/modules/image-pipe/image-pipe.module';

describe('MastersProjectComponent', () => {
  let component: MastersProjectComponent;
  let fixture: ComponentFixture<MastersProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MastersProjectComponent],
      imports: [ImagePipeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MastersProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
