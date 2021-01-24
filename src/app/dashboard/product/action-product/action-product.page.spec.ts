import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActionProductPage } from './action-product.page';

describe('ActionProductPage', () => {
  let component: ActionProductPage;
  let fixture: ComponentFixture<ActionProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
