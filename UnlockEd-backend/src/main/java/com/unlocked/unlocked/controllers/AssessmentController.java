package com.unlocked.unlocked.controllers;

import com.unlocked.unlocked.models.Course;
import com.unlocked.unlocked.models.Chapter;
import com.unlocked.unlocked.repositories.CourseRepository;
import com.unlocked.unlocked.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

//
//@RestController
//@RequestMapping("/api/assessment")
//public class AssessmentController {
//
//    private final CourseRepository courseRepository;
//
//    public AssessmentController(CourseRepository courseRepository) {
//        this.courseRepository = courseRepository;
//    }
//
//    @PostMapping("/evaluate")
//    public ResponseEntity<String> evaluateAssessment(@RequestParam String courseId, @RequestParam String chapterId, @RequestParam int score) {
//        Optional<Course> courseOpt = courseRepository.findById(courseId);
//
//        if (courseOpt.isPresent()) {
//            Course course = courseOpt.get();
//
//            course.getChapters().forEach(chapter -> {
//                if (chapter.getChapterId().equals(chapterId) && score >= 70) {
//                    chapter.setUnlocked(true);
//                }
//            });
//
//            courseRepository.save(course);
//            return ResponseEntity.ok("Assessment evaluated. Next chapter unlocked if score >= 70%!");
//        }
//
//        return ResponseEntity.badRequest().body("Course not found.");
//    }
//}


@RestController
@RequestMapping("/api/assessment")
public class AssessmentController {
    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateAssessment(@RequestBody Map<String, Object> payload) {
        boolean success = assessmentService.unlockNextChapter(
                (String) payload.get("courseId"),
                (String) payload.get("chapterId"),
                (int) payload.get("score")
        );
        return success ? ResponseEntity.ok("Next chapter unlocked!") : ResponseEntity.badRequest().body("Assessment failed.");
    }
}
