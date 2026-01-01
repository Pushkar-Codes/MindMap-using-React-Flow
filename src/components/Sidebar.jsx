import { useState, useEffect } from "react";

export default function Sidebar({ node, addNode, updateNode }) {
  const [editFields, setEditFields] = useState({
    title: "",
    summary: "",
    description: "",
  });
  const [newFields, setNewFields] = useState({
    title: "",
    summary: "",
    description: "",
  });

  useEffect(() => {
    if (node) {
      setEditFields({
        title: node.data.label || "",
        summary: node.data.summary || "",
        description: node.data.description || "",
      });
    }
  }, [node]);

  const handleEditChange = (e) => {
    const updated = { ...editFields, [e.target.name]: e.target.value };
    setEditFields(updated);
    updateNode(node.id, updated);
  };

  const handleAddAction = () => {
    if (!newFields.title) return alert("Please enter a title for the new node");
    addNode(newFields);
    setNewFields({ title: "", summary: "", description: "" });
  };

  return (
    <div className="w-80 border-l bg-white p-6 shadow-xl h-full overflow-y-auto">
      <section className="mb-8">
        <h2 className="text-lg font-bold text-indigo-700 border-b pb-2 mb-4">
          Node Details
        </h2>
        <div className="space-y-3">
          <input
            name="title"
            placeholder="Title"
            className="w-full border p-2 rounded text-sm"
            value={editFields.title}
            onChange={handleEditChange}
          />
          <input
            name="summary"
            placeholder="Hover Summary"
            className="w-full border p-2 rounded text-sm"
            value={editFields.summary}
            onChange={handleEditChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            className="w-full border p-2 rounded text-sm"
            value={editFields.description}
            onChange={handleEditChange}
          />
        </div>
      </section>

      <section className="pt-6 border-t border-dashed">
        <h2 className="text-lg font-bold text-green-700 mb-4">
          Add Child to "{editFields.title}"
        </h2>
        <div className="space-y-3">
          <input
            className="w-full border p-2 rounded text-sm"
            placeholder="New Node Title"
            value={newFields.title}
            onChange={(e) =>
              setNewFields({ ...newFields, title: e.target.value })
            }
          />
          <input
            className="w-full border p-2 rounded text-sm"
            placeholder="New Node Summary"
            value={newFields.summary}
            onChange={(e) =>
              setNewFields({ ...newFields, summary: e.target.value })
            }
          />
          <textarea
            className="w-full border p-2 rounded text-sm"
            placeholder="New Node Description"
            rows="2"
            value={newFields.description}
            onChange={(e) =>
              setNewFields({ ...newFields, description: e.target.value })
            }
          />
          <button
            className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition"
            onClick={handleAddAction}
          >
            Create Sub-Node
          </button>
        </div>
      </section>
    </div>
  );
}
