'use client'

import { useEffect, useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Form } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getDrivers, getTourLeaders } from '@/services/BusService'
import type { Bus, CreateBusDto, UpdateBusDto } from '@/@types/bus'

interface BusModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: CreateBusDto | UpdateBusDto) => void
    bus?: Bus | null
    loading?: boolean
}

const validationSchema = z.object({
    name: z.string().min(1, { message: 'Nama bus wajib diisi' }),
    plateNumber: z.string().min(1, { message: 'ID Bus wajib diisi' }),
    capacity: z.number().min(1, { message: 'Kapasitas minimal 1' }).max(100, { message: 'Kapasitas maksimal 100' }),
    occupancy: z.number().min(0, { message: 'Hunian tidak boleh negatif' }),
    currentLocation: z.string().optional(),
    driver: z.string().min(1, { message: 'Driver wajib diisi' }),
    tourLeaders: z.array(z.string()).min(1, { message: 'Minimal satu Tour Leader' }),
})

type FormData = z.infer<typeof validationSchema>



const BusModal = ({ isOpen, onClose, onSubmit, bus, loading = false }: BusModalProps) => {
    const isEdit = !!bus
    const [drivers, setDrivers] = useState<any[]>([])
    const [tourLeaders, setTourLeaders] = useState<any[]>([])
    const [loadingDrivers, setLoadingDrivers] = useState(false)
    const [loadingTourLeaders, setLoadingTourLeaders] = useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            name: '',
            plateNumber: '',
            capacity: 52,
            occupancy: 0,
            currentLocation: '',
            driver: '',
            tourLeaders: [],
        },
    })

    // Fetch drivers and tour leaders when modal opens
    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    setLoadingDrivers(true)
                    setLoadingTourLeaders(true)
                    
                    const [driversData, tourLeadersData] = await Promise.all([
                        getDrivers(),
                        getTourLeaders()
                    ])
                    
                    setDrivers(driversData)
                    setTourLeaders(tourLeadersData)
                } catch (error) {
                    console.error('Error fetching dropdown data:', error)
                } finally {
                    setLoadingDrivers(false)
                    setLoadingTourLeaders(false)
                }
            }
            
            fetchData()
        }
    }, [isOpen])

    useEffect(() => {
        if (bus) {
            reset({
                name: bus.name,
                plateNumber: bus.plateNumber || '',
                capacity: bus.capacity,
                occupancy: bus.occupancy,
                currentLocation: bus.currentLocation || '',
                driver: bus.driver || '',
                tourLeaders: Array.isArray(bus.tourLeaders) ? bus.tourLeaders : (bus as any).tourLeader ? [(bus as any).tourLeader] : [],
            })
        } else {
            reset({
                name: '',
                plateNumber: '',
                capacity: 52,
                occupancy: 0,
                currentLocation: '',
                driver: '',
                tourLeaders: [],
            })
        }
    }, [bus, reset])

    const handleFormSubmit = (data: FormData) => {
        // Sesuaikan payload agar kompatibel dengan DTO (tourLeaders array)
        const payload: CreateBusDto | UpdateBusDto = {
            ...data,
        }
        onSubmit(payload)
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    return (
        <Dialog
            isOpen={isOpen}
            onClose={handleClose}
            width={600}
        >
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                    {isEdit ? 'Edit Bus' : 'Tambah Bus Baru'}
                </h2>

                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="space-y-4">
                        <Card className="p-4">
                            <h3 className="text-lg font-medium mb-4">Informasi Bus</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Nama Bus <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Masukkan nama bus"
                                                invalid={!!errors.name}
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        ID Bus <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="plateNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Masukkan ID bus"
                                                invalid={!!errors.plateNumber}
                                            />
                                        )}
                                    />
                                    {errors.plateNumber && (
                                        <p className="text-red-500 text-sm mt-1">{errors.plateNumber.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Live Location
                                    </label>
                                    <Controller
                                        name="currentLocation"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Masukkan live location"
                                                disabled
                                                invalid={!!errors.currentLocation}
                                            />
                                        )}
                                    />
                                    {errors.currentLocation && (
                                        <p className="text-red-500 text-sm mt-1">{errors.currentLocation.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Kapasitas <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="capacity"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Masukkan kapasitas"
                                                invalid={!!errors.capacity}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                            />
                                        )}
                                    />
                                    {errors.capacity && (
                                        <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Occupancy <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="occupancy"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Masukkan occupancy"
                                                invalid={!!errors.occupancy}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                            />
                                        )}
                                    />
                                    {errors.occupancy && (
                                        <p className="text-red-500 text-sm mt-1">{errors.occupancy.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Driver <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="driver"
                                        control={control}
                                        render={({ field }) => {
                                            const driverOptions = drivers
                                                .map(driver => ({
                                                    value: driver.name,
                                                    label: `${driver.name} ${driver.isAvailable ? '(Tersedia)' : `(Terdaftar di ${driver.assignedBus || driver.bus || '-'})`}`,
                                                    isDisabled: !driver.isAvailable && driver.name !== field.value
                                                }))
                                            
                                            const selectedDriver = driverOptions.find(option => option.value === field.value)
                                            
                                            return (
                                                <Select
                                                    {...field}
                                                    value={selectedDriver}
                                                    onChange={(option) => field.onChange(option?.value || '')}
                                                    options={driverOptions}
                                                    placeholder={loadingDrivers ? "Memuat drivers..." : "Pilih driver"}
                                                    isLoading={loadingDrivers}
                                                    isDisabled={loadingDrivers}
                                                    invalid={!!errors.driver}
                                                    isOptionDisabled={(option) => (option as any).isDisabled === true}
                                                />
                                            )
                                        }}
                                    />
                                    {errors.driver && (
                                        <p className="text-red-500 text-sm mt-1">{errors.driver.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Tour Leader <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="tourLeaders"
                                        control={control}
                                        render={({ field }) => {
                                            const tourLeaderOptions = tourLeaders.map(tourLeader => ({
                                                value: tourLeader.name,
                                                label: `${tourLeader.name} ${tourLeader.isAvailable ? '(Tersedia)' : `(Terdaftar di ${tourLeader.assignedBus || tourLeader.bus || '-'})`}`,
                                                isDisabled: !tourLeader.isAvailable && !(Array.isArray(field.value) && (field.value as string[]).includes(tourLeader.name))
                                            }))

                                            const selectedOptions = Array.isArray(field.value)
                                                ? tourLeaderOptions.filter(opt => (field.value as string[]).includes(opt.value))
                                                : []

                                            return (
                                                <Select
                                                    isMulti
                                                    value={selectedOptions}
                                                    onChange={(options) => field.onChange((options as any[] | null)?.map(o => o.value) || [])}
                                                    options={tourLeaderOptions}
                                                    placeholder={loadingTourLeaders ? 'Memuat tour leaders...' : 'Pilih satu atau lebih tour leader'}
                                                    isLoading={loadingTourLeaders}
                                                    isDisabled={loadingTourLeaders}
                                                    invalid={!!errors.tourLeaders}
                                                    isOptionDisabled={(option) => (option as any).isDisabled === true}
                                                />
                                            )
                                        }}
                                    />
                                    {errors.tourLeaders && (
                                        <p className="text-red-500 text-sm mt-1">{errors.tourLeaders.message}</p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            variant="plain"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="solid"
                            loading={loading}
                        >
                            {isEdit ? 'Update Bus' : 'Tambah Bus'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Dialog>
    )
}

export default BusModal
