'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import Loading from '@/components/shared/Loading'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import AbbreviateNumber from '@/components/shared/AbbreviateNumber'
import useTheme from '@/utils/hooks/useTheme'
import { SIDE_NAV_COLLAPSED_WIDTH } from '@/constants/theme.constant'
import { TbUsers, TbBus, TbBuilding, TbMapPin } from 'react-icons/tb'
import dynamic from 'next/dynamic'
import type { TravelStatisticData } from '@/mock/data/travelDashboardData'

// Dynamic import Chart to avoid SSR issues
const Chart = dynamic(() => import('@/components/shared/Chart'), {
    ssr: false,
    loading: () => (
        <div className="h-[350px] flex items-center justify-center">
            <Loading loading />
        </div>
    ),
})

type StatisticCardProps = {
    title: string
    value: number
    icon: React.ComponentType<{ className?: string }>
    growShrink: number
    percentage?: boolean
    color: string
}

const StatisticCard = ({
    title,
    value,
    icon: Icon,
    growShrink,
    percentage = false,
    color,
}: StatisticCardProps) => {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            <AbbreviateNumber value={value} />
                        </h3>
                        <GrowShrinkValue
                            value={growShrink}
                            suffix={percentage ? '%' : ''}
                        />
                    </div>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </Card>
    )
}

type TravelOverviewProps = {
    data: {
        totalStudents: {
            value: number
            growShrink: number
            percentage: boolean
        }
        totalBuses: {
            value: number
            growShrink: number
            percentage: boolean
        }
        totalHotels: {
            value: number
            growShrink: number
            percentage: boolean
        }
        totalDestinations: {
            value: number
            growShrink: number
            percentage: boolean
        }
    }
}

const TravelOverview = ({ data }: TravelOverviewProps) => {
    const [selectedCategory, setSelectedCategory] = useState('students')
    const [selectedPeriod, setSelectedPeriod] = useState('thisMonth')
    const [chartWidth, setChartWidth] = useState<string | number>('100%')
    const [isClient, setIsClient] = useState(false)

    const sideNavCollapse = useTheme((state) => state.layout.sideNavCollapse)

    useEffect(() => {
        setIsClient(true)
        
        const handleResize = () => {
            if (sideNavCollapse) {
                setChartWidth(`calc(100vw - ${SIDE_NAV_COLLAPSED_WIDTH}px - 80px)`)
            } else {
                setChartWidth('100%')
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [sideNavCollapse])

    const periodOptions = [
        { value: 'thisMonth', label: 'Bulan Ini' },
        { value: 'lastMonth', label: 'Bulan Lalu' },
        { value: 'thisYear', label: 'Tahun Ini' },
    ]

    const chartData = {
        series: [
            {
                name: 'Siswa',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 155, 180, 245],
            },
            {
                name: 'Bus',
                data: [2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8, 8],
            },
        ],
        options: {
            chart: {
                type: 'line' as const,
                height: 350,
                toolbar: {
                    show: false,
                },
            },
            colors: ['#3B82F6', '#10B981'],
            stroke: {
                curve: 'smooth' as const,
                width: 3,
            },
            xaxis: {
                categories: [
                    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
                    'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'
                ],
            },
            yaxis: {
                title: {
                    text: 'Jumlah',
                },
            },
            legend: {
                position: 'top' as const,
            },
            grid: {
                borderColor: '#E5E7EB',
            },
        },
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatisticCard
                    title="Total Siswa"
                    value={data.totalStudents.value}
                    icon={TbUsers}
                    growShrink={data.totalStudents.growShrink}
                    percentage={data.totalStudents.percentage}
                    color="bg-blue-500"
                />
                <StatisticCard
                    title="Total Bus"
                    value={data.totalBuses.value}
                    icon={TbBus}
                    growShrink={data.totalBuses.growShrink}
                    percentage={data.totalBuses.percentage}
                    color="bg-green-500"
                />
                <StatisticCard
                    title="Hotel Partner"
                    value={data.totalHotels.value}
                    icon={TbBuilding}
                    growShrink={data.totalHotels.growShrink}
                    percentage={data.totalHotels.percentage}
                    color="bg-purple-500"
                />
                <StatisticCard
                    title="Total Destinasi"
                    value={data.totalDestinations.value}
                    icon={TbMapPin}
                    growShrink={data.totalDestinations.growShrink}
                    percentage={data.totalDestinations.percentage}
                    color="bg-orange-500"
                />
            </div>

            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Statistik Perjalanan
                    </h3>
                    {isClient && (
                        <Select
                            value={selectedPeriod}
                            onChange={(value) => setSelectedPeriod(value as string)}
                            options={periodOptions}
                            size="sm"
                            instanceId="travel-overview-period-select"
                        />
                    )}
                </div>
                <div className="h-[350px]">
                    {isClient ? (
                        <Chart
                            options={chartData.options}
                            series={chartData.series}
                            type="line"
                            height={350}
                            width={chartWidth}
                        />
                    ) : (
                        <div className="h-[350px] flex items-center justify-center">
                            <Loading loading />
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default TravelOverview