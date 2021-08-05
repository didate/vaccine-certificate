package com.ict4h.repository;

import com.ict4h.domain.Signature;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Signature entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SignatureRepository extends JpaRepository<Signature, Long> {
}
