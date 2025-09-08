"use client"
import { Moon, Star, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { Toggle } from "./ui/toggle"
import { useState } from "react"
import Image from "next/image"
import { WalletButton } from "./Wallet-Button"

interface NavbarProps {
  logoText?: string
  logoUrl?: string
  onStarGithub?: () => void
}

export const Navbar = ({ 
  logoText = "True-Faucet",
  logoUrl = "#",
  onStarGithub = () => window.open("https://github.com/VINODvoid", "_blank")
}: NavbarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleThemeToggle = (pressed: boolean) => {
    setIsDarkMode(pressed)
    if (pressed) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href={logoUrl} className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image src="/logo.svg" alt="Logo" width={32} height={32} />
              </div>
              <span className="text-xl font-semibold text-foreground">
                {logoText}
              </span>
              <span className="text-muted-foreground text-sm rounded-full border px-2 border-secondary-foreground">
                v 1.1
              </span>
            </a>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Toggle
              variant="outline"
              size="sm"
              pressed={isDarkMode}
              onPressedChange={handleThemeToggle}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
            >
              <Moon
                size={16}
                className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
                aria-hidden="true"
              />
              <Sun
                size={16}
                className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
                aria-hidden="true"
              />
            </Toggle>

            {/* ✅ Wallet Button */}
            <WalletButton />

            {/* Star on GitHub */}
            <Button
              variant="default"
              size="sm"
              onClick={onStarGithub}
              className="flex items-center space-x-2"
            >
              <Star size={16} />
              <span>Star on GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
