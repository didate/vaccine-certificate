package com.ict4h.service.impl;

import com.ict4h.service.GenerationService;
import com.ict4h.domain.Generation;
import com.ict4h.repository.GenerationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Generation}.
 */
@Service
@Transactional
public class GenerationServiceImpl implements GenerationService {

    private final Logger log = LoggerFactory.getLogger(GenerationServiceImpl.class);

    private final GenerationRepository generationRepository;

    public GenerationServiceImpl(GenerationRepository generationRepository) {
        this.generationRepository = generationRepository;
    }

    @Override
    public Generation save(Generation generation) {
        log.debug("Request to save Generation : {}", generation);
        return generationRepository.save(generation);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Generation> findAll(Pageable pageable) {
        log.debug("Request to get all Generations");
        return generationRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Generation> findOne(Long id) {
        log.debug("Request to get Generation : {}", id);
        return generationRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Generation : {}", id);
        generationRepository.deleteById(id);
    }
}
