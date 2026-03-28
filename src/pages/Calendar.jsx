import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Badge, Modal, Button, Form } from "react-bootstrap";

const localizer = momentLocalizer(moment);

const Calendar = ({ orders = [] }) => {
  // Load events from localStorage
  const storedEvents = JSON.parse(localStorage.getItem("customEvents") || "[]");
  const [events, setEvents] = useState(storedEvents);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    type: "event",
  });

  // Merge orders + custom events
  const calendarEvents = [
    ...orders.map((order) => ({
      id: `order-${order.id}`,
      title: `Order #${order.id} - ${order.customer}`,
      start: new Date(order.date),
      end: new Date(order.date),
      type: "order",
      status: order.status,
    })),
    ...events,
  ];

  // Save custom events to localStorage
  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem("customEvents", JSON.stringify(updatedEvents));
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setShowModal(true);
  };

  const handleAddEvent = () => {
    const eventToAdd = { ...newEvent, id: `evt-${Date.now()}` };
    saveEvents([...events, eventToAdd]);
    setShowModal(false);
    setNewEvent({ title: "", start: new Date(), end: new Date(), type: "event" });
  };

  const handleDeleteEvent = (eventId) => {
    const updated = events.filter((evt) => evt.id !== eventId);
    saveEvents(updated);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "#17a2b8"; // default blue
    if (event.type === "order") {
      backgroundColor = event.status === "Pending" ? "#ffc107" : "#28a745";
    } else if (event.type === "event") {
      backgroundColor = "#6f42c1"; // custom/purple events
    }
    return {
      style: {
        backgroundColor,
        color: "#fff",
        borderRadius: "5px",
        border: "none",
        padding: "2px",
        fontSize: "0.85rem",
      },
    };
  };

  return (
    <div className="calendar-container" style={{ padding: "10px" }}>
      <BigCalendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => event.type === "event" && handleDeleteEvent(event.id)}
        popup
        style={{
          minHeight: "400px",
          height: "70vh",
          maxHeight: "800px",
          backgroundColor: "#222222",
          borderRadius: "10px",
        }}
      />
      <div className="mt-2 d-flex flex-wrap">
        <Badge bg="warning" className="me-2 mb-2">
          Pending Order
        </Badge>
        <Badge bg="success" className="me-2 mb-2">
          Completed Order
        </Badge>
        <Badge bg="purple" className="me-2 mb-2">
          Custom Event
        </Badge>
      </div>

      {/* Modal for adding new event */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: new Date(e.target.value) })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: new Date(e.target.value) })
                }
              />
            </Form.Group>
          </Form>
          <p className="text-muted mt-2">
            Click on an existing purple event to delete it.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;
