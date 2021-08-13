package com.ict4h.web.rest;

import com.ict4h.CertificateGeneratorApp;
import com.ict4h.domain.Plainte;
import com.ict4h.repository.PlainteRepository;
import com.ict4h.service.PlainteService;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlainteResource} REST controller.
 */
@SpringBootTest(classes = CertificateGeneratorApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PlainteResourceIT {

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_LOCAL_ID = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL_ID = "BBBBBBBBBB";

    private static final Long DEFAULT_CODE = 1L;
    private static final Long UPDATED_CODE = 2L;

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    @Autowired
    private PlainteRepository plainteRepository;

    @Autowired
    private PlainteService plainteService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlainteMockMvc;

    private Plainte plainte;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plainte createEntity(EntityManager em) {
        Plainte plainte = new Plainte()
            .telephone(DEFAULT_TELEPHONE)
            .localId(DEFAULT_LOCAL_ID)
            .code(DEFAULT_CODE)
            .commentaire(DEFAULT_COMMENTAIRE);
        return plainte;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plainte createUpdatedEntity(EntityManager em) {
        Plainte plainte = new Plainte()
            .telephone(UPDATED_TELEPHONE)
            .localId(UPDATED_LOCAL_ID)
            .code(UPDATED_CODE)
            .commentaire(UPDATED_COMMENTAIRE);
        return plainte;
    }

    @BeforeEach
    public void initTest() {
        plainte = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlainte() throws Exception {
        int databaseSizeBeforeCreate = plainteRepository.findAll().size();
        // Create the Plainte
        restPlainteMockMvc.perform(post("/api/plaintes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plainte)))
            .andExpect(status().isCreated());

        // Validate the Plainte in the database
        List<Plainte> plainteList = plainteRepository.findAll();
        assertThat(plainteList).hasSize(databaseSizeBeforeCreate + 1);
        Plainte testPlainte = plainteList.get(plainteList.size() - 1);
        assertThat(testPlainte.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testPlainte.getLocalId()).isEqualTo(DEFAULT_LOCAL_ID);
        assertThat(testPlainte.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testPlainte.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void createPlainteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plainteRepository.findAll().size();

        // Create the Plainte with an existing ID
        plainte.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlainteMockMvc.perform(post("/api/plaintes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plainte)))
            .andExpect(status().isBadRequest());

        // Validate the Plainte in the database
        List<Plainte> plainteList = plainteRepository.findAll();
        assertThat(plainteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCommentaireIsRequired() throws Exception {
        int databaseSizeBeforeTest = plainteRepository.findAll().size();
        // set the field null
        plainte.setCommentaire(null);

        // Create the Plainte, which fails.


        restPlainteMockMvc.perform(post("/api/plaintes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plainte)))
            .andExpect(status().isBadRequest());

        List<Plainte> plainteList = plainteRepository.findAll();
        assertThat(plainteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlaintes() throws Exception {
        // Initialize the database
        plainteRepository.saveAndFlush(plainte);

        // Get all the plainteList
        restPlainteMockMvc.perform(get("/api/plaintes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plainte.getId().intValue())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].localId").value(hasItem(DEFAULT_LOCAL_ID)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.intValue())))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)));
    }
    
    @Test
    @Transactional
    public void getPlainte() throws Exception {
        // Initialize the database
        plainteRepository.saveAndFlush(plainte);

        // Get the plainte
        restPlainteMockMvc.perform(get("/api/plaintes/{id}", plainte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plainte.getId().intValue()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.localId").value(DEFAULT_LOCAL_ID))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.intValue()))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE));
    }
    @Test
    @Transactional
    public void getNonExistingPlainte() throws Exception {
        // Get the plainte
        restPlainteMockMvc.perform(get("/api/plaintes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlainte() throws Exception {
        // Initialize the database
        plainteService.save(plainte);

        int databaseSizeBeforeUpdate = plainteRepository.findAll().size();

        // Update the plainte
        Plainte updatedPlainte = plainteRepository.findById(plainte.getId()).get();
        // Disconnect from session so that the updates on updatedPlainte are not directly saved in db
        em.detach(updatedPlainte);
        updatedPlainte
            .telephone(UPDATED_TELEPHONE)
            .localId(UPDATED_LOCAL_ID)
            .code(UPDATED_CODE)
            .commentaire(UPDATED_COMMENTAIRE);

        restPlainteMockMvc.perform(put("/api/plaintes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlainte)))
            .andExpect(status().isOk());

        // Validate the Plainte in the database
        List<Plainte> plainteList = plainteRepository.findAll();
        assertThat(plainteList).hasSize(databaseSizeBeforeUpdate);
        Plainte testPlainte = plainteList.get(plainteList.size() - 1);
        assertThat(testPlainte.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testPlainte.getLocalId()).isEqualTo(UPDATED_LOCAL_ID);
        assertThat(testPlainte.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testPlainte.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlainte() throws Exception {
        int databaseSizeBeforeUpdate = plainteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlainteMockMvc.perform(put("/api/plaintes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plainte)))
            .andExpect(status().isBadRequest());

        // Validate the Plainte in the database
        List<Plainte> plainteList = plainteRepository.findAll();
        assertThat(plainteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlainte() throws Exception {
        // Initialize the database
        plainteService.save(plainte);

        int databaseSizeBeforeDelete = plainteRepository.findAll().size();

        // Delete the plainte
        restPlainteMockMvc.perform(delete("/api/plaintes/{id}", plainte.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plainte> plainteList = plainteRepository.findAll();
        assertThat(plainteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
