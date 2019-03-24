import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { SlideSelectorComponent } from './slide-selector.component';
import { Component, ViewChild } from '@angular/core';

@Component({
   template: '<app-slide-selector></app-slide-selector>'
})
class WrapperComponent {
    @ViewChild(SlideSelectorComponent)
    public child: SlideSelectorComponent;
}

describe('slide-selector-component integration', () => {
let fixture: ComponentFixture<WrapperComponent>;
let wrapper: WrapperComponent; 
let component: SlideSelectorComponent; 


beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          SlideSelectorComponent,
          WrapperComponent
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.child;
    fixture.detectChanges();
  });

  it('should be accessable', () => {
    expect(component).to.exist;
  })

});