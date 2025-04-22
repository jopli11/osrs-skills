$iconUrls = @{
    "attack" = "https://oldschool.runescape.wiki/images/f/f7/Attack_icon.png"
    "strength" = "https://oldschool.runescape.wiki/images/7/7d/Strength_icon.png"
    "defence" = "https://oldschool.runescape.wiki/images/b/b7/Defence_icon.png"
    "ranged" = "https://oldschool.runescape.wiki/images/e/e8/Ranged_icon.png"
    "prayer" = "https://oldschool.runescape.wiki/images/8/87/Prayer_icon.png"
    "magic" = "https://oldschool.runescape.wiki/images/5/5c/Magic_icon.png"
    "runecraft" = "https://oldschool.runescape.wiki/images/9/9d/Runecraft_icon.png"
    "construction" = "https://oldschool.runescape.wiki/images/c/ca/Construction_icon.png"
    "hitpoints" = "https://oldschool.runescape.wiki/images/9/96/Hitpoints_icon.png"
    "agility" = "https://oldschool.runescape.wiki/images/d/dc/Agility_icon.png"
    "herblore" = "https://oldschool.runescape.wiki/images/0/07/Herblore_icon.png"
    "thieving" = "https://oldschool.runescape.wiki/images/b/b0/Thieving_icon.png"
    "crafting" = "https://oldschool.runescape.wiki/images/3/3a/Crafting_icon.png"
    "fletching" = "https://oldschool.runescape.wiki/images/2/2e/Fletching_icon.png"
    "slayer" = "https://oldschool.runescape.wiki/images/2/28/Slayer_icon.png"
    "hunter" = "https://oldschool.runescape.wiki/images/d/dd/Hunter_icon.png"
    "mining" = "https://oldschool.runescape.wiki/images/4/4a/Mining_icon.png"
    "smithing" = "https://oldschool.runescape.wiki/images/3/39/Smithing_icon.png"
    "fishing" = "https://oldschool.runescape.wiki/images/f/f3/Fishing_icon.png"
    "cooking" = "https://oldschool.runescape.wiki/images/d/dc/Cooking_icon.png"
    "firemaking" = "https://oldschool.runescape.wiki/images/6/61/Firemaking_icon.png"
    "woodcutting" = "https://oldschool.runescape.wiki/images/1/1b/Woodcutting_icon.png"
    "farming" = "https://oldschool.runescape.wiki/images/f/fb/Farming_icon.png"
}

$outputDir = "public/icons/skills"
New-Item -Path $outputDir -ItemType Directory -Force | Out-Null

foreach ($skill in $iconUrls.Keys) {
    $url = $iconUrls[$skill]
    $outputPath = Join-Path $outputDir "$skill.png"
    Write-Host "Downloading $skill icon to $outputPath"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath
        Write-Host "Downloaded $skill icon successfully" -ForegroundColor Green
    } catch {
        Write-Host "Failed to download $skill icon: $_" -ForegroundColor Red
    }
}

Write-Host "All icons downloaded successfully!" -ForegroundColor Green 