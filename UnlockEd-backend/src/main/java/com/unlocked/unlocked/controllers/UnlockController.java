

package com.unlocked.unlocked.controllers;

import com.unlocked.unlocked.service.AssessmentService;
import com.unlocked.unlocked.service.UnlockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/unlock")
public class UnlockController {
    @Autowired
    private UnlockService unlockService;

    @PostMapping("/module")
    public ResponseEntity<?> unlockNextModule(@RequestBody Map<String, String> payload) {
        boolean success = unlockService.unlockNextModule(
                payload.get("courseId"),
                payload.get("chapterId"),
                payload.get("moduleId")
        );
        return success ? ResponseEntity.ok("Next module unlocked!") : ResponseEntity.badRequest().body("Module unlock failed.");
    }

    @Autowired
    private AssessmentService assessmentService;

    // Endpoint to unlock the next chapter after completing the assessment
    @PostMapping("/chapter")
    public ResponseEntity<?> unlockNextChapter(@RequestBody Map<String, Object> payload) {
        String courseId = (String) payload.get("courseId");
        String chapterId = (String) payload.get("chapterId");
        int score = (int) payload.get("score");

        // Call service to unlock the next chapter
        boolean success = assessmentService.unlockNextChapter(courseId, chapterId, score);

        // Return appropriate response based on the success of the operation
        if (success) {
            return ResponseEntity.ok("Next chapter unlocked!");
        } else {
            return ResponseEntity.status(400).body("Failed to unlock next chapter. Ensure the score is above 70%.");
        }
    }
}

