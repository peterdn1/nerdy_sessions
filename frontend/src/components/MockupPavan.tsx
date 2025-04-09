import React, { useState } from 'react';

interface UploadItem {
  id: number;
  imageUrl: string;
  description: string;
}

const MockupPavan: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploads(prev => [
        { id: Date.now(), imageUrl: reader.result as string, description },
        ...prev,
      ]);
      setFile(null);
      setDescription('');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pavan's Mockup</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      <div
        className="grid gap-3"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        {uploads.map(item => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-700 bg-[#333] shadow-md flex flex-col p-3"
          >
            <img
              src={item.imageUrl}
              alt="Uploaded"
              className="w-full object-cover rounded-lg"
            />
            <div className="mt-2 text-white text-sm font-medium">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockupPavan;