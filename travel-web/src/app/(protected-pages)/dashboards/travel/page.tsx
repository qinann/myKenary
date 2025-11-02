import TravelOverview from './_components/TravelOverview'
import BusInfo from './_components/BusInfo'
import HotelInfo from './_components/HotelInfo'
import LiveLocation from './_components/LiveLocation'
import Schedule from './_components/Schedule'
import Students from './_components/Students'
import getTravelDashboard from '@/server/actions/getTravelDashboard'

export default async function Page() {
    const data = await getTravelDashboard()

    return (
        <div>
            <div className="flex flex-col gap-4 max-w-full overflow-x-hidden">
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="flex flex-col gap-4 flex-1 xl:col-span-3">
                        <TravelOverview data={data.statisticData} />
                        <LiveLocation data={data.locationData} />
                    </div>
                    <div className="flex flex-col gap-4 2xl:min-w-[360px]">
                        <BusInfo data={data.busData} />
                        <HotelInfo data={data.hotelData} />
                        <Schedule data={data.scheduleData} />
                    </div>
                </div>

                <Students data={data.studentsData} />
            </div>
        </div>
    )
}

