import { APIErr, APIStatus } from "scheduler-shared/utils/APIutils";

export interface IEventsQueryParams {
    venue: string;
    location: string;
    sortBy: string;
  }
  
export const eventUtils = {
    getEventsQuery({ venue, location, sortBy }: IEventsQueryParams): { query: any, sortOptions: any } {
        const sortOptionsMap = {
            popularity: { participants: -1 },
            date: { 'eventSchedule.date': 1, 'eventSchedule.time': 1 },
            creationTime: { createdAt: 1 },
        };

        const validateSortOption = (sortBy: string, allowedSortOptions: string[]) => {
            if (sortBy && !allowedSortOptions.includes(sortBy)) {
                throw new APIErr(APIStatus.BAD_REQUEST, `Invalid sort option. Allowed options are: ${allowedSortOptions.join(', ')}`);
            }
        }

        const buildQuery = (venue: string, location: string) => {
            const query: any = {};
            if (venue) query.venue = venue;
            if (location) query.location = location;
            return query;
        }

        const allowedSortOptions = Object.keys(sortOptionsMap);
        validateSortOption(sortBy, allowedSortOptions);
        const query = buildQuery(venue, location);
        const sortOptions = sortBy ? sortOptionsMap[sortBy] : {}

        return { query, sortOptions };
    }
}