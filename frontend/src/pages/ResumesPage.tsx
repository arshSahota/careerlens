import { useState } from "react";
import Navbar from "../components/Navbar";
import { useApplications } from "../context/ApplicationContext";
import type { Resume } from "../types/Resume";

function ResumesPage() {
  const { resumes, addResume } = useApplications();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newResume: Resume = {
      id: Date.now(),
      name,
      content,
      createdAt: new Date().toISOString(),
    };

    addResume(newResume);
    setName("");
    setContent("");
  }

  return (
    <div>
      <Navbar />
      <h2>Resumes</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Resume name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Paste resume content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />
        <br /><br />

        <button type="submit">Add Resume</button>
      </form>

      <hr />

      {resumes.map((resume) => (
        <div key={resume.id}>
          <strong>{resume.name}</strong>
          <p>{resume.content.slice(0, 120)}...</p>
        </div>
      ))}
    </div>
  );
}

export default ResumesPage;
