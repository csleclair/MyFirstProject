import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export interface IfContext<T = unknown> {
  $implicit: T;
  if: T;
}

@Directive({
  selector: '[if]'
})
export class IfDirective<T = unknown> {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<IfContext<T>>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set if(condition: T | null | undefined | false) {
    if (condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: condition,
        if: condition
      });
      this.hasView = true;
    } else if (!condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
