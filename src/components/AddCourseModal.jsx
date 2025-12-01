import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const AddCourseModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topics, setTopics] = useState([
    {
      id: 'topic-1',
      title: '',
      subtopics: [{ id: 'subtopic-1', title: '', content: '' }]
    }
  ]);

  const addTopic = () => {
    setTopics([
      ...topics,
      {
        id: `topic-${Date.now()}`,
        title: '',
        subtopics: [{ id: `subtopic-${Date.now()}`, title: '', content: '' }]
      }
    ]);
  };

  const removeTopic = (topicId) => {
    setTopics(topics.filter(t => t.id !== topicId));
  };

  const updateTopic = (topicId, field, value) => {
    setTopics(topics.map(t => 
      t.id === topicId ? { ...t, [field]: value } : t
    ));
  };

  const addSubtopic = (topicId) => {
    setTopics(topics.map(t => 
      t.id === topicId 
        ? { 
            ...t, 
            subtopics: [...t.subtopics, { id: `subtopic-${Date.now()}`, title: '', content: '' }]
          }
        : t
    ));
  };

  const removeSubtopic = (topicId, subtopicId) => {
    setTopics(topics.map(t => 
      t.id === topicId 
        ? { ...t, subtopics: t.subtopics.filter(s => s.id !== subtopicId) }
        : t
    ));
  };

  const updateSubtopic = (topicId, subtopicId, field, value) => {
    setTopics(topics.map(t => 
      t.id === topicId 
        ? {
            ...t,
            subtopics: t.subtopics.map(s => 
              s.id === subtopicId ? { ...s, [field]: value } : s
            )
          }
        : t
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a course title');
      return;
    }

    const validTopics = topics.filter(t => t.title.trim());
    if (validTopics.length === 0) {
      alert('Please add at least one topic');
      return;
    }

    const course = {
      id: `course-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      topics: validTopics.map(t => ({
        id: t.id,
        title: t.title.trim(),
        subtopics: t.subtopics
          .filter(s => s.title.trim())
          .map(s => ({
            id: s.id,
            title: s.title.trim(),
            content: s.content.trim() || '# ' + s.title.trim() + '\n\nContent coming soon...'
          }))
      }))
    };

    onAdd(course);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Course</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Web Development Basics"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
              placeholder="Brief description of the course"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Topics *
              </label>
              <button
                type="button"
                onClick={addTopic}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Topic</span>
              </button>
            </div>

            <div className="space-y-4">
              {topics.map((topic, topicIndex) => (
                <div key={topic.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <input
                      type="text"
                      value={topic.title}
                      onChange={(e) => updateTopic(topic.id, 'title', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Topic ${topicIndex + 1} title`}
                    />
                    {topics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTopic(topic.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="ml-6 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Subtopics</span>
                      <button
                        type="button"
                        onClick={() => addSubtopic(topic.id)}
                        className="flex items-center space-x-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Subtopic</span>
                      </button>
                    </div>

                    {topic.subtopics.map((subtopic, subtopicIndex) => (
                      <div key={subtopic.id} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={subtopic.title}
                          onChange={(e) => updateSubtopic(topic.id, subtopic.id, 'title', e.target.value)}
                          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Subtopic ${subtopicIndex + 1} title`}
                        />
                        {topic.subtopics.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSubtopic(topic.id, subtopic.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;