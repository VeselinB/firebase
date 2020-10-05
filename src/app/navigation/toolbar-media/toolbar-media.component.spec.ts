import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarMediaComponent } from './toolbar-media.component';

describe('ToolbarMediaComponent', () => {
  let component: ToolbarMediaComponent;
  let fixture: ComponentFixture<ToolbarMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
