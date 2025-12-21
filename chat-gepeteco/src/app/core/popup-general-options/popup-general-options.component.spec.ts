import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGeneralOptionsComponent } from './popup-general-options.component';

describe('PopupGeneralOptionsComponent', () => {
  let component: PopupGeneralOptionsComponent;
  let fixture: ComponentFixture<PopupGeneralOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupGeneralOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupGeneralOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
