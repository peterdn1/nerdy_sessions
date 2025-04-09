import React, { useState } from 'react';

interface UploadItem {
  id: string;
  imageUrl: string;
  description: string;
}

const MockupGallery: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchUploads = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/mockup-images');
      const data = await res.json();
      const formatted = data.map((item: any) => ({
        id: item.id,
        imageUrl: `http://localhost:5001${item.url}`,
        description: item.description || '',
      }));
      setUploads(formatted);
    } catch (err) {
      console.error('Failed to fetch uploads', err);
    }
  };

  React.useEffect(() => {
    fetchUploads();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    formData.append('description', description);

    try {
      let res;
      if (editingId) {
        res = await fetch(`http://localhost:5001/api/mockup-images/${editingId}`, {
          method: 'PUT',
          body: formData,
        });
        if (!res.ok) throw new Error('Update failed');
      } else {
        if (!file) return; // require file for new upload
        res = await fetch('http://localhost:5001/api/mockup-images', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Upload failed');
      }
      const saved = await res.json();
      setUploads(prev => {
        const updated = prev.filter(item => item.id !== editingId);
        return [saved, ...updated];
      });
      fetchUploads();
      setFile(null);
      setDescription('');
      setEditingId(null);
    } catch (err) {
      console.error('Failed to upload/update', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5001/api/mockup-images/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        alert('Delete failed on server. Removing locally.');
      } else {
        fetchUploads();
        return;
      }
    } catch (err) {
      console.error('Failed to delete upload', err);
      alert('Delete failed on server. Removing locally.');
    }
    // Remove locally if server delete failed
    setUploads(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-white mb-8 border-b border-gray-700 pb-4">
        Mockup Gallery
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-10 flex flex-col md:flex-row md:items-center gap-4 bg-gray-800 p-6 rounded-xl shadow-inner"
      >
        <label className="flex-1 flex flex-col gap-2 text-white font-medium">
          Select Image
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
        </label>
        <label className="flex-1 flex flex-col gap-2 text-white font-medium">
          Description
          <input
            type="text"
            placeholder="Enter a description"
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
          {editingId ? 'Update' : 'Upload'}
        </button>
      </form>

      <div
        className="grid gap-x-8 gap-y-10"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        }}
      >
        {uploads.map(item => (
          <div
            key={item.id}
            className="relative rounded-3xl border border-gray-700 bg-gray-800 shadow-lg flex flex-col p-4 transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
          >
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full transition-all duration-150"
              title="Delete"
            >
              ✕
            </button>
            <img
              src={item.imageUrl}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded-2xl border border-gray-600"
            />
            <div className="mt-3 text-white text-base font-semibold text-center break-words">
              {item.description}
            </div>
              <button
                onClick={() => {
                  setEditingId(item.id);
                  setDescription(item.description);
                  setFile(null);
                }}
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded-full transition-all duration-150"
                title="Edit"
              >
                Edit
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockupGallery;