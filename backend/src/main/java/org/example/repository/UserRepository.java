package org.example.repository;

import org.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

    List<User> findTop5ByRoleAndActiveOrderByRatingDesc(String role, boolean active);

    List<User> findByCategoryIdAndRoleAndActive(Long categoryId, String role, boolean active);

    @Query("SELECT u FROM User u WHERE u.role = :role AND u.active = true AND " +
            "(LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(u.category.name) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<User> searchTaskers(@Param("role") String role, @Param("query") String query);
}
