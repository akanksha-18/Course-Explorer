import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronRight, CheckCircle, Circle, BookOpen } from 'lucide-react';

const MainContent = ({
  selectedCourse,
  selectedTopic,
  selectedSubtopic,
  onSelectCourse,
  onSelectTopic,
  toggleSubtopicCompletion,
  isSubtopicCompleted,
  getTopicProgress
}) => {
  if (!selectedCourse) {
    return (
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Course Explorer</h2>
          <p className="text-gray-600">Select a course from the sidebar to get started</p>
        </div>
      </main>
    );
  }

  if (!selectedSubtopic) {
    return (
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <button
                onClick={() => onSelectCourse(null)}
                className="hover:text-blue-600 transition-colors"
              >
                Courses
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{selectedCourse.title}</span>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h1>
            <p className="text-gray-600">{selectedCourse.description}</p>
          </div>

          <div className="space-y-6">
            {selectedCourse.topics.map(topic => {
              const progress = getTopicProgress(selectedCourse.id, topic);
              
              return (
                <div key={topic.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h2>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {progress.completed}/{progress.total} completed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {topic.subtopics.map(subtopic => {
                      const isCompleted = isSubtopicCompleted(selectedCourse.id, topic.id, subtopic.id);
                      
                      return (
                        <button
                          key={subtopic.id}
                          onClick={() => onSelectTopic(topic)}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <span className={`${isCompleted ? 'text-gray-600' : 'text-gray-900'}`}>
                            {subtopic.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  const isCompleted = isSubtopicCompleted(selectedCourse.id, selectedTopic.id, selectedSubtopic.id);

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => {
              onSelectCourse(selectedCourse);
              onSelectTopic(null);
            }}
            className="hover:text-blue-600 transition-colors"
          >
            {selectedCourse.title}
          </button>
          <ChevronRight className="w-4 h-4" />
          <button
            onClick={() => onSelectTopic(selectedTopic)}
            className="hover:text-blue-600 transition-colors"
          >
            {selectedTopic.title}
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{selectedSubtopic.title}</span>
        </nav>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{selectedSubtopic.title}</h1>
            <button
              onClick={() => toggleSubtopicCompletion(selectedCourse.id, selectedTopic.id, selectedSubtopic.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-5 h-5" />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>
          </div>

          <article className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900" {...props} />,
                p: ({node, ...props}) => <p className="my-4 leading-relaxed text-gray-700" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside my-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline ? (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600" {...props} />
                  ) : (
                    <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm" {...props} />
                  ),
                pre: ({node, ...props}) => <pre className="my-4" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700" {...props} />
                ),
                a: ({node, ...props}) => (
                  <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                ),
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-300" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
                th: ({node, ...props}) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold" {...props} />,
                td: ({node, ...props}) => <td className="border border-gray-300 px-4 py-2" {...props} />,
              }}
            >
              {selectedSubtopic.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </main>
  );
};

export default MainContent;