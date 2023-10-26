import { type SidebarNavItem } from '@/types'

import { siteConfig } from '@/config/site'
import { MainNav } from '@/components/layouts/main-nav'
import { MobileNav } from '@/components/layouts/mobile-nav'
import { ThemeToggle } from '@/components/layouts/theme-toggle'

interface SiteHeaderProps {
  sidebarNav?: SidebarNavItem[]
}

export const SiteHeader = ({ sidebarNav }: SiteHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
