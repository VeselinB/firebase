import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarNoMediaComponent } from './toolbar-no-media.component';

describe('ToolbarNoMediaComponent', () => {
  let component: ToolbarNoMediaComponent;
  let fixture: ComponentFixture<ToolbarNoMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarNoMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarNoMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
