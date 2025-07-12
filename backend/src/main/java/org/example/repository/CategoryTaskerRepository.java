package org.example.repository;

import org.example.model.Category;
import org.example.model.CategoryTasker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryTaskerRepository extends JpaRepository<CategoryTasker, Long> {
    List<CategoryTasker> findByCategory(Category category);

    @Query("SELECT ct FROM CategoryTasker ct JOIN FETCH ct.category WHERE ct.category = :category")
    List<CategoryTasker> findByCategoryEagerly(@Param("category") Category category);

    @Query("SELECT ct FROM CategoryTasker ct JOIN FETCH ct.category ORDER BY ct.rating DESC")
    List<CategoryTasker> findTopRatedCategoryTaskersEagerly();
}