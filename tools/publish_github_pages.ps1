param(
  [Parameter(Mandatory = $true)]
  [string]$RepositoryUrl
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath "index.html")) {
  throw "请在 homecare-ai-miniapp-prototype 项目根目录运行此脚本。"
}

git status --short

$existingOrigin = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0 -and $existingOrigin) {
  git remote set-url origin $RepositoryUrl
} else {
  git remote add origin $RepositoryUrl
}

git branch -M main
git push -u origin main

Write-Host ""
Write-Host "推送完成。请到 GitHub 仓库 Settings -> Pages 中选择 Deploy from a branch: main / root。"
