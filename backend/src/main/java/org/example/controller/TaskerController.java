package org.example.controller;

import org.example.dto.TaskerDto;
import org.example.model.CategoryTasker;
import org.example.model.TripHistory;
import org.example.repository.CategoryTaskerRepository;
import org.example.repository.TripHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/taskers")
@CrossOrigin("*")
public class TaskerController {

    @Autowired
    private CategoryTaskerRepository categoryTaskerRepository;

    @Autowired
    private TripHistoryRepository tripHistoryRepository;

    // 🔝 Get top 5 taskers from category_taskers by rating
    @GetMapping("/top")
    public List<TaskerDto> getTopTaskers() {
        List<CategoryTasker> topCategoryTaskers = categoryTaskerRepository.findTopRatedCategoryTaskersEagerly();

        return topCategoryTaskers.stream()
                .filter(ct -> Boolean.TRUE.equals(ct.getActive()))
                .limit(5)
                .map(ct -> new TaskerDto(
                        ct.getId(),
                        ct.getName(),
                        ct.getProfilePicUrl(),
                        ct.getRating(),
                        Optional.ofNullable(ct.getCategory())
                                .map(c -> c.getName())
                                .orElse("Unknown"),
                        ct.getBio(),
                        ct.getAssetType(),
                        ct.getAssetModel(),
                        ct.getAssetColor(),
                        ct.getAssetIdentifier(),
                        ct.getAssetSummary()
                ))
                .collect(Collectors.toList());
    }

    // 👤 Get full tasker profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<TaskerDto> getTaskerById(@PathVariable Long id) {
        Optional<CategoryTasker> ctOpt = categoryTaskerRepository.findById(id);

        return ctOpt
                .filter(ct -> Boolean.TRUE.equals(ct.getActive()))
                .map(ct -> ResponseEntity.ok(new TaskerDto(
                        ct.getId(),
                        ct.getName(),
                        ct.getProfilePicUrl(),
                        ct.getRating(),
                        Optional.ofNullable(ct.getCategory())
                                .map(c -> c.getName())
                                .orElse("Unknown"),
                        ct.getBio(),
                        ct.getAssetType(),
                        ct.getAssetModel(),
                        ct.getAssetColor(),
                        ct.getAssetIdentifier(),
                        ct.getAssetSummary()
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    // 📜 Get trip history for a specific tasker (e.g. Driver)
    @GetMapping("/{id}/trips")
    public List<String> getTripHistory(@PathVariable Long id) {
        return tripHistoryRepository.findByDriverId(id)
                .stream()
                .map(TripHistory::getTripDescription)
                .collect(Collectors.toList());
    }
}
