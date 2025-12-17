import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideHistoryComponent } from './aside-history.component';

describe('AsideHistoryComponent', () => {
  let component: AsideHistoryComponent;
  let fixture: ComponentFixture<AsideHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
