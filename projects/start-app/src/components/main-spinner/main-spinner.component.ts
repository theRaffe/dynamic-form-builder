import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import lottie from 'lottie-web';

@Component({
    selector: 'main-spinner',
    templateUrl: './main-spinner.component.html',
    styleUrls: ['./main-spinner.component.scss'],
    standalone: true,})
export class MainSpinnerComponent implements AfterViewInit {
    
    @ViewChild('loaderAnimation', { static: false })
    animationContainer!: ElementRef;

    ngAfterViewInit(): void {
        const containerAnimation = this.animationContainer.nativeElement;
        lottie.loadAnimation({
            container: containerAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/assets/animation_squares_rotating.json'
        })
    }
}