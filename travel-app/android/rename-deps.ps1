param(
    [string]$BasePath = "D:\mykenary\travel-app\android\.gradle\8.10.2\dependencies-accessors"
)

Write-Host "Scanning: $BasePath"
if (-not (Test-Path $BasePath)) {
    Write-Host "Base path not found: $BasePath"
    exit 0
}

Get-ChildItem -Path $BasePath -Directory | ForEach-Object {
    $name = $_.Name
    if ($name -match '^[0-9a-f]{40}-[0-9a-f-]+$') {
        $target = $name.Split('-')[0]
        $src = Join-Path $BasePath $name
        $dst = Join-Path $BasePath $target
        if (-not (Test-Path $dst)) {
            Write-Host "Renaming '$src' -> '$target'"
            Rename-Item -Path $src -NewName $target -Force
        } else {
            Write-Host "Target already exists: $dst"
        }
    }
}

Write-Host "Done."