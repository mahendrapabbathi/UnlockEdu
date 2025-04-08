package com.unlocked.unlocked.service;

import com.unlocked.unlocked.models.Chapter;
import com.unlocked.unlocked.models.Course;
import com.unlocked.unlocked.models.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssessmentService {
    @Autowired
    private CourseService courseService;

    public boolean unlockNextChapter(String courseId, String chapterId, int score) {
        if (score >= 70) {
            Course course = courseService.getCourseById(courseId);
            List<Chapter> chapters = course.getChapters();

            for (int i = 0; i < chapters.size(); i++) {
                // Check if the current chapter is completed
                if (chapters.get(i).getChapterId().equals(chapterId) && i + 1 < chapters.size()) {
                    // Unlock the next chapter
                    Chapter nextChapter = chapters.get(i + 1);
                    nextChapter.setUnlocked(true);

                    // Unlock the first module of the next chapter
                    if (!nextChapter.getModules().isEmpty()) {
                        Module firstModule = nextChapter.getModules().get(0);
                        firstModule.setUnlocked(true);
                    }

                    // Save the updated course
                    courseService.saveCourse(course);
                    return true;
                }
            }
        }
        return false;
    }
}
