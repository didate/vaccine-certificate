package com.ict4h.service;

import com.ict4h.domain.Generation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Generation}.
 */
public interface GenerationService {

    /**
     * Save a generation.
     *
     * @param generation the entity to save.
     * @return the persisted entity.
     */
    Generation save(Generation generation);

    /**
     * Get all the generations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Generation> findAll(Pageable pageable);


    /**
     * Get the "id" generation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Generation> findOne(Long id);

    /**
     * Delete the "id" generation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
