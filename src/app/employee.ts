import { Payoff } from "./payoff"
import { WorkingDays } from "./workingDays"

export interface Employee {
    id?: number,
    fullName?: string,
    birthDate?: number,
    jobTitle?: string,
    pricePerHour?: number,
    image?: string,
    checkTime?: {
        in: number,
        out: number,
        calck: number,
        check: false,
        in1: number,
        out1: number,
        calck1: number,
        allTime: number
    },
    workingDays?: WorkingDays,
    payoff?: Payoff,
}