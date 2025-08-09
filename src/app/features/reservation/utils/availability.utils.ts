import dayjs from 'dayjs';
import { DateAvailability, Region, RegionAvailability } from '../models/region.model';
import { generateTimeSlots } from './generate-time-slots.util';
import { Timeslot } from '../models/timeslot.model';
import { REGIONS } from '../constants/regions.const';

export function getDates(): string[] {
  let start = dayjs('2025-07-24');
  const end = dayjs('2025-07-31');
  const dates: string[] = [];

  while (start.isBefore(end) || start.isSame(end, 'day')) {
    dates.push(start.format('MM-DD-YY'));
    start = start.add(1, 'day');
  }

  return dates;
}

export function getTimeslots(): string[] {
  return generateTimeSlots().map((timeslot: Timeslot) => timeslot.value);
}

export function createInitialRegionAvailability(): RegionAvailability[] {
  const dates = getDates();
  const timeslots = getTimeslots();

  return REGIONS.map((region: Region) => ({
    region,
    dates: dates.reduce((acc, dateStr) => {
      acc[dateStr] = {
        times: getTimeslots(),
        capacities: timeslots.map(() => region.maxSize)
      };
      return acc;
    }, {} as Record<string, DateAvailability>)
  }));
}
