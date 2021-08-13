package com.ict4h.web.rest;

import com.ict4h.domain.Plainte;
import com.ict4h.service.PlainteService;
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
 * REST controller for managing {@link com.ict4h.domain.Plainte}.
 */
@RestController
@RequestMapping("/api")
public class PlainteResource {

    private final Logger log = LoggerFactory.getLogger(PlainteResource.class);

    private static final String ENTITY_NAME = "plainte";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlainteService plainteService;

    public PlainteResource(PlainteService plainteService) {
        this.plainteService = plainteService;
    }

    /**
     * {@code POST  /plaintes} : Create a new plainte.
     *
     * @param plainte the plainte to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plainte, or with status {@code 400 (Bad Request)} if the plainte has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plaintes")
    public ResponseEntity<Plainte> createPlainte(@Valid @RequestBody Plainte plainte) throws URISyntaxException {
        log.debug("REST request to save Plainte : {}", plainte);
        if (plainte.getId() != null) {
            throw new BadRequestAlertException("A new plainte cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plainte result = plainteService.save(plainte);
        return ResponseEntity.created(new URI("/api/plaintes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plaintes} : Updates an existing plainte.
     *
     * @param plainte the plainte to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plainte,
     * or with status {@code 400 (Bad Request)} if the plainte is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plainte couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plaintes")
    public ResponseEntity<Plainte> updatePlainte(@Valid @RequestBody Plainte plainte) throws URISyntaxException {
        log.debug("REST request to update Plainte : {}", plainte);
        if (plainte.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Plainte result = plainteService.save(plainte);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, plainte.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /plaintes} : get all the plaintes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plaintes in body.
     */
    @GetMapping("/plaintes")
    public ResponseEntity<List<Plainte>> getAllPlaintes(Pageable pageable) {
        log.debug("REST request to get a page of Plaintes");
        Page<Plainte> page = plainteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /plaintes/:id} : get the "id" plainte.
     *
     * @param id the id of the plainte to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plainte, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plaintes/{id}")
    public ResponseEntity<Plainte> getPlainte(@PathVariable Long id) {
        log.debug("REST request to get Plainte : {}", id);
        Optional<Plainte> plainte = plainteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(plainte);
    }

    /**
     * {@code DELETE  /plaintes/:id} : delete the "id" plainte.
     *
     * @param id the id of the plainte to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plaintes/{id}")
    public ResponseEntity<Void> deletePlainte(@PathVariable Long id) {
        log.debug("REST request to delete Plainte : {}", id);
        plainteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
