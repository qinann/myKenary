import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const BOOKLET_NAME = 'booklet.pdf'
const BOOKLET_PATH = path.join(PUBLIC_DIR, BOOKLET_NAME)
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export async function GET() {
  try {
    await fs.access(BOOKLET_PATH)
    return NextResponse.json({ success: true, url: `${BASE_PATH}/${BOOKLET_NAME}` })
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Booklet belum tersedia' }, { status: 404 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'File tidak ditemukan' }, { status: 400 })
    }

    const pdf = file as File
    if (pdf.type !== 'application/pdf') {
      return NextResponse.json({ success: false, error: 'File harus berformat PDF' }, { status: 400 })
    }

    const arrayBuffer = await pdf.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    await fs.mkdir(PUBLIC_DIR, { recursive: true })
    await fs.writeFile(BOOKLET_PATH, buffer)

    return NextResponse.json({ success: true, url: `${BASE_PATH}/${BOOKLET_NAME}` })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || 'Gagal menyimpan booklet' }, { status: 500 })
  }
}