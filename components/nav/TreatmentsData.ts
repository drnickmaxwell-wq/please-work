export type MenuItem = { href: string; label: string };
export type MenuGroup = { title: string; items: MenuItem[] };

export const treatmentGroups: MenuGroup[] = [
  {
    title: 'General',
    items: [
      { href: '/treatments/general', label: 'Overview' },
      { href: '/treatments/general/check-ups', label: 'Check-Ups' },
      { href: '/treatments/general/childrens-dentistry', label: 'Children’s Dentistry' },
      { href: '/treatments/general/crowns-and-bridges', label: 'Crowns & Bridges' },
      { href: '/treatments/general/extractions', label: 'Extractions' },
      { href: '/treatments/general/root-canal-treatment', label: 'Root Canal' },
      { href: '/treatments/general/sedation', label: 'Sedation' },
      { href: '/treatments/general/tooth-coloured-fillings', label: 'Tooth-Coloured Fillings' },
    ],
  },
  {
    title: '3-D Dentistry',
    items: [
      { href: '/treatments/3d-dentistry', label: 'Overview' },
      { href: '/treatments/3d-dentistry/3d-implants-overview', label: '3-D Implants' },
      { href: '/treatments/3d-dentistry/3d-printed-veneers', label: '3-D Printed Veneers' },
      { href: '/treatments/3d-dentistry/3d-restorative-dentistry', label: '3-D Restorative' },
      { href: '/treatments/3d-dentistry/3d-same-day-dentures', label: 'Same-Day Dentures' },
    ],
  },
  {
    title: 'Implants',
    items: [
      { href: '/treatments/implants', label: 'Overview' },
      { href: '/treatments/implants/guided-implants', label: 'Guided Implants' },
      { href: '/treatments/implants/all-on-4-6-same-day', label: 'All-on-4/6 Same-Day' },
      { href: '/treatments/implants/same-day-implants', label: 'Same-Day Implants' },
      { href: '/treatments/implants/3d-printed-restorations', label: '3-D Printed Restorations' },
    ],
  },
  {
    title: 'Orthodontics',
    items: [
      { href: '/treatments/orthodontics', label: 'Overview' },
      { href: '/treatments/orthodontics/fixed-braces', label: 'Fixed Braces' },
      { href: '/treatments/orthodontics/spark-aligners', label: 'Spark Aligners' },
    ],
  },
  {
    title: 'Cosmetic',
    items: [
      { href: '/treatments/cosmetic', label: 'Overview' },
      { href: '/treatments/cosmetic/veneers', label: 'Porcelain Veneers' },
      { href: '/treatments/cosmetic/teeth-whitening', label: 'Teeth Whitening' },
      { href: '/treatments/cosmetic/composite-bonding', label: 'Composite Bonding' },
    ],
  },
  {
    title: 'Technology',
    items: [
      { href: '/treatments/technology', label: 'Overview' },
      { href: '/treatments/technology/3d-scanning-and-printing', label: '3-D Scanning & Printing' },
      { href: '/treatments/technology/soft-tissue-laser', label: 'Soft Tissue Laser' },
      { href: '/treatments/technology/the-wand-painless-numbing', label: 'The Wand (Painless Numbing)' },
    ],
  },
];
