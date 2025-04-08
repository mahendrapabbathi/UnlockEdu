package com.unlocked.unlocked.config;

import com.unlocked.unlocked.repositories.CourseRepository;
import com.unlocked.unlocked.models.Course;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        InputStream inputStream = new ClassPathResource("import.json").getInputStream();

        List<Course> courses = objectMapper.readValue(inputStream, new TypeReference<List<Course>>() {});
        courseRepository.saveAll(courses);
        System.out.println("Courses imported successfully!");
    }
}
