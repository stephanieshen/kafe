import { Region } from "../models/region.model";

export const REGIONS: Region[] = [
  {
    id: 1,
    label: 'Main Hall',
    maxSize: 12,
    isChildrenAllowed: true,
    isSmokingAllowed: false
  },
  {
    id: 2,
    label: 'Bar',
    maxSize: 4,
    isChildrenAllowed: false,
    isSmokingAllowed: false
  },
  {
    id: 3,
    label: 'Riverside',
    maxSize: 8,
    isChildrenAllowed: true,
    isSmokingAllowed: false
  },
  {
    id: 4,
    label: 'Riverside (Smoking)',
    maxSize: 6,
    isChildrenAllowed: false,
    isSmokingAllowed: true
  }
];
