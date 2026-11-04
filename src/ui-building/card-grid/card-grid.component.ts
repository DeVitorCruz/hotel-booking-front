import { Component, input } from "@angular/core";
import { NgClass } from "@angular/common";
import { CardGridContent } from "./card-grid.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { AnchorFlex } from "@shared/ui/anchor-flex/anchor-flex.component";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";


@Component({
    selector: 'app-card-grid',
    standalone: true,
    imports: [NgClass, TextBoxComponent, ImgFlex, AnchorFlex, SequenceSpaceComponent],
    templateUrl: './card-grid.component.html',
    styleUrl: './card-grid.component.scss'
}) export class CardGridComponent {
    public readonly CONTENT = input.required<CardGridContent>();
}

