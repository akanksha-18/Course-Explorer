// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import MainContent from './components/MainContent';
// import AdminPanel from './components/AdminPanel';
// import Header from './components/Header';
// import usersJson from './data/users.json';

// import CoursesJson from './data/courses.json'



// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [initialCoursesData, setInitialCoursesData] = useState(CoursesJson);
//   const [initialUsersData, setInitialUsersData] = useState(usersJson.users);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const coursesModule = await import('./data/courses.json');
//         const usersModule = await import('./data/users.json');
        
//         if (coursesModule.default && Array.isArray(coursesModule.default)) {
//           setInitialCoursesData(coursesModule.default);
//         }
//         if (usersModule.default && Array.isArray(usersModule.default)) {
//           setInitialUsersData(usersModule.default);
//         }
//       } catch (error) {
//         console.warn('Using default data. Could not load JSON files:', error);
//       }
//     };
    
//     loadData();
//   }, []);
  
  
//   const [courses, setCourses] = useState(() => {
//     try {
//       const saved = localStorage.getItem('courses');
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (Array.isArray(parsed) && parsed.length > 0) {
//           return parsed;
//         }
//       }
//     } catch (error) {
//       console.error('Error loading courses from localStorage:', error);
//     }
//     return initialCoursesData;
//   });

//   const [users, setUsers] = useState(initialUsersData);
  

//   useEffect(() => {
//     const saved = localStorage.getItem('courses');
//     if (!saved || saved === '[]') {
//       setCourses(initialCoursesData);
//     }
//   }, [initialCoursesData]);

//   useEffect(() => {
//     setUsers(initialUsersData);
//   }, [initialUsersData]);
  
 
//   const [completedSubtopics, setCompletedSubtopics] = useState(() => {
//     try {
//       const saved = localStorage.getItem('completedSubtopics');
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         return typeof parsed === 'object' && parsed !== null ? parsed : {};
//       }
//     } catch (error) {
//       console.error('Error loading completion state from localStorage:', error);
//     }
//     return {};
//   });

//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  
//   useEffect(() => {
//     try {
//       if (Array.isArray(courses) && courses.length > 0) {
//         localStorage.setItem('courses', JSON.stringify(courses));
//       }
//     } catch (error) {
//       console.error('Error saving courses to localStorage:', error);
//     }
//   }, [courses]);

//   useEffect(() => {
//     try {
//       localStorage.setItem('completedSubtopics', JSON.stringify(completedSubtopics));
//     } catch (error) {
//       console.error('Error saving completion state to localStorage:', error);
//     }
//   }, [completedSubtopics]);

//   // Parse URL parameters
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const courseId = params.get('course');
//     const topicId = params.get('topic');
//     const subtopicId = params.get('subtopic');

//     if (courseId && Array.isArray(courses)) {
//       const course = courses.find(c => c.id === courseId);
//       if (course) {
//         setSelectedCourse(course);
        
//         if (topicId && Array.isArray(course.topics)) {
//           const topic = course.topics.find(t => t.id === topicId);
//           if (topic) {
//             setSelectedTopic(topic);
            
//             if (subtopicId && Array.isArray(topic.subtopics)) {
//               const subtopic = topic.subtopics.find(s => s.id === subtopicId);
//               if (subtopic) {
//                 setSelectedSubtopic(subtopic);
//               }
//             }
//           }
//         }
//       }
//     }
//   }, [location.search, courses]);

//   const handleSelectCourse = (course) => {
//     setSelectedCourse(course);
//     setSelectedTopic(null);
//     setSelectedSubtopic(null);
//     navigate(`/?course=${course.id}`);
//   };

//   const handleSelectTopic = (topic) => {
//     setSelectedTopic(topic);
//     setSelectedSubtopic(null);
//     if (selectedCourse) {
//       navigate(`/?course=${selectedCourse.id}&topic=${topic.id}`);
//     }
//   };

//   const handleSelectSubtopic = (subtopic) => {
//     setSelectedSubtopic(subtopic);
//     if (selectedCourse && selectedTopic) {
//       navigate(`/?course=${selectedCourse.id}&topic=${selectedTopic.id}&subtopic=${subtopic.id}`);
//     }
//   };

//   const toggleSubtopicCompletion = (courseId, topicId, subtopicId) => {
//     const key = `${courseId}-${topicId}-${subtopicId}`;
//     setCompletedSubtopics(prev => ({
//       ...prev,
//       [key]: !prev[key]
//     }));
//   };

//   const isSubtopicCompleted = (courseId, topicId, subtopicId) => {
//     const key = `${courseId}-${topicId}-${subtopicId}`;
//     return completedSubtopics[key] || false;
//   };

//   const getTopicProgress = (courseId, topic) => {
//     if (!topic || !Array.isArray(topic.subtopics)) {
//       return { completed: 0, total: 0, percentage: 0 };
//     }
    
//     const completed = topic.subtopics.filter(sub => 
//       isSubtopicCompleted(courseId, topic.id, sub.id)
//     ).length;
    
//     return {
//       completed,
//       total: topic.subtopics.length,
//       percentage: topic.subtopics.length > 0 
//         ? Math.round((completed / topic.subtopics.length) * 100) 
//         : 0
//     };
//   };

//   const getCourseProgress = (course) => {
//     if (!course || !Array.isArray(course.topics)) {
//       return { completed: 0, total: 0, percentage: 0 };
//     }
    
//     let totalSubtopics = 0;
//     let completedSubtopicsCount = 0;

//     course.topics.forEach(topic => {
//       if (Array.isArray(topic.subtopics)) {
//         totalSubtopics += topic.subtopics.length;
//         completedSubtopicsCount += topic.subtopics.filter(sub =>
//           isSubtopicCompleted(course.id, topic.id, sub.id)
//         ).length;
//       }
//     });

//     return {
//       completed: completedSubtopicsCount,
//       total: totalSubtopics,
//       percentage: totalSubtopics > 0 
//         ? Math.round((completedSubtopicsCount / totalSubtopics) * 100) 
//         : 0
//     };
//   };

//   const addCourse = (newCourse) => {
//     setCourses(prev => {
//       const currentCourses = Array.isArray(prev) ? prev : [];
//       return [...currentCourses, { ...newCourse, id: Date.now().toString() }];
//     });
//   };

//   const deleteCourse = (courseId) => {
//     setCourses(prev => {
//       const currentCourses = Array.isArray(prev) ? prev : [];
//       return currentCourses.filter(c => c.id !== courseId);
//     });
    
//     if (selectedCourse?.id === courseId) {
//       setSelectedCourse(null);
//       setSelectedTopic(null);
//       setSelectedSubtopic(null);
//       navigate('/');
//     }
//   };

//   const resetData = () => {
//     setCourses(initialCoursesData);
//     setCompletedSubtopics({});
//     setSelectedCourse(null);
//     setSelectedTopic(null);
//     setSelectedSubtopic(null);
//     localStorage.removeItem('courses');
//     localStorage.removeItem('completedSubtopics');
//     navigate('/');
//   };

//   const exportData = () => {
//     const data = {
//       courses,
//       completedSubtopics
//     };
//     const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'courses-export.json';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const importData = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const data = JSON.parse(e.target.result);
//           if (data.courses && Array.isArray(data.courses)) {
//             setCourses(data.courses);
//           }
//           if (data.completedSubtopics && typeof data.completedSubtopics === 'object') {
//             setCompletedSubtopics(data.completedSubtopics);
//           }
//         } catch (error) {
//           alert('Invalid JSON file');
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       <Header 
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         exportData={exportData}
//         importData={importData}
//         resetData={resetData}
//       />
      
//       <div className="flex flex-1 overflow-hidden">
//         <Routes>
//           <Route path="/admin" element={<AdminPanel users={users} />} />
//           <Route path="/" element={
//             <>
//               <Sidebar
//                 courses={courses}
//                 searchQuery={searchQuery}
//                 selectedCourse={selectedCourse}
//                 selectedTopic={selectedTopic}
//                 selectedSubtopic={selectedSubtopic}
//                 onSelectCourse={handleSelectCourse}
//                 onSelectTopic={handleSelectTopic}
//                 onSelectSubtopic={handleSelectSubtopic}
//                 getCourseProgress={getCourseProgress}
//                 getTopicProgress={getTopicProgress}
//                 isSubtopicCompleted={isSubtopicCompleted}
//                 addCourse={addCourse}
//                 deleteCourse={deleteCourse}
//               />
//               <MainContent
//                 selectedCourse={selectedCourse}
//                 selectedTopic={selectedTopic}
//                 selectedSubtopic={selectedSubtopic}
//                 onSelectCourse={handleSelectCourse}
//                 onSelectTopic={handleSelectTopic}
//                 toggleSubtopicCompletion={toggleSubtopicCompletion}
//                 isSubtopicCompleted={isSubtopicCompleted}
//                 getTopicProgress={getTopicProgress}
//               />
//             </>
//           } />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import MainContent from './components/MainContent';
// import AdminPanel from './components/AdminPanel';
// import Header from './components/Header';

// import usersJson from './data/users.json';
// import CoursesJson from './data/courses.json';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Initialize with imported data directly
//   const [courses, setCourses] = useState(() => {
//     try {
//       const saved = localStorage.getItem('courses');
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         // Only use saved data if it's a valid non-empty array
//         if (Array.isArray(parsed) && parsed.length > 0) {
//           return parsed;
//         }
//       }
//     } catch (error) {
//       console.error('Error loading courses from localStorage:', error);
//     }
//     // Use the imported courses data as fallback
//     return CoursesJson.courses || CoursesJson || [];
//   });

//   const [users, setUsers] = useState(usersJson.users || usersJson || []);

//   const [completedSubtopics, setCompletedSubtopics] = useState(() => {
//     try {
//       const saved = localStorage.getItem('completedSubtopics');
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         return typeof parsed === 'object' && parsed !== null ? parsed : {};
//       }
//     } catch (error) {
//       console.error('Error loading completion state from localStorage:', error);
//     }
//     return {};
//   });

//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [selectedSubtopic, setSelectedSubtopic] = useState(null);

//   // Save courses to localStorage whenever they change
//   useEffect(() => {
//     try {
//       if (Array.isArray(courses) && courses.length > 0) {
//         localStorage.setItem('courses', JSON.stringify(courses));
//       }
//     } catch (error) {
//       console.error('Error saving courses to localStorage:', error);
//     }
//   }, [courses]);

//   // Save completion state to localStorage
//   useEffect(() => {
//     try {
//       localStorage.setItem('completedSubtopics', JSON.stringify(completedSubtopics));
//     } catch (error) {
//       console.error('Error saving completion state to localStorage:', error);
//     }
//   }, [completedSubtopics]);

//   // Parse URL parameters
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const courseId = params.get('course');
//     const topicId = params.get('topic');
//     const subtopicId = params.get('subtopic');

//     if (courseId && Array.isArray(courses)) {
//       const course = courses.find(c => c.id === courseId);
//       if (course) {
//         setSelectedCourse(course);
//         if (topicId && Array.isArray(course.topics)) {
//           const topic = course.topics.find(t => t.id === topicId);
//           if (topic) {
//             setSelectedTopic(topic);
//             if (subtopicId && Array.isArray(topic.subtopics)) {
//               const subtopic = topic.subtopics.find(s => s.id === subtopicId);
//               if (subtopic) {
//                 setSelectedSubtopic(subtopic);
//               }
//             }
//           }
//         }
//       }
//     }
//   }, [location.search, courses]);

//   const handleSelectCourse = (course) => {
//     setSelectedCourse(course);
//     setSelectedTopic(null);
//     setSelectedSubtopic(null);
//     navigate(`/?course=${course.id}`);
//   };

//   const handleSelectTopic = (topic) => {
//     setSelectedTopic(topic);
//     setSelectedSubtopic(null);
//     if (selectedCourse) {
//       navigate(`/?course=${selectedCourse.id}&topic=${topic.id}`);
//     }
//   };

//   const handleSelectSubtopic = (subtopic) => {
//     setSelectedSubtopic(subtopic);
//     if (selectedCourse && selectedTopic) {
//       navigate(`/?course=${selectedCourse.id}&topic=${selectedTopic.id}&subtopic=${subtopic.id}`);
//     }
//   };

//   const toggleSubtopicCompletion = (courseId, topicId, subtopicId) => {
//     const key = `${courseId}-${topicId}-${subtopicId}`;
//     setCompletedSubtopics(prev => ({
//       ...prev,
//       [key]: !prev[key]
//     }));
//   };

//   const isSubtopicCompleted = (courseId, topicId, subtopicId) => {
//     const key = `${courseId}-${topicId}-${subtopicId}`;
//     return completedSubtopics[key] || false;
//   };

//   const getTopicProgress = (courseId, topic) => {
//     if (!topic || !Array.isArray(topic.subtopics)) {
//       return { completed: 0, total: 0, percentage: 0 };
//     }
//     const completed = topic.subtopics.filter(sub =>
//       isSubtopicCompleted(courseId, topic.id, sub.id)
//     ).length;
//     return {
//       completed,
//       total: topic.subtopics.length,
//       percentage: topic.subtopics.length > 0
//         ? Math.round((completed / topic.subtopics.length) * 100)
//         : 0
//     };
//   };

//   const getCourseProgress = (course) => {
//     if (!course || !Array.isArray(course.topics)) {
//       return { completed: 0, total: 0, percentage: 0 };
//     }
//     let totalSubtopics = 0;
//     let completedSubtopicsCount = 0;

//     course.topics.forEach(topic => {
//       if (Array.isArray(topic.subtopics)) {
//         totalSubtopics += topic.subtopics.length;
//         completedSubtopicsCount += topic.subtopics.filter(sub =>
//           isSubtopicCompleted(course.id, topic.id, sub.id)
//         ).length;
//       }
//     });

//     return {
//       completed: completedSubtopicsCount,
//       total: totalSubtopics,
//       percentage: totalSubtopics > 0
//         ? Math.round((completedSubtopicsCount / totalSubtopics) * 100)
//         : 0
//     };
//   };

//   const addCourse = (newCourse) => {
//     setCourses(prev => {
//       const currentCourses = Array.isArray(prev) ? prev : [];
//       return [...currentCourses, { ...newCourse, id: Date.now().toString() }];
//     });
//   };

//   const deleteCourse = (courseId) => {
//     setCourses(prev => {
//       const currentCourses = Array.isArray(prev) ? prev : [];
//       return currentCourses.filter(c => c.id !== courseId);
//     });
//     if (selectedCourse?.id === courseId) {
//       setSelectedCourse(null);
//       setSelectedTopic(null);
//       setSelectedSubtopic(null);
//       navigate('/');
//     }
//   };

//   const resetData = () => {
//     const defaultCourses = CoursesJson.courses || CoursesJson || [];
//     setCourses(defaultCourses);
//     setCompletedSubtopics({});
//     setSelectedCourse(null);
//     setSelectedTopic(null);
//     setSelectedSubtopic(null);
//     localStorage.removeItem('courses');
//     localStorage.removeItem('completedSubtopics');
//     navigate('/');
//   };

//   const exportData = () => {
//     const data = { courses, completedSubtopics };
//     const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'courses-export.json';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const importData = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const data = JSON.parse(e.target.result);
//           if (data.courses && Array.isArray(data.courses)) {
//             setCourses(data.courses);
//           }
//           if (data.completedSubtopics && typeof data.completedSubtopics === 'object') {
//             setCompletedSubtopics(data.completedSubtopics);
//           }
//         } catch (error) {
//           alert('Invalid JSON file');
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="flex flex-1 overflow-hidden">
//               <Sidebar
//                 courses={courses}
//                 selectedCourse={selectedCourse}
//                 selectedTopic={selectedTopic}
//                 selectedSubtopic={selectedSubtopic}
//                 onSelectCourse={handleSelectCourse}
//                 onSelectTopic={handleSelectTopic}
//                 onSelectSubtopic={handleSelectSubtopic}
//                 getCourseProgress={getCourseProgress}
//                 getTopicProgress={getTopicProgress}
//                 searchQuery={searchQuery}
//               />
//               <MainContent
//                 selectedCourse={selectedCourse}
//                 selectedTopic={selectedTopic}
//                 selectedSubtopic={selectedSubtopic}
//                 onSelectTopic={handleSelectTopic}
//                 onSelectSubtopic={handleSelectSubtopic}
//                 courses={courses}
//                 toggleSubtopicCompletion={toggleSubtopicCompletion}
//                 isSubtopicCompleted={isSubtopicCompleted}
//                 getCourseProgress={getCourseProgress}
//                 getTopicProgress={getTopicProgress}
//               />
//             </div>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <AdminPanel
//               courses={courses}
//               users={users}
//               addCourse={addCourse}
//               deleteCourse={deleteCourse}
//               resetData={resetData}
//               exportData={exportData}
//               importData={importData}
//             />
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';
// Use static imports instead of dynamic imports
import usersJson from './data/users.json';
import CoursesJson from './data/courses.json';

// Transform the imported courses data to add IDs
function transformCoursesData(rawData) {
  try {
    // Handle both formats: { courses: [...] } or [...]
    const coursesArray = rawData?.courses || rawData;
    
    if (!Array.isArray(coursesArray)) {
      console.error('Courses data is not an array:', coursesArray);
      return [];
    }

    return coursesArray.map((course, courseIndex) => ({
      ...course,
      id: course.id || `course-${courseIndex}`,
      topics: Array.isArray(course.topics) 
        ? course.topics.map((topic, topicIndex) => ({
            ...topic,
            id: topic.id || `topic-${topicIndex}`,
            subtopics: Array.isArray(topic.subtopics)
              ? topic.subtopics.map((subtopic, subtopicIndex) => ({
                  ...subtopic,
                  id: subtopic.id || `subtopic-${subtopicIndex}`
                }))
              : []
          }))
        : []
    }));
  } catch (error) {
    console.error('Error transforming courses data:', error);
    return [];
  }
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize with transformed data
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('courses');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only use saved data if it's a valid non-empty array
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading courses from localStorage:', error);
    }
    // Transform and use the imported courses data as fallback
    return transformCoursesData(CoursesJson);
  });

  const [users, setUsers] = useState(() => {
    const usersArray = usersJson?.users || usersJson;
    return Array.isArray(usersArray) ? usersArray : [];
  });

  const [completedSubtopics, setCompletedSubtopics] = useState(() => {
    try {
      const saved = localStorage.getItem('completedSubtopics');
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed === 'object' && parsed !== null ? parsed : {};
      }
    } catch (error) {
      console.error('Error loading completion state from localStorage:', error);
    }
    return {};
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    try {
      if (Array.isArray(courses) && courses.length > 0) {
        localStorage.setItem('courses', JSON.stringify(courses));
      }
    } catch (error) {
      console.error('Error saving courses to localStorage:', error);
    }
  }, [courses]);

  // Save completion state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('completedSubtopics', JSON.stringify(completedSubtopics));
    } catch (error) {
      console.error('Error saving completion state to localStorage:', error);
    }
  }, [completedSubtopics]);

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseId = params.get('course');
    const topicId = params.get('topic');
    const subtopicId = params.get('subtopic');

    if (courseId && Array.isArray(courses) && courses.length > 0) {
      const course = courses.find(c => c.id === courseId);
      if (course) {
        setSelectedCourse(course);
        if (topicId && Array.isArray(course.topics)) {
          const topic = course.topics.find(t => t.id === topicId);
          if (topic) {
            setSelectedTopic(topic);
            if (subtopicId && Array.isArray(topic.subtopics)) {
              const subtopic = topic.subtopics.find(s => s.id === subtopicId);
              if (subtopic) {
                setSelectedSubtopic(subtopic);
              }
            }
          }
        }
      }
    }
  }, [location.search, courses]);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    navigate(`/?course=${course.id}`);
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
    if (selectedCourse) {
      navigate(`/?course=${selectedCourse.id}&topic=${topic.id}`);
    }
  };

  const handleSelectSubtopic = (subtopic) => {
    setSelectedSubtopic(subtopic);
    if (selectedCourse && selectedTopic) {
      navigate(`/?course=${selectedCourse.id}&topic=${selectedTopic.id}&subtopic=${subtopic.id}`);
    }
  };

  const toggleSubtopicCompletion = (courseId, topicId, subtopicId) => {
    const key = `${courseId}-${topicId}-${subtopicId}`;
    setCompletedSubtopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isSubtopicCompleted = (courseId, topicId, subtopicId) => {
    const key = `${courseId}-${topicId}-${subtopicId}`;
    return completedSubtopics[key] || false;
  };

  const getTopicProgress = (courseId, topic) => {
    if (!topic || !Array.isArray(topic.subtopics)) {
      return { completed: 0, total: 0, percentage: 0 };
    }
    const completed = topic.subtopics.filter(sub =>
      isSubtopicCompleted(courseId, topic.id, sub.id)
    ).length;
    return {
      completed,
      total: topic.subtopics.length,
      percentage: topic.subtopics.length > 0
        ? Math.round((completed / topic.subtopics.length) * 100)
        : 0
    };
  };

  const getCourseProgress = (course) => {
    if (!course || !Array.isArray(course.topics)) {
      return { completed: 0, total: 0, percentage: 0 };
    }
    let totalSubtopics = 0;
    let completedSubtopicsCount = 0;

    course.topics.forEach(topic => {
      if (Array.isArray(topic.subtopics)) {
        totalSubtopics += topic.subtopics.length;
        completedSubtopicsCount += topic.subtopics.filter(sub =>
          isSubtopicCompleted(course.id, topic.id, sub.id)
        ).length;
      }
    });

    return {
      completed: completedSubtopicsCount,
      total: totalSubtopics,
      percentage: totalSubtopics > 0
        ? Math.round((completedSubtopicsCount / totalSubtopics) * 100)
        : 0
    };
  };

  const addCourse = (newCourse) => {
    setCourses(prev => {
      const currentCourses = Array.isArray(prev) ? prev : [];
      return [...currentCourses, { 
        ...newCourse, 
        id: newCourse.id || Date.now().toString(),
        topics: newCourse.topics || []
      }];
    });
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => {
      const currentCourses = Array.isArray(prev) ? prev : [];
      return currentCourses.filter(c => c.id !== courseId);
    });
    if (selectedCourse?.id === courseId) {
      setSelectedCourse(null);
      setSelectedTopic(null);
      setSelectedSubtopic(null);
      navigate('/');
    }
  };

  const resetData = () => {
    const defaultCourses = transformCoursesData(CoursesJson);
    setCourses(defaultCourses);
    setCompletedSubtopics({});
    setSelectedCourse(null);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    localStorage.removeItem('courses');
    localStorage.removeItem('completedSubtopics');
    navigate('/');
  };

  const exportData = () => {
    const data = { courses, completedSubtopics };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'courses-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.courses && Array.isArray(data.courses)) {
            setCourses(transformCoursesData(data));
          }
          if (data.completedSubtopics && typeof data.completedSubtopics === 'object') {
            setCompletedSubtopics(data.completedSubtopics);
          }
        } catch (error) {
          alert('Invalid JSON file');
          console.error('Import error:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  // Debug: Log courses on mount
  useEffect(() => {
    console.log('Courses loaded:', courses);
  }, [courses]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-1 overflow-hidden">
              <Sidebar
                courses={courses}
                selectedCourse={selectedCourse}
                selectedTopic={selectedTopic}
                selectedSubtopic={selectedSubtopic}
                onSelectCourse={handleSelectCourse}
                onSelectTopic={handleSelectTopic}
                onSelectSubtopic={handleSelectSubtopic}
                getCourseProgress={getCourseProgress}
                getTopicProgress={getTopicProgress}
                searchQuery={searchQuery}
              />
              <MainContent
                selectedCourse={selectedCourse}
                selectedTopic={selectedTopic}
                selectedSubtopic={selectedSubtopic}
                onSelectTopic={handleSelectTopic}
                onSelectSubtopic={handleSelectSubtopic}
                courses={courses}
                toggleSubtopicCompletion={toggleSubtopicCompletion}
                isSubtopicCompleted={isSubtopicCompleted}
                getCourseProgress={getCourseProgress}
                getTopicProgress={getTopicProgress}
              />
            </div>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPanel
              courses={courses}
              users={users}
              addCourse={addCourse}
              deleteCourse={deleteCourse}
              resetData={resetData}
              exportData={exportData}
              importData={importData}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;