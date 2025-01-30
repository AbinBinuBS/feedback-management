import React, { useState } from 'react';
import { getStatusColor, getTagStyles } from '../helperFunctions/feedbackBoxHelper';
import { getModuleIcon, getTagIcon } from '../helperFunctions/icons';
import EditFeedbackModal from './editFeedbackModal';

const FeedbackCard = ({ 
  _id,
  title = '', 
  description = '', 
  user = '', 
  status = 'new',
  tags = [],
  module = '', 
  votes = 40,
  platform = '',
  attachments = [],
  onEdit,
  onDelete 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
    setShowDropdown(false);
  };

  const handleEditComplete = (updatedData) => {
    if (onEdit) {
      onEdit(updatedData); 
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      setShowDropdown(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="bg-[#1C2437] p-4 rounded-lg w-full mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-white text-xl font-medium mb-2">{title}</h2>
            <div className="relative">
              <p className={`text-gray-300 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
                {description}
              </p>
              {description.length > 150 && (
                <button
                  className="text-blue-400 hover:text-blue-300 text-sm mt-1"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2 border border-green-500 text-green-500 px-3 py-1 rounded-lg">
                <div className="w-5 h-5 rounded-full overflow-hidden">
                  <img
                    src="/api/placeholder/20/20"
                    alt={user}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm">{user}</span>
              </div>
              <div className={`border border-${getStatusColor(status)}-500 text-${getStatusColor(status)}-500 px-3 py-1 rounded-lg text-sm`}>
                {status || 'New'}
              </div>
              {module && (
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm ${getTagStyles(module)}`}>
                  {getModuleIcon(module)}
                  {module}
                </div>
              )}
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm ${getTagStyles(tag)}`}
                >
                  {getTagIcon(tag)}
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-2 ml-4">
            <div className="relative">
              <div className="border border-yellow-500 rounded-lg p-2 w-20">
                <div className="flex flex-col items-center">
                  <span className="text-yellow-500 text-lg">^</span>
                  <div className="text-white text-xl font-medium">{votes}</div>
                  <div className="text-gray-400 text-xs">Votes</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <button 
                className="text-gray-400 hover:text-white p-2"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                ⋮
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-[#2A3548] rounded-lg shadow-lg overflow-hidden z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-gray-200 hover:bg-[#1C2437] flex items-center gap-2"
                    onClick={handleEdit}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="rgb(234, 179, 8)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-gray-200 hover:bg-[#1C2437] flex items-center gap-2"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setShowDropdown(false);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="rgb(239, 68, 68)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-[#1C2437] rounded-lg p-6 w-96">
            <h2 className="text-white text-xl font-medium text-center mb-2">
              Delete Feedback?
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Are you sure you want to delete this feedback?
            </p>
            <div className="flex gap-4">
              <button
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#FF5A65] hover:bg-[#FF4655] text-white py-2 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <EditFeedbackModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditComplete={handleEditComplete}
        feedbackData={{
          _id,
          title,
          description,
          platform,
          module,
          tags,
          attachments
        }}
      />
    </>
  );
};

export default FeedbackCard;