export interface Job {
    id: string,
    applicationName: string,
    scheduledStartTime: string,
    scheduledEndTime: string,
    actualStartTime: string,
    actualEndTime: string,
    status: string,
    color: string
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