package com.ict4h.repository;

import com.ict4h.domain.Generation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Generation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GenerationRepository extends JpaRepository<Generation, Long> {
}
