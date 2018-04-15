import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarFlotaComponent } from './asignar-flota.component';

describe('AsignarFlotaComponent', () => {
  let component: AsignarFlotaComponent;
  let fixture: ComponentFixture<AsignarFlotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarFlotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarFlotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
