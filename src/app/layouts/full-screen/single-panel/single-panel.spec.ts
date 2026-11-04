import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SinglePanel } from "./single-panel";

describe('SinglePanel', () => {
    let component: SinglePanel;
    let fixture: ComponentFixture<SinglePanel>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SinglePanel]
        }).compileComponents();

        fixture = TestBed.createComponent(SinglePanel);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create the app', () => {
        expect(component).toBeTruthy();
    });
});