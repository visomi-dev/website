import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input()
  icon: string;

  @Input()
  size: 'small' | 'medium' | 'large';

  @Input()
  type: string;

  @Output() clickEvent = new EventEmitter<Event>();

  get internalSize(): string {
    return this.size ? `is-${this.size}` : '';
  }

  get internalType(): string {
    return this.type ? `has-text-${this.type}` : '';
  }

  get url(): string {
    return `${environment.apiUrl}/icon/${this.icon}?color=white#icon`
  }

  get isProduction() {
    return environment.production;
  }

  public get internalClass(): string[] {
    const styles = [];

    if (this.internalSize) { styles.push(this.internalSize); }
    if (this.internalType) { styles.push(this.internalType); }

    return styles;
  }

  onClick(event: Event): void {
    this.clickEvent.emit(event);
  }
}
