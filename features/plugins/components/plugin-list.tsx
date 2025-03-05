"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePlugins } from "../hooks/use-plugins"
import { Plugin } from "../types"

interface PluginListProps {
  onAuthInitiate?: (pluginName: string) => Promise<void>
}

export function PluginList({ onAuthInitiate }: PluginListProps) {
  const [error, setError] = useState<string | null>(null)
  const { data, isLoading, isError } = usePlugins()
  
  // Ensure plugins is always an array
  const plugins =  data?.plugins ?? []

  console.log(plugins)

  const handleInitiateAuth = async (pluginName: string) => {
    if (!onAuthInitiate) return
    
    try {
      await onAuthInitiate(pluginName)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    }
  }

  if (isLoading) return <div>Loading plugins...</div>
  if (isError) return <div>Error: Failed to load plugins</div>
  if (error) return <div>Error: {error}</div>

  if (plugins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <svg
            className="w-10 h-10 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">No Plugins Available</h3>
        <p className="text-muted-foreground mb-4">
          There are currently no plugins available. Check back later for new plugins.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plugins.map((plugin: Plugin) => (
        <Card key={plugin.id || plugin.name} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{plugin.name}</h2>
              <p className="text-gray-600">{plugin.description}</p>
            </div>
            {plugin.icon && (
              <img 
                src={plugin.icon} 
                alt={`${plugin.name} icon`} 
                className="w-10 h-10"
              />
            )}
          </div>
          <Button
            onClick={() => handleInitiateAuth(plugin.name)}
            variant={plugin.isAuthenticated ? "secondary" : "default"}
            className="w-full"
          >
            {plugin.isAuthenticated ? 'Configured' : 'Configure'}
          </Button>
        </Card>
      ))}
    </div>
  )
}