import { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  // Load notes from localStorage when app starts
  const [task, setTask] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      return JSON.parse(savedNotes);
    }

    return [];
  });

  // Save notes whenever task changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);

  const submitHandler = (e) => {
    e.preventDefault();

    const copyTask = [...task];

    copyTask.push({ title, details });
    setTask(copyTask);

    setTitle("");
    setDetails("");
  };

  const deleteNote = (idx) => {
    const copyTask = [...task];

    copyTask.splice(idx, 1);

    setTask(copyTask);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white lg:flex">
      {/* Left Section */}
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex flex-col gap-5 lg:w-[45%] p-10 lg:pr-14"
      >
        <h1 className="text-4xl font-extrabold">Add Notes</h1>

        {/* Title */}
        <input
          type="text"
          placeholder="Enter note title..."
          className="w-full rounded-lg border border-zinc-600 bg-zinc-900 px-5 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* Details */}
        <textarea
          placeholder="Write your thoughts here..."
          className="h-32 w-full resize-none rounded-lg border border-zinc-600 bg-zinc-900 px-5 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        />

        {/* Button */}
        <button className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95">
          Add Note
        </button>
      </form>

      {/* Right Section */}
      <div className="border-zinc-700 lg:w-[55%] lg:border-l p-10 lg:pl-14">
        <h1 className="text-4xl font-extrabold">Recent Notes</h1>

        <div className="mt-8 flex h-[80vh] flex-wrap items-start gap-6 overflow-auto pr-2">
          {task.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center text-center text-zinc-400">
              <span className="text-6xl">📝</span>
              <h2 className="mt-4 text-2xl font-bold">No Notes Yet</h2>
              <p className="mt-2 text-sm">
                Create your first note using the form.
              </p>
            </div>
          ) : (
            task.map(function (elem, idx) {
              return (
                <div
                  key={idx}
                  className="relative flex h-56 w-44 flex-col justify-between rounded-2xl bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHOI0reQLJbYio3nDn-3Do7tojc55WBcflQZPNwCsBcg&s=10')] bg-cover bg-center px-5 pb-4 pt-9 text-black shadow-xl transition duration-200 hover:-translate-y-2 hover:scale-105"
                >
                  <div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight">
                      {elem.title}
                    </h3>

                    <p className="mt-5 line-clamp-5 text-xs font-medium leading-relaxed text-gray-700">
                      {elem.details}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      deleteNote(idx);
                    }}
                    className="w-full rounded-md bg-red-500 py-2 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
