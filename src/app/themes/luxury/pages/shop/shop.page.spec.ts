import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShopPage } from "./shop.page";

describe('shop-page', () => {
    let component: ShopPage;
    let fixture: ComponentFixture<ShopPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShopPage],
        }).compileComponents();

        fixture = TestBed.createComponent(ShopPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});