param(
    [string]$Path = "GitHub-Copilot-Advanced-Workshop.pptx"
)

$ErrorActionPreference = "Stop"

function Invoke-ComAction {
    param(
        [scriptblock]$Action,
        [string]$Operation,
        [int]$MaxAttempts = 30
    )

    for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
        try {
            & $Action
            return
        }
        catch {
            $hresult = if ($null -ne $_.Exception.InnerException) {
                $_.Exception.InnerException.HResult
            }
            else {
                $_.Exception.HResult
            }
            $errorText = $_ | Out-String
            $isBusy = $hresult -in @(-2147418111, -2147417846) -or
                $errorText -match "RPC_E_CALL_REJECTED|RPC_E_SERVERCALL_RETRYLATER|0x80010001|0x8001010A"

            if (-not $isBusy -or $attempt -eq $MaxAttempts) {
                throw
            }

            Start-Sleep -Milliseconds 1000
        }
    }

    throw "$Operation did not complete."
}

$resolvedPath = (Resolve-Path $Path).Path
$baseName = [System.IO.Path]::GetFileNameWithoutExtension($resolvedPath)
$jobId = [Guid]::NewGuid()
$sourceCopyPath = Join-Path ([System.IO.Path]::GetTempPath()) "$baseName.$jobId.raw.pptx"
$temporaryPath = Join-Path ([System.IO.Path]::GetTempPath()) "$baseName.$jobId.office.pptx"

$existingPowerPointIds = @(Get-Process -Name POWERPNT -ErrorAction SilentlyContinue).Id
$powerPointProcessId = $null
$powerPoint = $null
$presentation = $null
$shutdownFailed = $false

Copy-Item $resolvedPath $sourceCopyPath -Force

try {
    try {
        $powerPoint = New-Object -ComObject PowerPoint.Application
        $powerPointProcessId = @(
            Get-Process -Name POWERPNT -ErrorAction SilentlyContinue |
                Where-Object { $_.Id -notin $existingPowerPointIds } |
                Sort-Object StartTime -Descending |
                Select-Object -First 1
        ).Id
        $powerPoint.DisplayAlerts = 1
        $presentation = $powerPoint.Presentations.Open(
            $sourceCopyPath,
            $false,
            $false,
            $false
        )
        Invoke-ComAction -Operation "Save presentation" -Action {
            $presentation.SaveAs($temporaryPath, 24)
        }
        Start-Sleep -Milliseconds 750
    }
    finally {
        try {
            if ($null -ne $presentation) {
                try {
                    Invoke-ComAction -Operation "Close presentation" -MaxAttempts 5 -Action {
                        $presentation.Close()
                    }
                }
                catch {
                    $shutdownFailed = $true
                }
                finally {
                    [System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($presentation) | Out-Null
                }
            }
        }
        finally {
            if ($null -ne $powerPoint) {
                try {
                    [GC]::Collect()
                    [GC]::WaitForPendingFinalizers()
                    Start-Sleep -Seconds 2
                    Invoke-ComAction -Operation "Quit PowerPoint" -MaxAttempts 5 -Action {
                        $powerPoint.Quit()
                    }
                }
                catch {
                    $shutdownFailed = $true
                }
                finally {
                    [System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($powerPoint) | Out-Null
                    [GC]::Collect()
                    [GC]::WaitForPendingFinalizers()
                }

                if ($shutdownFailed) {
                    $process = Get-Process -Id $powerPointProcessId -ErrorAction SilentlyContinue
                    if ($null -ne $process) {
                        Stop-Process -Id $powerPointProcessId
                        Start-Sleep -Seconds 1
                    }
                    elseif ($null -eq $powerPointProcessId) {
                        throw "PowerPoint did not quit cleanly and its process could not be identified."
                    }
                }
            }
        }
    }

    Copy-Item $temporaryPath $resolvedPath -Force
}
finally {
    Remove-Item $sourceCopyPath, $temporaryPath -Force -ErrorAction SilentlyContinue
}

Write-Output "Finalized $resolvedPath with Microsoft PowerPoint."
