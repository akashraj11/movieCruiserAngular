import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOperationsComponent } from './movie-operations.component';

describe('MovieOperationsComponent', () => {
  let component: MovieOperationsComponent;
  let fixture: ComponentFixture<MovieOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
