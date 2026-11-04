import { ContactOpeningHours } from "@ui-building/contact/contact.interface";

export const OPENING_HOURS: ContactOpeningHours[] = [
    {
        day: 'Monday - Friday' as string,
        hours: '9:00am - 6:00pm' as string,
    } as ContactOpeningHours,
    {
        day: 'Saturday' as string,
        hours: '10:00am - 4:00pm' as string,
    } as ContactOpeningHours,
    {
        day: 'Sunday' as string,
        hours: 'Closed' as string,
    } as ContactOpeningHours,
];