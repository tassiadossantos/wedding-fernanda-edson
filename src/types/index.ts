export interface WeddingConfig {
  couple: {
    partner1: string;
    partner2: string;
    initials: string;
  };
  event: {
    date: Date;
    ceremony: {
      time: string;
      venue: string;
      address: string;
      mapsUrl: string;
      wazeUrl: string;
    };
    reception: {
      time: string;
      venue: string;
      address: string;
      mapsUrl: string;
      wazeUrl: string;
    };
  };
  registry: {
    pixKey: string;
    pixLabel: string;
    storeUrl: string;
  };
  whatsapp: string;
  heroImage: string;
  audioSrc?: string;
}

export interface RSVPFormData {
  name: string;
  attending: 'yes' | 'no';
  guestCount: number;
  dietaryRestrictions: string;
  message: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
  approved: boolean;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: string;
}
