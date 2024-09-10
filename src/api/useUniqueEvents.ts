import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/baseURL";
import axios from "axios";
import { IEvent } from "../interfaces/IEvent";

const useUniqueEvents = (wellId: any) => {
  const [uniqueEvents, setUniqueEvents] = useState<string[]>([]);
  const [eventCache, setEventCache] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    if (eventCache[wellId]) {
      setUniqueEvents(eventCache[wellId]);
    } else {
      axios
        .get(
          `${BASE_URL}/Universal/DmEventT/wellId/${wellId}/?fields=wellId,eventId,eventCode`
        )
        .then((response) => {
          const events = response.data;
          const uniqueEventCodes = events
            ?.map((event: IEvent) => event?.eventCode)
            ?.filter((x: any, i: any, a: any) => a.indexOf(x) === i)
            ?.filter((event: string) => event);
          // Cache the data
          setEventCache((prevCache) => ({
            ...prevCache,
            [wellId]: uniqueEventCodes,
          }));
          setUniqueEvents(uniqueEventCodes);
        })
        .catch(() => {});
    }
  }, [wellId, eventCache]);

  return { uniqueEvents };
};

export default useUniqueEvents;
