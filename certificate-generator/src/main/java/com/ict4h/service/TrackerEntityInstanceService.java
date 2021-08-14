package com.ict4h.service;

import com.ict4h.domain.TrackerEntityInstance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

/**
 * Service Interface for managing {@link TrackerEntityInstance}.
 */
public interface TrackerEntityInstanceService {

    /**
     * Save a trackerEntityInstance.
     *
     * @param trackerEntityInstance the entity to save.
     * @return the persisted entity.
     */
    TrackerEntityInstance save(TrackerEntityInstance trackerEntityInstance);

    /**
     * Get all the trackerEntityInstances.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TrackerEntityInstance> findAll(Pageable pageable);


    /**
     * Get the "id" trackerEntityInstance.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TrackerEntityInstance> findOne(Long id);

    /**
     * Delete the "id" trackerEntityInstance.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Page<TrackerEntityInstance> findAll(Specification<TrackerEntityInstance> specification, Pageable pageable);
}
