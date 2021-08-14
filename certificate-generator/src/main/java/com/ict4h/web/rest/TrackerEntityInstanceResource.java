package com.ict4h.web.rest;

import com.google.common.base.Joiner;
import com.ict4h.domain.Event;
import com.ict4h.domain.TrackerEntityInstance;
import com.ict4h.service.EventService;
import com.ict4h.service.TrackerEntityInstanceService;
import com.ict4h.service.search.SpecificationBuilder;
import com.ict4h.service.search.criteria.SearchOperation;
import com.ict4h.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import liquibase.pro.packaged.ev;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * REST controller for managing {@link com.ict4h.domain.TrackerEntityInstance}.
 */
@RestController
@RequestMapping("/api")
public class TrackerEntityInstanceResource {

    private final Logger log = LoggerFactory.getLogger(TrackerEntityInstanceResource.class);

    private static final String ENTITY_NAME = "trackerEntityInstance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    public EventService eventService;

    private final TrackerEntityInstanceService trackerEntityInstanceService;

    public TrackerEntityInstanceResource(TrackerEntityInstanceService trackerEntityInstanceService) {
        this.trackerEntityInstanceService = trackerEntityInstanceService;
    }

    /**
     * {@code POST  /tracker-entity-instances} : Create a new trackerEntityInstance.
     *
     * @param trackerEntityInstance the trackerEntityInstance to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trackerEntityInstance, or with status {@code 400 (Bad Request)} if the trackerEntityInstance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tracker-entity-instances")
    public ResponseEntity<TrackerEntityInstance> createTrackerEntityInstance(@Valid @RequestBody TrackerEntityInstance trackerEntityInstance) throws URISyntaxException {
        log.debug("REST request to save TrackerEntityInstance : {}", trackerEntityInstance);
        if (trackerEntityInstance.getId() != null) {
            throw new BadRequestAlertException("A new trackerEntityInstance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrackerEntityInstance result = trackerEntityInstanceService.save(trackerEntityInstance);
        return ResponseEntity.created(new URI("/api/tracker-entity-instances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tracker-entity-instances} : Updates an existing trackerEntityInstance.
     *
     * @param trackerEntityInstance the trackerEntityInstance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trackerEntityInstance,
     * or with status {@code 400 (Bad Request)} if the trackerEntityInstance is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trackerEntityInstance couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tracker-entity-instances")
    public ResponseEntity<TrackerEntityInstance> updateTrackerEntityInstance(@Valid @RequestBody TrackerEntityInstance trackerEntityInstance) throws URISyntaxException {
        log.debug("REST request to update TrackerEntityInstance : {}", trackerEntityInstance);
        if (trackerEntityInstance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrackerEntityInstance result = trackerEntityInstanceService.save(trackerEntityInstance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, trackerEntityInstance.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tracker-entity-instances} : get all the trackerEntityInstances.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trackerEntityInstances in body.
     */
    @GetMapping("/tracker-entity-instances")
    public ResponseEntity<List<TrackerEntityInstance>> getAllTrackerEntityInstances(@RequestParam(value = "search") String search, Pageable pageable) {
        log.debug("REST request to get a page of TrackerEntityInstances");
        Page<TrackerEntityInstance> page = trackerEntityInstanceService.findAll(resolveSpecification(search), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    
    protected Specification<TrackerEntityInstance> resolveSpecification(String searchParameters) {
        SpecificationBuilder<TrackerEntityInstance> builder = new SpecificationBuilder<TrackerEntityInstance>();
        String operationSetExpression = Joiner.on("|").join(SearchOperation.SIMPLE_OPERATION_SET);
        Pattern pattern = Pattern
                .compile("(\\p{Punct}?)(\\w+?)(" + operationSetExpression + ")(\\p{Punct}?)(\\w+?)(\\p{Punct}?),");
        Matcher matcher = pattern.matcher(searchParameters + ",");
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(5), matcher.group(4),
                    matcher.group(6));
        }
        return builder.build();
    }
    /**
     * {@code GET  /tracker-entity-instances/:id} : get the "id" trackerEntityInstance.
     *
     * @param id the id of the trackerEntityInstance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trackerEntityInstance, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tracker-entity-instances/{id}")
    public ResponseEntity<TrackerEntityInstance> getTrackerEntityInstance(@PathVariable Long id) {
        log.debug("REST request to get TrackerEntityInstance : {}", id);
        Optional<TrackerEntityInstance> trackerEntityInstance = trackerEntityInstanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trackerEntityInstance);
    }

    @GetMapping("/tracker-entity-instances/{id}/events")
    public ResponseEntity<List<Event>> getEvents(@PathVariable Long id) {
        log.debug("REST request to get TrackerEntityInstance : {}", id);
        List<Event> events = eventService.findByTei(getTrackerEntityInstance(id).getBody());
        return ResponseEntity.ok(events);
    }

    /**
     * {@code DELETE  /tracker-entity-instances/:id} : delete the "id" trackerEntityInstance.
     *
     * @param id the id of the trackerEntityInstance to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tracker-entity-instances/{id}")
    public ResponseEntity<Void> deleteTrackerEntityInstance(@PathVariable Long id) {
        log.debug("REST request to delete TrackerEntityInstance : {}", id);
        trackerEntityInstanceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
