export function generateCalendarLink(date: Date): string {
  const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const start = formatDate(date);
  const end = new Date(date.getTime() + 4 * 60 * 60 * 1000);
  const formattedEnd = formatDate(end);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Casamento Ana & Pedro',
    dates: `${start}/${formattedEnd}`,
    details: 'Celebre conosco este momento especial!',
    location: 'Igreja de Nossa Senhora, Rua das Flores, 123 - Centro',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcs(date: Date): void {
  const end = new Date(date.getTime() + 4 * 60 * 60 * 1000);

  const formatIcsDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Casamento Ana e Pedro//BR',
    'BEGIN:VEVENT',
    `DTSTART:${formatIcsDate(date)}`,
    `DTEND:${formatIcsDate(end)}`,
    'SUMMARY:Casamento Ana & Pedro',
    'DESCRIPTION:Celebre conosco este momento especial!',
    'LOCATION:Igreja de Nossa Senhora, Rua das Flores, 123 - Centro',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'casamento-ana-pedro.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
