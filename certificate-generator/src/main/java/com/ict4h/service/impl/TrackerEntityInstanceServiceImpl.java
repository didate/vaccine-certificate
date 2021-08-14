package com.ict4h.service.impl;

import com.ict4h.service.TrackerEntityInstanceService;
import com.ict4h.domain.TrackerEntityInstance;
import com.ict4h.repository.TrackerEntityInstanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TrackerEntityInstance}.
 */
@Service
@Transactional
public class TrackerEntityInstanceServiceImpl implements TrackerEntityInstanceService {

    private final Logger log = LoggerFactory.getLogger(TrackerEntityInstanceServiceImpl.class);

    private final TrackerEntityInstanceRepository trackerEntityInstanceRepository;

    public TrackerEntityInstanceServiceImpl(TrackerEntityInstanceRepository trackerEntityInstanceRepository) {
        this.trackerEntityInstanceRepository = trackerEntityInstanceRepository;
    }

    @Override
    public TrackerEntityInstance save(TrackerEntityInstance trackerEntityInstance) {
        log.debug("Request to save TrackerEntityInstance : {}", trackerEntityInstance);
        return trackerEntityInstanceRepository.save(trackerEntityInstance);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TrackerEntityInstance> findAll(Pageable pageable) {
        log.debug("Request to get all TrackerEntityInstances");
        return trackerEntityInstanceRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TrackerEntityInstance> findOne(Long id) {
        log.debug("Request to get TrackerEntityInstance : {}", id);
        return trackerEntityInstanceRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TrackerEntityInstance : {}", id);
        trackerEntityInstanceRepository.deleteById(id);
    }

    @Override
    public Page<TrackerEntityInstance> findAll(Specification<TrackerEntityInstance> specification, Pageable pageable) {
        return trackerEntityInstanceRepository.findAll(specification, pageable);
    }
}
