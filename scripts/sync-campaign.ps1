$SourcePath = "C:\Users\BRABILO\Desktop\campaign no 1 funnel webiste"
$DestPath = "$PSScriptRoot\public\ad-campaign"

if (Test-Path $SourcePath) {
    Write-Host "Syncing campaign files from $SourcePath to $DestPath..."
    if (-not (Test-Path $DestPath)) {
        New-Item -ItemType Directory -Path $DestPath -Force | Out-Null
    }
    Copy-Item -Path "$SourcePath\*" -Destination $DestPath -Recurse -Force
    Write-Host "Sync completed successfully!"
} else {
    Write-Warning "Source folder not found: $SourcePath"
}
