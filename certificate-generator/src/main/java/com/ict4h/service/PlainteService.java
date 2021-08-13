package com.ict4h.service;

import com.ict4h.domain.Plainte;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Plainte}.
 */
public interface PlainteService {

    /**
     * Save a plainte.
     *
     * @param plainte the entity to save.
     * @return the persisted entity.
     */
    Plainte save(Plainte plainte);

    /**
     * Get all the plaintes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Plainte> findAll(Pageable pageable);


    /**
     * Get the "id" plainte.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Plainte> findOne(Long id);

    /**
     * Delete the "id" plainte.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
