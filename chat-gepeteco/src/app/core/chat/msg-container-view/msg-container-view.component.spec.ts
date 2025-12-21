import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgContainerViewComponent } from './msg-container-view.component';

describe('MsgContainerViewComponent', () => {
  let component: MsgContainerViewComponent;
  let fixture: ComponentFixture<MsgContainerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgContainerViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgContainerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
