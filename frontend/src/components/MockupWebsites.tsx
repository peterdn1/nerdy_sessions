import React, { useState } from 'react';
import { PLACEHOLDERS } from '../constants';

interface WebsiteItem {
  id: string;
  url: string;
  description: string;
}

const MockupWebsites: React.FC = () => {
  const [websites, setWebsites] = useState<WebsiteItem[]>([]);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchWebsites = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/mockup-websites');
      const data = await res.json();
      setWebsites(data);
    } catch (err) {
      console.error('Failed to fetch websites', err);
    }
  };

  React.useEffect(() => {
    fetchWebsites();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let res;
      if (editingId) {
        res = await fetch(`http://localhost:5001/api/mockup-websites/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, description }),
        });
      } else {
        res = await fetch('http://localhost:5001/api/mockup-websites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, description }),
        });
      }

      const saved = await res.json();
      setWebsites(prev => {
        const updated = prev.filter(item => item.id !== editingId);
        return [saved, ...updated];
      });
      setUrl('');
      setDescription('');
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save website', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5001/api/mockup-websites/${id}`, {
        method: 'DELETE',
      });
      setWebsites(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete website', err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-white mb-8 border-b border-gray-700 pb-4">
        Website Mockups
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-10 flex flex-col md:flex-row md:items-center gap-4 bg-gray-800 p-6 rounded-xl shadow-inner"
      >
        <label className="flex-1 flex flex-col gap-2 text-white font-medium">
          Website URL
          <input
            type="url"
            placeholder={PLACEHOLDERS.url}
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="border border-gray-600 bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>
        <label className="flex-1 flex flex-col gap-2 text-white font-medium">
          Description
          <input
            type="text"
            placeholder={PLACEHOLDERS.description}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border border-gray-600 bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {websites.map(item => (
              <tr key={item.id} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {item.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setUrl(item.url);
                      setDescription(item.description);
                    }}
                    className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MockupWebsites;