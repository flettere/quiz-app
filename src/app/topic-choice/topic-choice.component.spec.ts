import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicChoiceComponent } from './topic-choice.component';

describe('TopicChoiceComponent', () => {
  let component: TopicChoiceComponent;
  let fixture: ComponentFixture<TopicChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
