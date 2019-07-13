export interface Job {
    id: string,
    applicationName: string,
    scheduledStartTime: Date,
    scheduleEndTime: Date,
    actualStartTime: Date,
    actualEndTime: Date
}

export interface Error {
    statusCode: string,
    statusMessage: string
}