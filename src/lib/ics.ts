export function generateICS(event: {
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
}): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const [hours, minutes] = event.time.split(':').map(Number);
  const startDate = new Date(event.date);
  startDate.setHours(hours, minutes, 0);

  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 4);

  const formatDate = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding App//PT
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.description}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Lembrete do Casamento
END:VALARM
END:VEVENT
END:VCALENDAR`;
}

export function downloadICS(icsContent: string, filename: string): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
