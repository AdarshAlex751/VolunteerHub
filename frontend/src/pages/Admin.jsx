import { useState } from "react";
import api from "../services/api";

export default function Admin() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDesc, setEventDesc] = useState("");

  const [annTitle, setAnnTitle] = useState("");
  const [annBody, setAnnBody] = useState("");

  const createEvent = async (e) => {
    e.preventDefault();
    await api.post("/events", { title: eventTitle, date: eventDate, description: eventDesc });
    setEventTitle(""); setEventDate(""); setEventDesc("");
    alert("Event created!");
  };

  const createAnnouncement = async (e) => {
    e.preventDefault();
    await api.post("/announcements", { title: annTitle, body: annBody });
    setAnnTitle(""); setAnnBody("");
    alert("Announcement posted!");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="text-2xl font-bold">Admin</h2>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <form onSubmit={createEvent} className="border rounded p-4 bg-white space-y-3">
          <h3 className="font-semibold">Create Event</h3>
          <input className="w-full border rounded p-2" placeholder="Title" value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)} />
          <input className="w-full border rounded p-2" type="datetime-local" value={eventDate}
            onChange={(e) => setEventDate(e.target.value)} />
          <textarea className="w-full border rounded p-2" placeholder="Description" value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)} />
          <button className="w-full bg-black text-white rounded p-2">Create</button>
        </form>

        <form onSubmit={createAnnouncement} className="border rounded p-4 bg-white space-y-3">
          <h3 className="font-semibold">Post Announcement</h3>
          <input className="w-full border rounded p-2" placeholder="Title" value={annTitle}
            onChange={(e) => setAnnTitle(e.target.value)} />
          <textarea className="w-full border rounded p-2" placeholder="Body" rows={6} value={annBody}
            onChange={(e) => setAnnBody(e.target.value)} />
          <button className="w-full bg-black text-white rounded p-2">Post</button>
        </form>
      </div>
    </div>
  );
}
