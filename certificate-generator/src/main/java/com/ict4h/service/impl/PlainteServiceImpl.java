package com.ict4h.service.impl;

import com.ict4h.service.PlainteService;
import com.ict4h.domain.Plainte;
import com.ict4h.repository.PlainteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Plainte}.
 */
@Service
@Transactional
public class PlainteServiceImpl implements PlainteService {

    private final Logger log = LoggerFactory.getLogger(PlainteServiceImpl.class);

    private final PlainteRepository plainteRepository;

    public PlainteServiceImpl(PlainteRepository plainteRepository) {
        this.plainteRepository = plainteRepository;
    }

    @Override
    public Plainte save(Plainte plainte) {
        log.debug("Request to save Plainte : {}", plainte);
        return plainteRepository.save(plainte);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Plainte> findAll(Pageable pageable) {
        log.debug("Request to get all Plaintes");
        return plainteRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Plainte> findOne(Long id) {
        log.debug("Request to get Plainte : {}", id);
        return plainteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Plainte : {}", id);
        plainteRepository.deleteById(id);
    }
}
