export interface Timelog {
  id: string;
  userId: string;
  projectId: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelogCreateInput {
  projectId: string;
  description: string;
  startTime: Date;
  endTime?: Date;
}

export interface TimelogUpdateInput {
  description?: string;
  startTime?: Date;
  endTime?: Date;
}