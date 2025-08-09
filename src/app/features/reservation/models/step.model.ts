export interface Step {
  step: number;
  title: string;
  code: 'date-time' | 'size-and-preferences' | 'region-selection' | 'contact-details' | 'review';
}
