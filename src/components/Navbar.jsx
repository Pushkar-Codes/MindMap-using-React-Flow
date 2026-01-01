export default function Navbar({ expandAll, collapseAll, fitView, onExport }) {
  return (
    <nav className="h-20 border-b bg-white flex items-center px-10 justify-between shadow-sm z-10">
      <h1 className="text-xl font-bold text-indigo-600">My MindMap UI</h1>
      <div className="space-x-4">
        <button
          onClick={expandAll}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Collapse All
        </button>
        <button
          onClick={fitView}
          className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50 transition"
        >
          Fit View
        </button>

        <button
          onClick={onExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Download JSON
        </button>
      </div>
    </nav>
  );
}
