import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpandPage } from './expand.page';

describe('ExpandPage', () => {
  let component: ExpandPage;
  let fixture: ComponentFixture<ExpandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
