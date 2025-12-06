import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, BookOpen, Users, Download, Upload, RotateCcw, Home, Menu } from 'lucide-react';

const Header = ({ 
  searchQuery, 
  setSearchQuery, 
  exportData, 
  importData, 
  resetData,
  onMenuClick,
  isSidebarOpen 
}) => {
  const location = useLocation();
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between gap-4">
       
        <div className="flex items-center gap-2 lg:gap-4 min-w-0">
         
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            title={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
            <h1 className="text-lg lg:text-2xl font-bold text-gray-900 hidden sm:block">
              Course Explorer
            </h1>
          </Link>
          
          {/* Navigation - hidden on small screens */}
          <nav className="hidden md:flex items-center gap-2 ml-4 lg:ml-8">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="font-medium text-sm lg:text-base">Courses</span>
            </Link>
            
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/admin'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="font-medium text-sm lg:text-base">Admin</span>
            </Link>
          </nav>
        </div>

      
        <div className="flex items-center gap-2 lg:gap-4 flex-1 justify-end min-w-0">
       
          {location.pathname === '/' && (
            <div className="relative flex-1 max-w-xs lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 lg:w-5 h-4 lg:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 lg:pl-10 pr-3 lg:pr-4 py-2 w-full text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
            <button
              onClick={exportData}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Export Data"
            >
              <Download className="w-4 lg:w-5 h-4 lg:h-5" />
            </button>
            
            <button
              onClick={handleImportClick}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Import Data"
            >
              <Upload className="w-4 lg:w-5 h-4 lg:h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
            
            <button
              onClick={() => {
                if (window.confirm('Reset all data? This cannot be undone.')) {
                  resetData();
                }
              }}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset to Default"
            >
              <RotateCcw className="w-4 lg:w-5 h-4 lg:h-5" />
            </button>
          </div>
        </div>
      </div>

   
      <nav className="md:hidden flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
        <Link
          to="/"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors flex-1 justify-center ${
            location.pathname === '/'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="font-medium text-sm">Courses</span>
        </Link>
        
        <Link
          to="/admin"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors flex-1 justify-center ${
            location.pathname === '/admin'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span className="font-medium text-sm">Admin</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;