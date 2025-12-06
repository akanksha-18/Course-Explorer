export const normalizeCourses = (courses) => {
  return courses.map((course, courseIndex) => ({
    id: course.id || courseIndex + 1,
    title: course.title || course.courseName || "Untitled Course",
    description: course.description || "",
    topics: course.topics?.map((topic, topicIndex) => ({
      id: topic.id || topicIndex + 1,
      title: topic.title || topic.topicName || "Untitled Topic",
      subtopics: topic.subtopics?.map((sub, subIndex) => ({
        id: sub.id || subIndex + 1,
        title: sub.title || "Untitled Subtopic",
        content: sub.content || ""
      })) || []
    })) || []
  }));
};
