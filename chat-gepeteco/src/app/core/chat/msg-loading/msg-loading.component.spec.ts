import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgLoadingComponent } from './msg-loading.component';

describe('MsgLoadingComponent', () => {
  let component: MsgLoadingComponent;
  let fixture: ComponentFixture<MsgLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
