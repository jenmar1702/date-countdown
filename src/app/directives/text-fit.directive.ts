import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  AfterViewInit,
  Input,
  OnChanges,
} from '@angular/core'

@Directive({
  selector: '[textFit]',
  standalone: true,
})
export class TextFitDirective implements AfterViewInit, OnChanges {
  @Input() content = ''

  private element: HTMLElement
  private parentElement: HTMLElement
  private computedStyles: CSSStyleDeclaration

  private readonly minFontSize = 10
  private readonly maxFontSize = 100

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.element = this.el.nativeElement
    this.parentElement = this.el.nativeElement.parentElement
    this.computedStyles = window.getComputedStyle(this.parentElement)
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.setFontSize()
  }

  ngAfterViewInit(): void {
    this.setFontSize()
  }

  ngOnChanges(changes: any): void {
    if (changes.content) {
      this.ngAfterViewInit()
    }
  }

  private setFontSize(): void {
    // Reset style to get accurate offsetWidth
    this.setStyle(this.minFontSize, 'inline-block')

    // Calculate parent width considering padding
    const parentWidth =
      this.parentElement.offsetWidth -
      (parseFloat(this.computedStyles.paddingLeft) + parseFloat(this.computedStyles.paddingRight))

    const initialWidth = this.element.offsetWidth
    const ratio = this.minFontSize / initialWidth
    const fontSize = Math.max(Math.min(parentWidth * ratio, this.maxFontSize), this.minFontSize)

    this.setStyle(fontSize, 'block')
  }

  setStyle(fontSize: number, display: string) {
    this.renderer.setStyle(this.element, 'font-size', `${fontSize}px`)
    this.renderer.setStyle(this.element, 'display', display)
  }
}
