package com.unlocked.unlocked.service;

import com.unlocked.unlocked.models.Chapter;
import com.unlocked.unlocked.models.Course;
import com.unlocked.unlocked.models.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnlockService {
    @Autowired
    private CourseService courseService;

    public boolean unlockNextModule(String courseId, String chapterId, String moduleId) {
        Course course = courseService.getCourseById(courseId);
        for (Chapter chapter : course.getChapters()) {
            if (chapter.getChapterId().equals(chapterId)) {
                List<Module> modules = chapter.getModules();
                for (int i = 0; i < modules.size(); i++) {
                    if (modules.get(i).getModuleId().equals(moduleId) && i + 1 < modules.size()) {
                        modules.get(i + 1).setUnlocked(true);
                        courseService.saveCourse(course);
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
