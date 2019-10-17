import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopScorersComponent } from './top-scorers.component';

describe('TopScorersComponent', () => {
  let component: TopScorersComponent;
  let fixture: ComponentFixture<TopScorersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopScorersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopScorersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
