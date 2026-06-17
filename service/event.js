import { api } from "./api";

export const getAllEvents = async () => {
  return api("/event/");
};

export const getEventById = async (id) => {
  return api(`/event/${id}`);
};

// User

export const joinEvent = async (id) => {
  return api(`/event/${id}/join`, {
    method: "POST",
  });
};

export const deleteEventAttendee = async (id) => {
  return api(`/event/${id}/attendee`, {
    method: "DELETE",
  });
};

export const getEventAttendees = async (id) => {
  return api(`/event/${id}/attendees`);
};

// Admin

export const createEvent = async (eventData) => {
  return api("/event/", {
    method: "POST",
    body: eventData,
  });
};

export const updateEvent = async (id, eventData) => {
  return api(`/event/${id}`, {
    method: "PATCH",
    body: JSON.stringify(eventData),
  });
};

export const deleteEvent = async (id) => {
  return api(`/event/${id}`, {
    method: "DELETE",
  });
};
export const getMyEvent = async (id) => {
  return api(`/event/u/${id}`, {
    method: "GET",
  });
};
