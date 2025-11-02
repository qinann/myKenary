export const travelDashboardData = {
    statisticData: {
        totalStudents: {
            value: 245,
            growShrink: 12.5,
            percentage: true
        },
        totalBuses: {
            value: 8,
            growShrink: 2,
            percentage: false
        },
        totalHotels: {
            value: 15,
            growShrink: 3,
            percentage: false
        },
        totalDestinations: {
            value: 12,
            growShrink: 1,
            percentage: false
        }
    },
    busData: [
        {
            id: 'A1',
            name: 'Bus Jakarta - Bandung',
            capacity: 45,
            occupied: 42,
            driver: 'Ahmad Suryadi',
            status: 'active',
            route: 'Jakarta - Bandung',
            currentLocation: 'Rest Area KM 45'
        },
        {
            id: 'B1',
            name: 'Bus Jakarta - Yogya',
            capacity: 45,
            occupied: 38,
            driver: 'Budi Santoso',
            status: 'active',
            route: 'Jakarta - Yogyakarta',
            currentLocation: 'Tol Cipularang'
        },
        {
            id: 'C1',
            name: 'Bus Jakarta - Malang',
            capacity: 45,
            occupied: 40,
            driver: 'Candra Wijaya',
            status: 'active',
            route: 'Jakarta - Malang',
            currentLocation: 'Bekasi Timur'
        }
    ],
    hotelData: [
        {
            id: 'HTL001',
            name: 'Hotel Savoy Homann',
            location: 'Bandung',
            rating: 4.5,
            availableRooms: 25,
            totalRooms: 50,
            price: 750000,
            checkedInStudents: 45
        },
        {
            id: 'HTL002',
            name: 'Grand Hotel Yogyakarta',
            location: 'Yogyakarta',
            rating: 4.3,
            availableRooms: 18,
            totalRooms: 40,
            price: 650000,
            checkedInStudents: 38
        },
        {
            id: 'HTL003',
            name: 'Hotel Tugu Malang',
            location: 'Malang',
            rating: 4.7,
            availableRooms: 22,
            totalRooms: 35,
            price: 850000,
            checkedInStudents: 40
        }
    ],
    locationData: {
        buses: [
            {
                id: 'A1',
                name: 'Bus Jakarta - Bandung',
                lat: -6.9175,
                lng: 107.6191,
                status: 'moving',
                speed: 65,
                destination: 'Bandung'
            },
            {
                id: 'B1',
                name: 'Bus Jakarta - Yogya',
                lat: -7.7956,
                lng: 110.3695,
                status: 'stopped',
                speed: 0,
                destination: 'Yogyakarta'
            },
            {
                id: 'C1',
                name: 'Bus Jakarta - Malang',
                lat: -7.9666,
                lng: 112.6326,
                status: 'moving',
                speed: 55,
                destination: 'Malang'
            }
        ]
    },
    scheduleData: [
        {
            id: 'SCH001',
            time: '06:00',
            activity: 'Berkumpul di sekolah',
            status: 'completed',
            location: 'SMA Negeri 1 Jakarta'
        },
        {
            id: 'SCH002',
            time: '07:00',
            activity: 'Berangkat ke destinasi',
            status: 'completed',
            location: 'Sekolah'
        },
        {
            id: 'SCH003',
            time: '12:00',
            activity: 'Makan siang di rest area',
            status: 'completed',
            location: 'Rest Area KM 45'
        },
        {
            id: 'SCH004',
            time: '15:00',
            activity: 'Tiba di hotel',
            status: 'current',
            location: 'Hotel Savoy Homann'
        },
        {
            id: 'SCH005',
            time: '19:00',
            activity: 'Makan malam',
            status: 'upcoming',
            location: 'Hotel Restaurant'
        },
        {
            id: 'SCH006',
            time: '21:00',
            activity: 'Istirahat',
            status: 'upcoming',
            location: 'Hotel Room'
        }
    ],
    studentsData: [
        {
            id: 'STD001',
            name: 'Ahmad Rizki',
            class: 'XII IPA 1',
            bus: 'A1',
            hotel: 'Hotel Savoy Homann',
            status: 'present',
            checkInTime: '15:30'
        },
        {
            id: 'STD002',
            name: 'Siti Nurhaliza',
            class: 'XII IPA 1',
            bus: 'A1',
            hotel: 'Hotel Savoy Homann',
            status: 'present',
            checkInTime: '15:32'
        },
        {
            id: 'STD003',
            name: 'Budi Santoso',
            class: 'XII IPA 2',
            bus: 'B1',
            hotel: 'Grand Hotel Yogyakarta',
            status: 'present',
            checkInTime: '16:15'
        },
        {
            id: 'STD004',
            name: 'Dewi Sartika',
            class: 'XII IPA 2',
            bus: 'B1',
            hotel: 'Grand Hotel Yogyakarta',
            status: 'present',
            checkInTime: '16:18'
        },
        {
            id: 'STD005',
            name: 'Andi Wijaya',
            class: 'XII IPS 1',
            bus: 'C1',
            hotel: 'Hotel Tugu Malang',
            status: 'present',
            checkInTime: '17:00'
        }
    ]
}