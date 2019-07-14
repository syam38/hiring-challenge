export interface Job {
    id: string,
    applicationName: string,
    scheduledStartTime: Date,
    scheduledEndTime: Date,
    actualStartTime?: Date,
    actualEndTime?: Date,
    status?: string,
    color?: string
}

export interface Error {
    statusCode: string,
    statusMessage: string
}

export enum StatusColor {
    started = 'blue',
    notStarted = "grey",
    completed = "green",
    failed = "red"
}