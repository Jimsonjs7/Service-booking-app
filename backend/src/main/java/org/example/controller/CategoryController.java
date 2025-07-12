package org.example.controller;

import org.example.dto.CategoryDto;
import org.example.dto.TaskerDto;
import org.example.model.Category;
import org.example.model.CategoryTasker; // Crucial import
import org.example.repository.CategoryRepository;
import org.example.repository.CategoryTaskerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryTaskerRepository categoryTaskerRepository;

    @GetMapping
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<CategoryDto> searchCategories(@RequestParam String query) {
        return categoryRepository.findByNameContainingIgnoreCase(query).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/taskers")
    public List<TaskerDto> getTaskersByCategoryName(@RequestParam String category) {
        Optional<Category> optionalCategory = categoryRepository.findByNameIgnoreCase(category);

        if (optionalCategory.isEmpty()) {
            return List.of();
        }

        Category foundCategory = optionalCategory.get();
        List<CategoryTasker> categoryTaskers = categoryTaskerRepository.findByCategoryEagerly(foundCategory);

        return categoryTaskers.stream()
                .map(this::toTaskerDtoFromCategoryTasker)
                .collect(Collectors.toList());
    }

    private CategoryDto toDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getIconUrl(),
                category.getDescription(),
                category.getMinPrice(),
                category.getMaxPrice()
        );
    }

    private TaskerDto toTaskerDtoFromCategoryTasker(CategoryTasker categoryTasker) {
        return new TaskerDto(
                categoryTasker.getId(),
                categoryTasker.getName(),
                categoryTasker.getProfilePicUrl(),
                categoryTasker.getRating(),
                Optional.ofNullable(categoryTasker.getCategory())
                        .map(Category::getName)
                        .orElse(null),
                categoryTasker.getBio()
        );
    }
}