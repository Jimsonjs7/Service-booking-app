package org.example.repository;

import org.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskerRepository extends JpaRepository<User, Long> {

    // 🔝 Get top-rated active taskers (optional: add limit in controller)
    @Query("SELECT u FROM User u WHERE u.role = 'TASKER' AND u.active = true ORDER BY u.rating DESC")
    List<User> findTopRatedTaskers();

    // 🔍 Search taskers by name or category name
    @Query("SELECT u FROM User u WHERE u.role = 'TASKER' AND " +
            "(LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(u.category.name) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<User> searchTaskers(@Param("query") String query);

    // 🎯 Fetch taskers from a specific category, active ones first
    @Query("SELECT u FROM User u WHERE u.role = 'TASKER' AND u.category.name = :categoryName ORDER BY u.active DESC")
    List<User> findTaskersByCategoryOrderByActive(@Param("categoryName") String categoryName);
}
