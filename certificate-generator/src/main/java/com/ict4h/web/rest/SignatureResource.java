package com.ict4h.web.rest;

import com.ict4h.domain.Signature;
import com.ict4h.service.SignatureService;
import com.ict4h.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ict4h.domain.Signature}.
 */
@RestController
@RequestMapping("/api")
public class SignatureResource {

    private final Logger log = LoggerFactory.getLogger(SignatureResource.class);

    private static final String ENTITY_NAME = "signature";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SignatureService signatureService;

    public SignatureResource(SignatureService signatureService) {
        this.signatureService = signatureService;
    }

    /**
     * {@code POST  /signatures} : Create a new signature.
     *
     * @param signature the signature to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new signature, or with status {@code 400 (Bad Request)} if the signature has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/signatures")
    public ResponseEntity<Signature> createSignature(@Valid @RequestBody Signature signature) throws URISyntaxException {
        log.debug("REST request to save Signature : {}", signature);
        if (signature.getId() != null) {
            throw new BadRequestAlertException("A new signature cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Signature result = signatureService.save(signature);
        return ResponseEntity.created(new URI("/api/signatures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /signatures} : Updates an existing signature.
     *
     * @param signature the signature to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated signature,
     * or with status {@code 400 (Bad Request)} if the signature is not valid,
     * or with status {@code 500 (Internal Server Error)} if the signature couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/signatures")
    public ResponseEntity<Signature> updateSignature(@Valid @RequestBody Signature signature) throws URISyntaxException {
        log.debug("REST request to update Signature : {}", signature);
        if (signature.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Signature result = signatureService.save(signature);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, signature.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /signatures} : get all the signatures.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of signatures in body.
     */
    @GetMapping("/signatures")
    public ResponseEntity<List<Signature>> getAllSignatures(Pageable pageable) {
        log.debug("REST request to get a page of Signatures");
        Page<Signature> page = signatureService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /signatures/:id} : get the "id" signature.
     *
     * @param id the id of the signature to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the signature, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/signatures/{id}")
    public ResponseEntity<Signature> getSignature(@PathVariable Long id) {
        log.debug("REST request to get Signature : {}", id);
        Optional<Signature> signature = signatureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(signature);
    }

    /**
     * {@code DELETE  /signatures/:id} : delete the "id" signature.
     *
     * @param id the id of the signature to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/signatures/{id}")
    public ResponseEntity<Void> deleteSignature(@PathVariable Long id) {
        log.debug("REST request to delete Signature : {}", id);
        signatureService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
