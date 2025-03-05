"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plugin } from "../types"
import { useUpdatePlugin, useDeletePlugin } from "../hooks/use-plugins"
import { Switch } from "@/components/ui/switch"

interface PluginCardProps {
    plugin: Plugin
}

export function PluginCard({ plugin }: PluginCardProps) {
    const updatePlugin = useUpdatePlugin()
    const deletePlugin = useDeletePlugin()

    const handleToggle = async (checked: boolean) => {
        try {
            await updatePlugin.mutateAsync({
                id: plugin.id,
                data: { enabled: checked }
            })
        } catch (error) {
            console.error('Failed to toggle plugin:', error)
        }
    }

    const handleDelete = async () => {
        try {
            await deletePlugin.mutateAsync(plugin.id)
        } catch (error) {
            console.error('Failed to delete plugin:', error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{plugin.name}</CardTitle>
                <CardDescription>{plugin.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="text-sm text-muted-foreground">
                        <span>Version: {plugin.version}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <span>Author: {plugin.author}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex items-center space-x-2">
                    <Switch
                        checked={plugin.enabled}
                        onCheckedChange={handleToggle}
                        aria-label="Toggle plugin"
                    />
                    <span className="text-sm text-muted-foreground">
                        {plugin.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                </div>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}