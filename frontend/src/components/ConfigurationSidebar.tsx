import React from 'react';

function ConfigurationSidebar() {
  return (
    <div>
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg flex items-center">
          <i className="fas fa-cog mr-2"></i>
          Configuration
        </h3>
        <p className="text-sm text-gray-500">Customize your dashboard</p>
      </div>
      
      <div className="p-4 border-b">
        <h4 className="font-semibold mb-2">News Sources</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-red-500 rounded mr-2" checked />
              <span>CNN</span>
            </label>
            <i className="fas fa-grip-lines cursor-move text-gray-400"></i>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-red-500 rounded mr-2" checked />
              <span>BBC</span>
            </label>
            <i className="fas fa-grip-lines cursor-move text-gray-400"></i>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-red-500 rounded mr-2" checked />
              <span>TechCrunch</span>
            </label>
            <i className="fas fa-grip-lines cursor-move text-gray-400"></i>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-red-500 rounded mr-2" />
              <span>Wall Street Journal</span>
            </label>
            <i className="fas fa-grip-lines cursor-move text-gray-400"></i>
          </div>
        </div>
        <button className="mt-3 text-red-500 text-sm font-medium flex items-center">
          <i className="fas fa-plus-circle mr-1"></i> Add News Source
        </button>
      </div>
      
      <div className="p-4 border-b">
        <h4 className="font-semibold mb-2">Topics</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
            Technology
            <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
          </div>
          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
            Business
            <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
          </div>
          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
            Science
            <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder="Add topic..." className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      
      <div className="p-4 border-b">
        <h4 className="font-semibold mb-2">Layout</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Widget Size</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Default</option>
              <option>Compact</option>
              <option>Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Columns (Desktop)</label>
            <div className="flex items-center space-x-3">
              <button className="px-3 py-1 border border-gray-300 rounded">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded bg-blue-500 text-white">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded">3</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox rounded text-blue-500 mr-2" checked />
              <span className="text-sm">Show section titles</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold mb-2">Configuration Help</h4>
        <p className="text-sm text-gray-600 mb-3">Need help customizing your dashboard?</p>
        <button className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors">
          View Tutorial
        </button>
      </div>
    </div>
  );
}

export default ConfigurationSidebar;