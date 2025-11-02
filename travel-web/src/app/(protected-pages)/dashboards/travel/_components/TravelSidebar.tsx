'use client'

import classNames from '@/utils/classNames'
import ScrollBar from '@/components/ui/ScrollBar'
import Logo from '@/components/template/Logo'
import Menu from '@/components/ui/Menu'
import useTheme from '@/utils/hooks/useTheme'
import Link from 'next/link'
import { 
  TbDashboard, 
  TbBus, 
  TbBuildingSkyscraper, 
  TbCalendarEvent, 
  TbSchool, 
  TbBookmarks, 
  TbPhotoPlus, 
  TbRoute,
  TbNotebook
} from 'react-icons/tb'
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_CONTENT_GUTTER,
    HEADER_HEIGHT,
    LOGO_X_GUTTER,
} from '@/constants/theme.constant'
import appConfig from '@/configs/app.config'

interface TravelSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  collapsed?: boolean
}

const { MenuItem } = Menu

const sideNavStyle = {
    width: SIDE_NAV_WIDTH,
    minWidth: SIDE_NAV_WIDTH,
}

const sideNavCollapseStyle = {
    width: SIDE_NAV_COLLAPSED_WIDTH,
    minWidth: SIDE_NAV_COLLAPSED_WIDTH,
}

const menuItems = [
  {
    key: 'overview',
    title: 'Dashboard',
    icon: TbDashboard,
  },
  {
    key: 'bus-management',
    title: 'Manajemen Bus',
    icon: TbBus,
  },
  {
    key: 'hotel-management',
    title: 'Manajemen Hotel',
    icon: TbBuildingSkyscraper,
  },
  {
    key: 'student-management',
    title: 'Manajemen Siswa',
    icon: TbSchool,
  },
  {
    key: 'schedule-management',
    title: 'Manajemen Jadwal',
    icon: TbCalendarEvent,
  },
  {
    key: 'live-tracking',
    title: 'Live Tracking',
    icon: TbRoute,
  },
  {
    key: 'content-management',
    title: 'Manajemen Konten',
    icon: TbBookmarks,
  },
  {
    key: 'gallery-management',
    title: 'Manajemen Galeri',
    icon: TbPhotoPlus,
  },
  {
    key: 'worksheet-management',
    title: 'Manajemen Worksheet',
    icon: TbNotebook,
  },
]

export default function TravelSidebar({ 
  activeSection, 
  onSectionChange, 
  collapsed = false
}: TravelSidebarProps) {
  const defaultMode = useTheme((state) => state.mode)
  const direction = useTheme((state) => state.direction)
  const sideNavCollapse = useTheme((state) => state.layout.sideNavCollapse)

  return (
    <div
      style={sideNavCollapse ? sideNavCollapseStyle : sideNavStyle}
      className={classNames(
        'side-nav hidden lg:block',
        'side-nav-bg',
        !sideNavCollapse && 'side-nav-expand',
      )}
    >
      <Link
        href={appConfig.authenticatedEntryPath}
        className="side-nav-header flex flex-col justify-center"
        style={{ height: HEADER_HEIGHT }}
      >
        <Logo
          imgClass="max-h-10"
          mode={defaultMode}
          type={sideNavCollapse ? 'streamline' : 'full'}
          className={classNames(
            sideNavCollapse && 'ltr:ml-[11.5px] ltr:mr-[11.5px]',
            sideNavCollapse
              ? SIDE_NAV_CONTENT_GUTTER
              : LOGO_X_GUTTER,
          )}
        />
      </Link>
      <div className="side-nav-content">
        <ScrollBar style={{ height: '100%' }} direction={direction}>
          <Menu
            className="px-4 pb-4"
            sideCollapsed={sideNavCollapse}
            defaultActiveKeys={[activeSection]}
          >
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const isActive = activeSection === item.key
              
              return (
                <MenuItem 
                  key={item.key} 
                  eventKey={item.key}
                  className="mb-2"
                  isActive={isActive}
                >
                  <div
                    className="flex items-center gap-2 h-full w-full cursor-pointer"
                    onClick={() => onSectionChange(item.key)}
                  >
                    <span className="text-2xl">
                      <IconComponent />
                    </span>
                    {!sideNavCollapse && <span>{item.title}</span>}
                  </div>
                </MenuItem>
              )
            })}
          </Menu>
        </ScrollBar>
      </div>
    </div>
  )
}