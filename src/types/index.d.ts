import { type Icons } from '@/components/icons'

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href?: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

// export type SidebarNavItem = NavItemWithChildren

export type SidebarNavItem = {
  title: string
  index?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    twitter: string
    github: string
    githubAccount: string
    discord: string
  }
  mainNav: MainNavItem[]
  footerNav: FooterItem[]
}
