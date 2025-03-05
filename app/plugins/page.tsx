"use client";

import { useState } from "react";
import { PluginList } from "@/features/plugins/components";

export default function PluginsPage() {
  const [error, setError] = useState<string | null>(null);

  const handleAuthInitiate = async (pluginName: string) => {
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Plugin Marketplace</h1>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      <PluginList onAuthInitiate={handleAuthInitiate} />
    </div>
  );
}