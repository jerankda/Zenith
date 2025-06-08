"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Search,
  Mail,
  Sun,
  Github,
  Play,
  Music,
  Monitor,
  Twitter,
  Settings,
  X,
  Calculator,
  Clock,
  BookOpen,
} from "lucide-react"
import { Card } from "@/components/ui/card"

interface QuickLink {
  id: string
  name: string
  url: string
  icon: any
  color: string
  enabled: boolean
}

interface Widget {
  id: string
  name: string
  enabled: boolean
}

export default function HomePage() {
  const [time, setTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [showSettings, setShowSettings] = useState(false)

  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([
    { id: "gmail", name: "Gmail", url: "https://gmail.com", icon: Mail, color: "bg-red-500", enabled: true },
    { id: "github", name: "GitHub", url: "https://github.com", icon: Github, color: "bg-gray-800", enabled: true },
    { id: "youtube", name: "YouTube", url: "https://youtube.com", icon: Play, color: "bg-red-600", enabled: true },
    { id: "twitter", name: "Twitter", url: "https://twitter.com", icon: Twitter, color: "bg-blue-400", enabled: true },
    { id: "netflix", name: "Netflix", url: "https://netflix.com", icon: Monitor, color: "bg-red-600", enabled: true },
    { id: "spotify", name: "Spotify", url: "https://spotify.com", icon: Music, color: "bg-green-500", enabled: true },
    // Additional options
    { id: "reddit", name: "Reddit", url: "https://reddit.com", icon: BookOpen, color: "bg-orange-500", enabled: false },
    {
      id: "discord",
      name: "Discord",
      url: "https://discord.com",
      icon: Monitor,
      color: "bg-indigo-600",
      enabled: false,
    },
    { id: "amazon", name: "Amazon", url: "https://amazon.com", icon: Search, color: "bg-yellow-500", enabled: false },
    { id: "notion", name: "Notion", url: "https://notion.so", icon: BookOpen, color: "bg-gray-700", enabled: false },
  ])

  const [widgets, setWidgets] = useState<Widget[]>([
    { id: "weather", name: "Weather", enabled: true },
    { id: "notes", name: "Quick Notes", enabled: true },
    { id: "system", name: "System Info", enabled: true },
    { id: "clock", name: "World Clock", enabled: false },
    { id: "calculator", name: "Quick Calculator", enabled: false },
  ])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (searchQuery.includes(".") || searchQuery.startsWith("http")) {
        window.open(searchQuery.startsWith("http") ? searchQuery : `https://${searchQuery}`, "_blank")
      } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank")
      }
      setSearchQuery("")
    }
  }

  const toggleQuickLink = (id: string) => {
    setQuickLinks((links) => links.map((link) => (link.id === id ? { ...link, enabled: !link.enabled } : link)))
  }

  const toggleWidget = (id: string) => {
    setWidgets((widgets) =>
      widgets.map((widget) => (widget.id === id ? { ...widget, enabled: !widget.enabled } : widget)),
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const enabledQuickLinks = quickLinks.filter((link) => link.enabled)
  const enabledWidgets = widgets.filter((widget) => widget.enabled)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>

      {/* Settings Icon */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed top-6 right-6 z-20 w-10 h-10 rounded-full backdrop-blur-md bg-white/40 border border-white/20 flex items-center justify-center hover:bg-white/60 transition-all duration-200 shadow-lg"
      >
        <Settings className="w-5 h-5 text-gray-600" />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
          <Card className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-white/90 border-0 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-gray-800">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Quick Access Settings */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Access Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/60 border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${link.color} rounded-lg flex items-center justify-center`}>
                          <link.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{link.name}</span>
                      </div>
                      <button
                        onClick={() => toggleQuickLink(link.id)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          link.enabled ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                            link.enabled ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget Settings */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Widgets</h3>
                <div className="space-y-3">
                  {widgets.map((widget) => (
                    <div
                      key={widget.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/60 border border-gray-200"
                    >
                      <span className="text-sm font-medium text-gray-700">{widget.name}</span>
                      <button
                        onClick={() => toggleWidget(widget.id)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          widget.enabled ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                            widget.enabled ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Appearance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/60 border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">24-Hour Time Format</span>
                    <button className="w-12 h-6 rounded-full bg-gray-300">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm translate-x-0.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/60 border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Show Seconds</span>
                    <button className="w-12 h-6 rounded-full bg-gray-300">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Time and Date */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black text-gray-800/60 mb-2 tracking-tight">{formatTime(time)}</h1>
          <p className="text-xl text-gray-600 font-light">{formatDate(time)}</p>
        </div>

        {/* Search Bar - Spotlight Style */}
        <div className="w-full max-w-2xl mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/40 shadow-2xl border border-white/20 transition-all duration-300 hover:bg-white/50">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Google or type a URL"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-5 py-3 text-lg bg-transparent border-0 focus:ring-0 focus:outline-none placeholder:text-gray-500 text-gray-800"
              />
            </div>
          </form>
        </div>

        {/* Quick Links */}
        {enabledQuickLinks.length > 0 && (
          <div className="w-full max-w-4xl mb-12">
            <h2 className="text-2xl font-light text-gray-700 mb-6 text-center">Quick Access</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {enabledQuickLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center"
                >
                  <div
                    className={`w-16 h-16 ${link.color} rounded-2xl flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform duration-200 group-hover:shadow-xl`}
                  >
                    <link.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Widgets */}
        {enabledWidgets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {enabledWidgets.map((widget) => {
              if (widget.id === "weather") {
                return (
                  <Card key={widget.id} className="backdrop-blur-md bg-white/60 border-0 shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Weather</p>
                        <p className="text-2xl font-light text-gray-800">72°F</p>
                        <p className="text-sm text-gray-500">Partly Cloudy</p>
                      </div>
                      <Sun className="w-8 h-8 text-yellow-500" />
                    </div>
                  </Card>
                )
              }

              if (widget.id === "notes") {
                return (
                  <Card key={widget.id} className="backdrop-blur-md bg-white/60 border-0 shadow-lg p-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Quick Note</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Welcome to your new homepage! Customize it using the settings in the top-right corner.
                      </p>
                    </div>
                  </Card>
                )
              }

              if (widget.id === "system") {
                return (
                  <Card key={widget.id} className="backdrop-blur-md bg-white/60 border-0 shadow-lg p-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">System</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Browser</span>
                          <span className="text-gray-700">Chrome</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">OS</span>
                          <span className="text-gray-700">macOS Style</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              }

              if (widget.id === "clock") {
                return (
                  <Card key={widget.id} className="backdrop-blur-md bg-white/60 border-0 shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">World Clock</p>
                        <p className="text-lg font-light text-gray-800">London: 3:45 PM</p>
                        <p className="text-sm text-gray-500">Tokyo: 11:45 PM</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-500" />
                    </div>
                  </Card>
                )
              }

              if (widget.id === "calculator") {
                return (
                  <Card key={widget.id} className="backdrop-blur-md bg-white/60 border-0 shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Calculator</p>
                        <p className="text-lg font-light text-gray-800">0</p>
                        <p className="text-sm text-gray-500">Quick calculations</p>
                      </div>
                      <Calculator className="w-8 h-8 text-green-500" />
                    </div>
                  </Card>
                )
              }

              return null
            })}
          </div>
        )}
      </div>
    </div>
  )
}
