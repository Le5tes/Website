import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravitySimulatorComponent } from './gravity-simulator.component';

describe('GravitySimulatorComponent', () => {
  let component: GravitySimulatorComponent;
  let fixture: ComponentFixture<GravitySimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GravitySimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GravitySimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
