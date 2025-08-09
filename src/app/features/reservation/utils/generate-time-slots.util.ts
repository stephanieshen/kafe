import { Timeslot } from "../models/timeslot.model";

export function generateTimeSlots(): Timeslot[] {
  const slots: Timeslot[] = [];
  const startHour = 18; // 6 PM
  const endHour = 22; // 10 PM

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      label: formatLabel(hour, 0),
      value: formatValue(hour, 0),
    });
    slots.push({
      label: formatLabel(hour, 30),
      value: formatValue(hour, 30),
    });
  }

  return slots;
}

export function formatLabel(hour24: number, minute: number): string {
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const ampm = hour24 < 12 ? 'AM' : 'PM';
  const minStr = minute === 0 ? '00' : minute.toString();
  return `${hour12}:${minStr} ${ampm}`;
}

export function formatValue(hour24: number, minute: number): string {
  const hourStr = hour24.toString().padStart(2, '0');
  const minStr = minute === 0 ? '00' : minute.toString();
  return `${hourStr}:${minStr}`;
}
