package com.ict4h.repository;

import com.ict4h.domain.Plainte;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Plainte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlainteRepository extends JpaRepository<Plainte, Long> {
}
