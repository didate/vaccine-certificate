package com.ict4h.service.impl;

import com.ict4h.service.SignatureService;
import com.ict4h.domain.Signature;
import com.ict4h.repository.SignatureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Signature}.
 */
@Service
@Transactional
public class SignatureServiceImpl implements SignatureService {

    private final Logger log = LoggerFactory.getLogger(SignatureServiceImpl.class);

    private final SignatureRepository signatureRepository;

    public SignatureServiceImpl(SignatureRepository signatureRepository) {
        this.signatureRepository = signatureRepository;
    }

    @Override
    public Signature save(Signature signature) {
        log.debug("Request to save Signature : {}", signature);
        return signatureRepository.save(signature);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Signature> findAll(Pageable pageable) {
        log.debug("Request to get all Signatures");
        return signatureRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Signature> findOne(Long id) {
        log.debug("Request to get Signature : {}", id);
        return signatureRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Signature : {}", id);
        signatureRepository.deleteById(id);
    }
}
