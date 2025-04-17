import React, { useState, useRef, useEffect } from 'react';

// Define type for API response item
interface ApiUploadItem {
  id: string;
  url: string;
  description?: string;
}

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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch uploads from server
  const fetchUploads = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/mockup-images');
      const data: ApiUploadItem[] = await res.json(); // Use the defined type
      const formatted = data.map((item: ApiUploadItem) => ({
        id: item.id,
        imageUrl: `http://localhost:5001${item.url}`,
        description: item.description || '',
      }));
      setUploads(formatted);
    } catch (err) {
      console.error('Failed to fetch uploads', err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

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
      
      fetchUploads(); // Refresh the gallery
      
      // Reset form
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
        // Remove locally if server delete failed
        setUploads(prev => prev.filter(item => item.id !== id));
        return;
      }
      
      fetchUploads(); // Refresh the gallery
    } catch (err) {
      console.error('Failed to delete upload', err);
      // Remove locally if server delete failed
      setUploads(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item: UploadItem) => {
    setEditingId(item.id);
    setDescription(item.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDescription('');
    setFile(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">
          Mockup Gallery
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search mockups..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* Upload/Edit Form */}
      <div className="mb-10 p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-1 text-gray-800">
          {editingId ? 'Update Mockup' : 'Upload New Mockup'}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          {editingId
            ? 'Make changes to your existing mockup'
            : 'Share your design ideas with the team'}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Drag and drop area */}
          <div
            className="border-2 border-dashed rounded-md mb-6 text-center cursor-pointer relative flex flex-col justify-center items-center"
            style={{
              height: '250px', // Adjusted height
              borderColor: isDragging ? '#3b82f6' : '#d1d5db', // Adjusted border color
              backgroundColor: isDragging ? '#eff6ff' : '#f9fafb' // Adjusted background
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".png, .jpg, .jpeg, .gif" // Specify accepted types
              onChange={handleFileSelect}
              className="hidden"
            />
            {/* Content inside drop zone */}
            <div className="flex flex-col items-center justify-center h-full text-center"> {/* Added flex centering */}
               {/* Replaced SVG with a cloud upload icon */}
               <svg className="w-12 h-12 mb-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
               </svg>
              <p className="mb-1 text-sm font-semibold text-gray-700">Drag and drop your image here</p> {/* Adjusted margin and font weight */}
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> {/* Adjusted text color */}
            </div>
            {/* Display selected file name */}
            {file && !editingId && (
              <p className="text-sm text-blue-600 mt-2 absolute bottom-4">Selected: {file.name}</p>
            )}
             {/* Display existing image preview when editing */}
             {editingId && !file && uploads.find(u => u.id === editingId)?.imageUrl && (
               <img
                 src={uploads.find(u => u.id === editingId)?.imageUrl}
                 alt="Current mockup"
                 className="absolute inset-0 w-full h-full object-contain p-2 opacity-50"
               />
             )}
             {/* Display new file preview when editing */}
             {editingId && file && (
               <p className="text-sm text-blue-600 mt-2 absolute bottom-4">New: {file.name}</p>
             )}
          </div>

          {/* Description field */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea
              id="description"
              rows={3} // Use textarea with rows
              placeholder="Describe your mockup..." // Updated placeholder
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              required
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3">
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 border border-gray-300"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={(!editingId && !file) || (!!editingId && !description)} // Ensure boolean result
            >
              {editingId ? 'Update Mockup' : 'Upload Mockup'} {/* Standardized text */}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery grid with fixed size image containers */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px'
        }}
      >
        {uploads.map(item => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md"
          >
            {/* Fixed height image container */}
            <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
              <img
                src={item.imageUrl}
                alt={item.description}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>

            {/* Separator */}
            <hr className="border-gray-200" />
            
            {/* Description and buttons */}
            <div className="p-4">
              <p className="text-base font-medium text-gray-800 mb-4" style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.3em',
                height: '2.6em'
              }}>
                {item.description}
              </p>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {uploads.length === 0 && (
        <div className="text-center py-12 border border-gray-200 rounded-md">
          <p className="text-gray-500">No mockups yet. Upload your first one!</p>
        </div>
      )}
    </div>
  );
};

export default MockupGallery;


