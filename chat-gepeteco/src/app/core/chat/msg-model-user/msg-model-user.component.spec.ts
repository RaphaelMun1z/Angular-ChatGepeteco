import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgModelUserComponent } from './msg-model-user.component';

describe('MsgModelUserComponent', () => {
  let component: MsgModelUserComponent;
  let fixture: ComponentFixture<MsgModelUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgModelUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgModelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
