import type { WeddingConfig } from '../types';

export const weddingConfig: WeddingConfig = {
  couple: {
    partner1: 'Naiara',
    partner2: 'Matheus',
    initials: 'N&M',
  },
  event: {
    date: new Date('2026-10-16T16:00:00'),
    ceremony: {
      time: '16:00',
      venue: 'Salão do Reino das Testemunhas de Jeová',
      address: 'R. Amélia Rodrigues, 13 - Alto da Cruz, Camaçari - BA, 42800-970',
      mapsUrl: 'https://maps.app.goo.gl/kate9NACx6JkF9Ws6',
      wazeUrl: 'https://waze.com/ul?q=-23.5505,-46.6333',
    },
    reception: {
      time: '18:00',
      venue: 'Espaço Jardim Encantado',
      address: 'Av. Paulista, 456 - Bela Vista',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-23.5613,-46.6556',
      wazeUrl: 'https://waze.com/ul?q=-23.5613,-46.6556',
    },
  },
  registry: {
    pixKey: '00020126580014br.gov.bcb.pix0136Ana Silva - Casamento021201234567890A',
    pixLabel: 'Chave Pix Casamento Naiara & Matheus',
    storeUrl: 'https://www.lista.de.casamento.com/anaepedro',
  },
  whatsapp: '5511999999999',
  heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
};
