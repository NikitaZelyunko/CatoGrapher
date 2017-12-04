import { Directive, ElementRef, HostListener } from '@angular/core';

const r = new FileReader();

@Directive({
  selector: '[appFileModel]'
})

export class FileModelDirective {

  constructor(private el: ElementRef) {
    console.log('hello directive');
    el.nativeElement.style.backgroundColor = this.highlight;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  @HostListener('change') onchange() {
    this.showFile(this.el.nativeElement.files[0]);
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  private showFile(file) {
    r.readAsDataURL(file);
    r.onloadend = function (loadEvent) {
          console.log('end');
          console.log(this.result);
      };
    console.log(file);
  }
}
