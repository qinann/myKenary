export function withBasePath(path: string | undefined): string | undefined {
    if (!path) return path
    const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
    // Only prefix absolute paths from public folder
    if (!base || !path.startsWith('/')) return path
    // Avoid double-prefix
    if (path.startsWith(base + '/')) return path
    const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
    return `${normalizedBase}${path}`
}

export default withBasePath