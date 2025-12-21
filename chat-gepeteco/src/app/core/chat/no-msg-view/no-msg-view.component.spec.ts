import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMsgViewComponent } from './no-msg-view.component';

describe('NoMsgViewComponent', () => {
  let component: NoMsgViewComponent;
  let fixture: ComponentFixture<NoMsgViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoMsgViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMsgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
