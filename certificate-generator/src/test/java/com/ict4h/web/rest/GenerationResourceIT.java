package com.ict4h.web.rest;

import com.ict4h.CertificateGeneratorApp;
import com.ict4h.domain.Generation;
import com.ict4h.repository.GenerationRepository;
import com.ict4h.service.GenerationService;

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
 * Integration tests for the {@link GenerationResource} REST controller.
 */
@SpringBootTest(classes = CertificateGeneratorApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GenerationResourceIT {

    private static final LocalDate DEFAULT_DATE_GENERATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_GENERATION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GenerationRepository generationRepository;

    @Autowired
    private GenerationService generationService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGenerationMockMvc;

    private Generation generation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Generation createEntity(EntityManager em) {
        Generation generation = new Generation()
            .dateGeneration(DEFAULT_DATE_GENERATION);
        return generation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Generation createUpdatedEntity(EntityManager em) {
        Generation generation = new Generation()
            .dateGeneration(UPDATED_DATE_GENERATION);
        return generation;
    }

    @BeforeEach
    public void initTest() {
        generation = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeneration() throws Exception {
        int databaseSizeBeforeCreate = generationRepository.findAll().size();
        // Create the Generation
        restGenerationMockMvc.perform(post("/api/generations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(generation)))
            .andExpect(status().isCreated());

        // Validate the Generation in the database
        List<Generation> generationList = generationRepository.findAll();
        assertThat(generationList).hasSize(databaseSizeBeforeCreate + 1);
        Generation testGeneration = generationList.get(generationList.size() - 1);
        assertThat(testGeneration.getDateGeneration()).isEqualTo(DEFAULT_DATE_GENERATION);
    }

    @Test
    @Transactional
    public void createGenerationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = generationRepository.findAll().size();

        // Create the Generation with an existing ID
        generation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenerationMockMvc.perform(post("/api/generations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(generation)))
            .andExpect(status().isBadRequest());

        // Validate the Generation in the database
        List<Generation> generationList = generationRepository.findAll();
        assertThat(generationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateGenerationIsRequired() throws Exception {
        int databaseSizeBeforeTest = generationRepository.findAll().size();
        // set the field null
        generation.setDateGeneration(null);

        // Create the Generation, which fails.


        restGenerationMockMvc.perform(post("/api/generations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(generation)))
            .andExpect(status().isBadRequest());

        List<Generation> generationList = generationRepository.findAll();
        assertThat(generationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGenerations() throws Exception {
        // Initialize the database
        generationRepository.saveAndFlush(generation);

        // Get all the generationList
        restGenerationMockMvc.perform(get("/api/generations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(generation.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateGeneration").value(hasItem(DEFAULT_DATE_GENERATION.toString())));
    }
    
    @Test
    @Transactional
    public void getGeneration() throws Exception {
        // Initialize the database
        generationRepository.saveAndFlush(generation);

        // Get the generation
        restGenerationMockMvc.perform(get("/api/generations/{id}", generation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(generation.getId().intValue()))
            .andExpect(jsonPath("$.dateGeneration").value(DEFAULT_DATE_GENERATION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingGeneration() throws Exception {
        // Get the generation
        restGenerationMockMvc.perform(get("/api/generations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeneration() throws Exception {
        // Initialize the database
        generationService.save(generation);

        int databaseSizeBeforeUpdate = generationRepository.findAll().size();

        // Update the generation
        Generation updatedGeneration = generationRepository.findById(generation.getId()).get();
        // Disconnect from session so that the updates on updatedGeneration are not directly saved in db
        em.detach(updatedGeneration);
        updatedGeneration
            .dateGeneration(UPDATED_DATE_GENERATION);

        restGenerationMockMvc.perform(put("/api/generations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeneration)))
            .andExpect(status().isOk());

        // Validate the Generation in the database
        List<Generation> generationList = generationRepository.findAll();
        assertThat(generationList).hasSize(databaseSizeBeforeUpdate);
        Generation testGeneration = generationList.get(generationList.size() - 1);
        assertThat(testGeneration.getDateGeneration()).isEqualTo(UPDATED_DATE_GENERATION);
    }

    @Test
    @Transactional
    public void updateNonExistingGeneration() throws Exception {
        int databaseSizeBeforeUpdate = generationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenerationMockMvc.perform(put("/api/generations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(generation)))
            .andExpect(status().isBadRequest());

        // Validate the Generation in the database
        List<Generation> generationList = generationRepository.findAll();
        assertThat(generationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGeneration() throws Exception {
        // Initialize the database
        generationService.save(generation);

        int databaseSizeBeforeDelete = generationRepository.findAll().size();

        // Delete the generation
        restGenerationMockMvc.perform(delete("/api/generations/{id}", generation.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Generation> generationList = generationRepository.findAll();
        assertThat(generationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
