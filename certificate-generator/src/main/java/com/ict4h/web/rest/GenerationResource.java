package com.ict4h.web.rest;

import com.ict4h.domain.Generation;
import com.ict4h.service.GenerationService;
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
 * REST controller for managing {@link com.ict4h.domain.Generation}.
 */
@RestController
@RequestMapping("/api")
public class GenerationResource {

    private final Logger log = LoggerFactory.getLogger(GenerationResource.class);

    private static final String ENTITY_NAME = "generation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GenerationService generationService;

    public GenerationResource(GenerationService generationService) {
        this.generationService = generationService;
    }

    /**
     * {@code POST  /generations} : Create a new generation.
     *
     * @param generation the generation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new generation, or with status {@code 400 (Bad Request)} if the generation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/generations")
    public ResponseEntity<Generation> createGeneration(@Valid @RequestBody Generation generation) throws URISyntaxException {
        log.debug("REST request to save Generation : {}", generation);
        if (generation.getId() != null) {
            throw new BadRequestAlertException("A new generation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Generation result = generationService.save(generation);
        return ResponseEntity.created(new URI("/api/generations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /generations} : Updates an existing generation.
     *
     * @param generation the generation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated generation,
     * or with status {@code 400 (Bad Request)} if the generation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the generation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/generations")
    public ResponseEntity<Generation> updateGeneration(@Valid @RequestBody Generation generation) throws URISyntaxException {
        log.debug("REST request to update Generation : {}", generation);
        if (generation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Generation result = generationService.save(generation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, generation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /generations} : get all the generations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of generations in body.
     */
    @GetMapping("/generations")
    public ResponseEntity<List<Generation>> getAllGenerations(Pageable pageable) {
        log.debug("REST request to get a page of Generations");
        Page<Generation> page = generationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /generations/:id} : get the "id" generation.
     *
     * @param id the id of the generation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the generation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/generations/{id}")
    public ResponseEntity<Generation> getGeneration(@PathVariable Long id) {
        log.debug("REST request to get Generation : {}", id);
        Optional<Generation> generation = generationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(generation);
    }

    /**
     * {@code DELETE  /generations/:id} : delete the "id" generation.
     *
     * @param id the id of the generation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/generations/{id}")
    public ResponseEntity<Void> deleteGeneration(@PathVariable Long id) {
        log.debug("REST request to delete Generation : {}", id);
        generationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
