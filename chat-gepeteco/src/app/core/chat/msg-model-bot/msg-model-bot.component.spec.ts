import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgModelBotComponent } from './msg-model-bot.component';

describe('MsgModelBotComponent', () => {
  let component: MsgModelBotComponent;
  let fixture: ComponentFixture<MsgModelBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgModelBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgModelBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
