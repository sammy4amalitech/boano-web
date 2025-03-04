"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Plugin {
  name: string;
  description: string;
  icon?: string;
  isAuthenticated?: boolean;
}

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlugins();
  }, []);

  const fetchPlugins = async () => {
    try {
      const response = await fetch('/api/v1/plugins/');
      if (!response.ok) throw new Error('Failed to fetch plugins');
      const data = await response.json();
      setPlugins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load plugins');
    } finally {
      setLoading(false);
    }
  };

  const initiateAuth = async (pluginName: string) => {
    try {
      const response = await fetch(`/api/v1/plugins/${pluginName}/auth`);
      if (!response.ok) throw new Error('Failed to initiate authentication');
      const data = await response.json();
      
      // Redirect to the plugin's auth page
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  if (loading) return <div>Loading plugins...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Plugin Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plugins.map((plugin) => (
          <Card key={plugin.name} className="p-6">
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
              onClick={() => initiateAuth(plugin.name)}
              variant={plugin.isAuthenticated ? "secondary" : "default"}
              className="w-full"
            >
              {plugin.isAuthenticated ? 'Configured' : 'Configure'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}