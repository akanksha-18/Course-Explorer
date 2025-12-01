import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';
import AddCourseModal from './AddCourseModal';

const Sidebar = ({
  courses,
  searchQuery,
  selectedCourse,
  selectedTopic,
  selectedSubtopic,
  onSelectCourse,
  onSelectTopic,
  onSelectSubtopic,
  getCourseProgress,
  getTopicProgress,
  isSubtopicCompleted,
  addCourse,
  deleteCourse
}) => {
  const [expandedTopics, setExpandedTopics] = useState({});
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const filteredCourses = useMemo(() => {
    // Ensure courses is an array
    if (!Array.isArray(courses)) return [];
    if (!searchQuery) return courses;
    
    const query = searchQuery.toLowerCase();
    return courses.filter(course => {
      if (course.title?.toLowerCase().includes(query)) return true;
      if (course.description?.toLowerCase().includes(query)) return true;
      
      return course.topics?.some(topic => {
        if (topic.title?.toLowerCase().includes(query)) return true;
        return topic.subtopics?.some(subtopic =>
          subtopic.title?.toLowerCase().includes(query)
        );
      });
    });
  }, [courses, searchQuery]);

  return (
    <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Courses</h2>
          <button
            onClick={() => setShowAddCourseModal(true)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Add Course"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No courses found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredCourses.map(course => {
              const progress = getCourseProgress(course);
              const isSelected = selectedCourse?.id === course.id;

              return (
                <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => onSelectCourse(course)}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.description}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{progress.percentage}%</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Delete "${course.title}"?`)) {
                          deleteCourse(course.id);
                        }
                      }}
                      className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {isSelected && course.topics && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      {course.topics.map(topic => {
                        const topicProgress = getTopicProgress(course.id, topic);
                        const isTopicExpanded = expandedTopics[topic.id];
                        const isTopicSelected = selectedTopic?.id === topic.id;

                        return (
                          <div key={topic.id} className="border-b border-gray-200 last:border-b-0">
                            <div
                              className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                                isTopicSelected ? 'bg-blue-100' : 'hover:bg-gray-100'
                              }`}
                              onClick={() => {
                                onSelectTopic(topic);
                                toggleTopic(topic.id);
                              }}
                            >
                              <div className="flex items-center space-x-2 flex-1">
                                {isTopicExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                                <span className="text-sm font-medium text-gray-900">
                                  {topic.title}
                                </span>
                              </div>
                              <span className="text-xs text-gray-600">
                                {topicProgress.completed}/{topicProgress.total}
                              </span>
                            </div>

                            {isTopicExpanded && topic.subtopics && (
                              <div className="bg-white">
                                {topic.subtopics.map(subtopic => {
                                  const isCompleted = isSubtopicCompleted(course.id, topic.id, subtopic.id);
                                  const isSubtopicSelected = selectedSubtopic?.id === subtopic.id;

                                  return (
                                    <div
                                      key={subtopic.id}
                                      className={`flex items-center space-x-2 p-3 pl-10 cursor-pointer transition-colors ${
                                        isSubtopicSelected
                                          ? 'bg-blue-50 border-l-2 border-blue-600'
                                          : 'hover:bg-gray-50'
                                      }`}
                                      onClick={() => onSelectSubtopic(subtopic)}
                                    >
                                      {isCompleted ? (
                                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                      ) : (
                                        <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                      )}
                                      <span className={`text-sm ${isCompleted ? 'text-gray-600' : 'text-gray-900'}`}>
                                        {subtopic.title}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showAddCourseModal && (
        <AddCourseModal
          onClose={() => setShowAddCourseModal(false)}
          onAdd={addCourse}
        />
      )}
    </aside>
  );
};

export default Sidebar;