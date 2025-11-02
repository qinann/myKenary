'use client'

import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import classNames from '@/utils/classNames'
import { 
  TbSearch, 
  TbBell, 
  TbSettings, 
  TbUser, 
  TbLogout,
  TbMenu2,
  TbSun,
  TbMoon
} from 'react-icons/tb'

interface TravelHeaderProps {
  activeSection: string
  onToggleSidebar: () => void
}

export default function TravelHeader({ 
  activeSection, 
  onToggleSidebar 
}: TravelHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationCount] = useState(3)

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      'overview': 'Dashboard Overview',
      'bus-management': 'Manajemen Bus',
      'hotel-management': 'Manajemen Hotel',
      'student-management': 'Manajemen Siswa',
      'schedule-management': 'Manajemen Jadwal',
      'live-tracking': 'Live Tracking',
      'content-management': 'Manajemen Konten',
      'gallery-management': 'Manajemen Galeri',
      'worksheet-management': 'Manajemen Worksheet'
    }
    return titles[section] || 'Travel Dashboard'
  }

  const userMenuItems = [
    {
      label: 'Profile',
      icon: TbUser,
      onClick: () => console.log('Profile clicked')
    },
    {
      label: 'Settings',
      icon: TbSettings,
      onClick: () => console.log('Settings clicked')
    },
    {
      label: 'Logout',
      icon: TbLogout,
      onClick: () => console.log('Logout clicked'),
      className: 'text-red-600 dark:text-red-400'
    }
  ]

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="plain"
            size="sm"
            className="lg:hidden"
            onClick={onToggleSidebar}
          >
            <TbMenu2 className="w-5 h-5" />
          </Button>

          {/* Page Title */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {getSectionTitle(activeSection)}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Kelola perjalanan studi wisata Mykenary
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari siswa, bus, hotel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button variant="plain" size="sm">
              <TbBell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge 
                  content={notificationCount.toString()} 
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-xs"
                />
              )}
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button variant="plain" size="sm">
            <TbSun className="w-5 h-5 dark:hidden" />
            <TbMoon className="w-5 h-5 hidden dark:block" />
          </Button>

          {/* User Menu */}
          <Dropdown
            renderTitle={
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar 
                  size="sm" 
                  src="/img/avatars/thumb-1.jpg"
                  alt="User Avatar"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Admin Travel
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Administrator
                  </p>
                </div>
              </div>
            }
            placement="bottom-end"
          >
            <div className="w-48">
              {userMenuItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Dropdown.Item
                    key={index}
                    eventKey={index}
                    className={classNames(
                      'flex items-center space-x-2 px-3 py-2',
                      item.className || ''
                    )}
                    onClick={item.onClick}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Dropdown.Item>
                )
              })}
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari siswa, bus, hotel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
    </header>
  )
}