import joinedHandsImg from '../assets/images/nikah_young_hands_luminous_1795031189849.jpg';
import redRoseClusterImg from '../assets/images/red_rose_floral_cluster_1795030453782.jpg';
import redRoseBannerImg from '../assets/images/red_rose_banner_spray_1795030454623.jpg';
import gardenPavilionImg from '../assets/images/nikah_garden_pavilion_1795030454162.jpg';

export interface ScheduleEvent {
  id: string;
  indexLabel: string;
  title: string;
  time: string;
  subtitle: string;
}

export const WEDDING_DATA = {
  brand: {
    english: 'ULFAT-E-NIKAH',
    urdu: 'اُلفتِ نکاح',
    bismillah: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ',
    openingKicker: 'A Celebration of Nikah',
    blessingsLead: 'With the blessings of love and family',
  },
  couple: {
    bride: 'Eman Babar',
    groom: 'Sheikh Saud Saeed',
  },
  date: {
    full: '23 December 2026',
    day: '23',
    month: 'December',
    year: '2026',
    weekday: 'Wednesday',
    isoTarget: '2026-12-23T20:00:00+05:00',
  },
  schedule: [
    {
      id: 'nikah',
      indexLabel: '01',
      title: 'NIKAH',
      time: '8:00 PM',
      subtitle: 'Sacred vows, heartfelt prayers, and the union of two families.',
    },
    {
      id: 'dinner',
      indexLabel: '02',
      title: 'DINNER',
      time: '9:00 PM',
      subtitle: 'An evening banquet celebrating joy, warmth, and togetherness.',
    },
  ] as ScheduleEvent[],
  venue: {
    name: 'LALA ZAAR MARRIAGE LAWN',
    location: 'Near Al-syad Center, Quaid-Abad',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=LALA+ZAAR+MARRIAGE+LAWN+Near+Al-syad+Center+Quaid-Abad',
  },
  rsvp: {
    heading: 'With love, we await your gracious presence.',
    host: 'Mr. & Mrs. Babar Aziz',
    phoneDisplay: '0313-2042174',
    phoneHref: 'tel:03132042174',
    whatsappHref:
      'https://wa.me/923132042174?text=Assalam-o-Alaikum%2C%20with%20great%20joy%20we%20RSVP%20for%20the%20Nikah%20ceremony%20of%20Eman%20Babar%20%26%20Sheikh%20Saud%20Saeed%20on%2023%20December%202026.',
  },
  poetry: {
    lines: [
      'Two hearts, one serene promise,',
      'and a lifetime gently waiting to unfold.',
      'With gratitude in our souls and prayers all around,',
      'we invite you to grace the beginning of our forever.',
    ],
  },
  closing: {
    message: 'With love in our hearts,\nwe await your gracious presence.',
  },
  assets: {
    joinedHands: joinedHandsImg,
    roseCluster: redRoseClusterImg,
    roseBanner: redRoseBannerImg,
    gardenPavilion: gardenPavilionImg,
  },
} as const;
