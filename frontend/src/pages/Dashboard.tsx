import { useEffect, useState, useCallback } from "react";
import api from "../api/axiosClient";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Task } from "../types/Task";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Load tasks
  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Task[]>("/tasks");
      setTasks(data ?? []);
    } catch (error) {
      console.error("Failed to load tasks:", error);
      alert("Error loading tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const deleteTask = async (id?: number) => {
    if (!id) return;

    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Error deleting task");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Tasks
        </h2>
        <Link
          to="/add-task"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Task
        </Link>
      </div>

      <div className="grid gap-4">
        {loading && <div>Loading...</div>}

        {!loading && tasks.length === 0 && (
          <div className="text-gray-500">No tasks yet</div>
        )}

        {!loading &&
          tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50">
                  {t.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-300">
                  {t.description}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                    t.status === "complete"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <div className="space-y-2 text-right">
                <Link
                  to={`/edit-task/${t.id}`}
                  className="block bg-gray-800 text-white px-3 py-2 rounded-md"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteTask(t.id)}
                  className="block text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}
