import type { SiteConfig } from '@/types'

import { practices } from '@/config/practices'

const links = {
  twitter: 'https://twitter.com/edwinperez008',
  github: 'https://github.com/Edwin00821/Dream-Team',
  githubAccount: 'https://github.com/Edwin00821',
  discord: 'https://discord.com/users/edwin00821',
}

export const siteConfig: SiteConfig = {
  name: 'Dream Team',
  description:
    'Prácticas del laboratorio de cálculo de la Escuela Superior de Computo IPN ',
  url: 'https://dream-team-orcin.vercel.app',
  links,
  mainNav: [
    {
      title: 'Lobby',
      items: [],
    },
    {
      title: 'Practicas',
      items: [
        {
          title: 'Todas las practicas',
          href: `/practices`,
          description: `Todas las practicas del laboratorio`,
          items: [],
        },
        ...practices,
      ],
    },
  ],
  footerNav: [
    {
      title: 'Integrantes',
      items: [
        {
          title: 'Astudillo Pérez Edwin Uriel',
        },
        {
          title: 'Avila Ponce Alexander Kalid',
        },
        {
          title: 'Pérez Méndez Nancy',
        },
        {
          title: 'Posadas Villegas Octavio',
        },
        {
          title: 'Ramirez Embarcadero Valeria',
        },
        {
          title: 'Leyva López Daniel',
        },
      ],
    },
    {
      title: 'Help',
      items: [
        {
          title: 'About',
          href: '/about',
          external: false,
        },
        {
          title: 'Contact',
          href: '/contact',
          external: false,
        },
        {
          title: 'Terms',
          href: '/terms',
          external: false,
        },
        {
          title: 'Privacy',
          href: '/privacy',
          external: false,
        },
      ],
    },
    {
      title: 'Social',
      items: [
        {
          title: 'Twitter',
          href: links.twitter,
          external: true,
        },
        {
          title: 'GitHub',
          href: links.githubAccount,
          external: true,
        },
        {
          title: 'Discord',
          href: links.discord,
          external: true,
        },
      ],
    },
  ],
}
