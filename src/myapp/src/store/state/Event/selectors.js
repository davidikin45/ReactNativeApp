// call within mapStateToProps()
import { createSelector } from 'reselect'

const eventsSelector = state => state.event.events;

export const mappedEventsSelector = createSelector(
    eventsSelector,
  (events) => {
    return events && events.map(e => ({
        ...e,
        date: new Date(e.date),
      }));
  }
)