export interface Plugin {
    id: string
    name: string
    description: string
    version: string
    author: string
    enabled: boolean
    isAuthenticated?: boolean
    icon?: string
    createdAt: Date
    updatedAt: Date
}

export interface CreatePluginDTO {
    name: string
    description: string
    version: string
    author: string
}

export interface UpdatePluginDTO extends Partial<CreatePluginDTO> {
    enabled?: boolean
}