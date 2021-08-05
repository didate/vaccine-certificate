package com.ict4h.web.rest;

import com.ict4h.CertificateGeneratorApp;
import com.ict4h.domain.Event;
import com.ict4h.domain.TrackerEntityInstance;
import com.ict4h.repository.EventRepository;
import com.ict4h.service.EventService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EventResource} REST controller.
 */
@SpringBootTest(classes = CertificateGeneratorApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EventResourceIT {

    private static final String DEFAULT_UID = "AAAAAAAAAA";
    private static final String UPDATED_UID = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_VACCINATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_VACCINATION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SITE_VACCINATION = "AAAAAAAAAA";
    private static final String UPDATED_SITE_VACCINATION = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_VACCIN = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_VACCIN = "BBBBBBBBBB";

    private static final String DEFAULT_LOT = "AAAAAAAAAA";
    private static final String UPDATED_LOT = "BBBBBBBBBB";

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEventMockMvc;

    private Event event;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Event createEntity(EntityManager em) {
        Event event = new Event()
            .uid(DEFAULT_UID)
            .dateVaccination(DEFAULT_DATE_VACCINATION)
            .siteVaccination(DEFAULT_SITE_VACCINATION)
            .typeVaccin(DEFAULT_TYPE_VACCIN)
            .lot(DEFAULT_LOT);
        // Add required entity
        TrackerEntityInstance trackerEntityInstance;
        if (TestUtil.findAll(em, TrackerEntityInstance.class).isEmpty()) {
            trackerEntityInstance = TrackerEntityInstanceResourceIT.createEntity(em);
            em.persist(trackerEntityInstance);
            em.flush();
        } else {
            trackerEntityInstance = TestUtil.findAll(em, TrackerEntityInstance.class).get(0);
        }
        event.setTei(trackerEntityInstance);
        return event;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Event createUpdatedEntity(EntityManager em) {
        Event event = new Event()
            .uid(UPDATED_UID)
            .dateVaccination(UPDATED_DATE_VACCINATION)
            .siteVaccination(UPDATED_SITE_VACCINATION)
            .typeVaccin(UPDATED_TYPE_VACCIN)
            .lot(UPDATED_LOT);
        // Add required entity
        TrackerEntityInstance trackerEntityInstance;
        if (TestUtil.findAll(em, TrackerEntityInstance.class).isEmpty()) {
            trackerEntityInstance = TrackerEntityInstanceResourceIT.createUpdatedEntity(em);
            em.persist(trackerEntityInstance);
            em.flush();
        } else {
            trackerEntityInstance = TestUtil.findAll(em, TrackerEntityInstance.class).get(0);
        }
        event.setTei(trackerEntityInstance);
        return event;
    }

    @BeforeEach
    public void initTest() {
        event = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvent() throws Exception {
        int databaseSizeBeforeCreate = eventRepository.findAll().size();
        // Create the Event
        restEventMockMvc.perform(post("/api/events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isCreated());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeCreate + 1);
        Event testEvent = eventList.get(eventList.size() - 1);
        assertThat(testEvent.getUid()).isEqualTo(DEFAULT_UID);
        assertThat(testEvent.getDateVaccination()).isEqualTo(DEFAULT_DATE_VACCINATION);
        assertThat(testEvent.getSiteVaccination()).isEqualTo(DEFAULT_SITE_VACCINATION);
        assertThat(testEvent.getTypeVaccin()).isEqualTo(DEFAULT_TYPE_VACCIN);
        assertThat(testEvent.getLot()).isEqualTo(DEFAULT_LOT);
    }

    @Test
    @Transactional
    public void createEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventRepository.findAll().size();

        // Create the Event with an existing ID
        event.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventMockMvc.perform(post("/api/events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUidIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setUid(null);

        // Create the Event, which fails.


        restEventMockMvc.perform(post("/api/events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateVaccinationIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setDateVaccination(null);

        // Create the Event, which fails.


        restEventMockMvc.perform(post("/api/events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSiteVaccinationIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setSiteVaccination(null);

        // Create the Event, which fails.


        restEventMockMvc.perform(post("/api/events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeVaccinIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setTypeVaccin(null);

        // Create the Event, which fails.


        restEventMockMvc.perform(post("/api/events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLotIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setLot(null);

        // Create the Event, which fails.


        restEventMockMvc.perform(post("/api/events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEvents() throws Exception {
        // Initialize the database
        eventRepository.saveAndFlush(event);

        // Get all the eventList
        restEventMockMvc.perform(get("/api/events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(event.getId().intValue())))
            .andExpect(jsonPath("$.[*].uid").value(hasItem(DEFAULT_UID)))
            .andExpect(jsonPath("$.[*].dateVaccination").value(hasItem(DEFAULT_DATE_VACCINATION.toString())))
            .andExpect(jsonPath("$.[*].siteVaccination").value(hasItem(DEFAULT_SITE_VACCINATION)))
            .andExpect(jsonPath("$.[*].typeVaccin").value(hasItem(DEFAULT_TYPE_VACCIN)))
            .andExpect(jsonPath("$.[*].lot").value(hasItem(DEFAULT_LOT)));
    }
    
    @Test
    @Transactional
    public void getEvent() throws Exception {
        // Initialize the database
        eventRepository.saveAndFlush(event);

        // Get the event
        restEventMockMvc.perform(get("/api/events/{id}", event.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(event.getId().intValue()))
            .andExpect(jsonPath("$.uid").value(DEFAULT_UID))
            .andExpect(jsonPath("$.dateVaccination").value(DEFAULT_DATE_VACCINATION.toString()))
            .andExpect(jsonPath("$.siteVaccination").value(DEFAULT_SITE_VACCINATION))
            .andExpect(jsonPath("$.typeVaccin").value(DEFAULT_TYPE_VACCIN))
            .andExpect(jsonPath("$.lot").value(DEFAULT_LOT));
    }
    @Test
    @Transactional
    public void getNonExistingEvent() throws Exception {
        // Get the event
        restEventMockMvc.perform(get("/api/events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvent() throws Exception {
        // Initialize the database
        eventService.save(event);

        int databaseSizeBeforeUpdate = eventRepository.findAll().size();

        // Update the event
        Event updatedEvent = eventRepository.findById(event.getId()).get();
        // Disconnect from session so that the updates on updatedEvent are not directly saved in db
        em.detach(updatedEvent);
        updatedEvent
            .uid(UPDATED_UID)
            .dateVaccination(UPDATED_DATE_VACCINATION)
            .siteVaccination(UPDATED_SITE_VACCINATION)
            .typeVaccin(UPDATED_TYPE_VACCIN)
            .lot(UPDATED_LOT);

        restEventMockMvc.perform(put("/api/events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvent)))
            .andExpect(status().isOk());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeUpdate);
        Event testEvent = eventList.get(eventList.size() - 1);
        assertThat(testEvent.getUid()).isEqualTo(UPDATED_UID);
        assertThat(testEvent.getDateVaccination()).isEqualTo(UPDATED_DATE_VACCINATION);
        assertThat(testEvent.getSiteVaccination()).isEqualTo(UPDATED_SITE_VACCINATION);
        assertThat(testEvent.getTypeVaccin()).isEqualTo(UPDATED_TYPE_VACCIN);
        assertThat(testEvent.getLot()).isEqualTo(UPDATED_LOT);
    }

    @Test
    @Transactional
    public void updateNonExistingEvent() throws Exception {
        int databaseSizeBeforeUpdate = eventRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventMockMvc.perform(put("/api/events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEvent() throws Exception {
        // Initialize the database
        eventService.save(event);

        int databaseSizeBeforeDelete = eventRepository.findAll().size();

        // Delete the event
        restEventMockMvc.perform(delete("/api/events/{id}", event.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
