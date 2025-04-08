import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  due: string;
  completed: boolean;
}

function ToolsDashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Prepare project proposal', due: 'today', completed: false },
    { id: 2, text: 'Review design mockups', due: 'tomorrow', completed: false },
    { id: 3, text: 'Schedule team meeting', due: 'completed', completed: true },
    { id: 4, text: 'Send client invoice', due: 'in 3 days', completed: false }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="w-8 h-8 ring-accent tools-accent bg-yellow-500 rounded-full mr-3 flex items-center justify-center text-white">
          <i className="fas fa-tools text-sm"></i>
        </span>
        Tools Dashboard
      </h2>

      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task List Widget */}
        <div className="widget md:col-span-2">
          <div className="widget-header tools-header">
            <div className="widget-icon tools-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <h3 className="font-bold">Task List</h3>
          </div>
          <div className="widget-content">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between mb-2">
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mr-2"
                  />
                  <span className={task.completed ? 'line-through text-gray-400' : ''}>
                    {task.text}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{task.due}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder for other tools */}
        <div className="widget">
          <div className="widget-header tools-header">
            <div className="widget-icon tools-icon">
              <i className="fas fa-cogs"></i>
            </div>
            <h3 className="font-bold">Tool Settings</h3>
          </div>
          <div className="widget-content">
            <p className="text-gray-600">Configure your tools and integrations here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolsDashboard;