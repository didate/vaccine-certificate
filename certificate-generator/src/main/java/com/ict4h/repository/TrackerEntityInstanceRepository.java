package com.ict4h.repository;

import java.util.List;

import com.ict4h.domain.TrackerEntityInstance;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TrackerEntityInstance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrackerEntityInstanceRepository extends JpaRepository<TrackerEntityInstance, Long> , JpaSpecificationExecutor<TrackerEntityInstance> {

    
}
