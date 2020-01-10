import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOutputComponent } from './test-output.component';

describe('TestOutputComponent', () => {
  let component: TestOutputComponent;
  let fixture: ComponentFixture<TestOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
