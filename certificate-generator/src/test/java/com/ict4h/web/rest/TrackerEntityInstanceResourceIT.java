package com.ict4h.web.rest;

import com.ict4h.CertificateGeneratorApp;
import com.ict4h.domain.TrackerEntityInstance;
import com.ict4h.repository.TrackerEntityInstanceRepository;
import com.ict4h.service.TrackerEntityInstanceService;

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
 * Integration tests for the {@link TrackerEntityInstanceResource} REST controller.
 */
@SpringBootTest(classes = CertificateGeneratorApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TrackerEntityInstanceResourceIT {

    private static final String DEFAULT_UID = "AAAAAAAAAA";
    private static final String UPDATED_UID = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_SEXE = "AAAAAAAAAA";
    private static final String UPDATED_SEXE = "BBBBBBBBBB";

    private static final String DEFAULT_PROFESSION = "AAAAAAAAAA";
    private static final String UPDATED_PROFESSION = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final String DEFAULT_REGION = "AAAAAAAAAA";
    private static final String UPDATED_REGION = "BBBBBBBBBB";

    private static final String DEFAULT_PREFECTURE = "AAAAAAAAAA";
    private static final String UPDATED_PREFECTURE = "BBBBBBBBBB";

    private static final String DEFAULT_SOUS_PREFECTURE = "AAAAAAAAAA";
    private static final String UPDATED_SOUS_PREFECTURE = "BBBBBBBBBB";

    private static final String DEFAULT_QUARTIER = "AAAAAAAAAA";
    private static final String UPDATED_QUARTIER = "BBBBBBBBBB";

    private static final String DEFAULT_VILLAGE = "AAAAAAAAAA";
    private static final String UPDATED_VILLAGE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_LOCAL_ID = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL_ID = "BBBBBBBBBB";

    private static final Long DEFAULT_CODE = 1L;
    private static final Long UPDATED_CODE = 2L;

    private static final String DEFAULT_CERTIFICATE = "AAAAAAAAAA";
    private static final String UPDATED_CERTIFICATE = "BBBBBBBBBB";

    @Autowired
    private TrackerEntityInstanceRepository trackerEntityInstanceRepository;

    @Autowired
    private TrackerEntityInstanceService trackerEntityInstanceService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrackerEntityInstanceMockMvc;

    private TrackerEntityInstance trackerEntityInstance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrackerEntityInstance createEntity(EntityManager em) {
        TrackerEntityInstance trackerEntityInstance = new TrackerEntityInstance()
            .uid(DEFAULT_UID)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .sexe(DEFAULT_SEXE)
            .profession(DEFAULT_PROFESSION)
            .age(DEFAULT_AGE)
            .region(DEFAULT_REGION)
            .prefecture(DEFAULT_PREFECTURE)
            .sousPrefecture(DEFAULT_SOUS_PREFECTURE)
            .quartier(DEFAULT_QUARTIER)
            .village(DEFAULT_VILLAGE)
            .telephone(DEFAULT_TELEPHONE)
            .localId(DEFAULT_LOCAL_ID)
            .code(DEFAULT_CODE)
            .certificate(DEFAULT_CERTIFICATE);
        return trackerEntityInstance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrackerEntityInstance createUpdatedEntity(EntityManager em) {
        TrackerEntityInstance trackerEntityInstance = new TrackerEntityInstance()
            .uid(UPDATED_UID)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .sexe(UPDATED_SEXE)
            .profession(UPDATED_PROFESSION)
            .age(UPDATED_AGE)
            .region(UPDATED_REGION)
            .prefecture(UPDATED_PREFECTURE)
            .sousPrefecture(UPDATED_SOUS_PREFECTURE)
            .quartier(UPDATED_QUARTIER)
            .village(UPDATED_VILLAGE)
            .telephone(UPDATED_TELEPHONE)
            .localId(UPDATED_LOCAL_ID)
            .code(UPDATED_CODE)
            .certificate(UPDATED_CERTIFICATE);
        return trackerEntityInstance;
    }

    @BeforeEach
    public void initTest() {
        trackerEntityInstance = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrackerEntityInstance() throws Exception {
        int databaseSizeBeforeCreate = trackerEntityInstanceRepository.findAll().size();
        // Create the TrackerEntityInstance
        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isCreated());

        // Validate the TrackerEntityInstance in the database
        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeCreate + 1);
        TrackerEntityInstance testTrackerEntityInstance = trackerEntityInstanceList.get(trackerEntityInstanceList.size() - 1);
        assertThat(testTrackerEntityInstance.getUid()).isEqualTo(DEFAULT_UID);
        assertThat(testTrackerEntityInstance.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testTrackerEntityInstance.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testTrackerEntityInstance.getSexe()).isEqualTo(DEFAULT_SEXE);
        assertThat(testTrackerEntityInstance.getProfession()).isEqualTo(DEFAULT_PROFESSION);
        assertThat(testTrackerEntityInstance.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTrackerEntityInstance.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testTrackerEntityInstance.getPrefecture()).isEqualTo(DEFAULT_PREFECTURE);
        assertThat(testTrackerEntityInstance.getSousPrefecture()).isEqualTo(DEFAULT_SOUS_PREFECTURE);
        assertThat(testTrackerEntityInstance.getQuartier()).isEqualTo(DEFAULT_QUARTIER);
        assertThat(testTrackerEntityInstance.getVillage()).isEqualTo(DEFAULT_VILLAGE);
        assertThat(testTrackerEntityInstance.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testTrackerEntityInstance.getLocalId()).isEqualTo(DEFAULT_LOCAL_ID);
        assertThat(testTrackerEntityInstance.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testTrackerEntityInstance.getCertificate()).isEqualTo(DEFAULT_CERTIFICATE);
    }

    @Test
    @Transactional
    public void createTrackerEntityInstanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trackerEntityInstanceRepository.findAll().size();

        // Create the TrackerEntityInstance with an existing ID
        trackerEntityInstance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        // Validate the TrackerEntityInstance in the database
        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUidIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setUid(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setNom(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setPrenom(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSexeIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setSexe(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProfessionIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setProfession(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setAge(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRegionIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setRegion(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrefectureIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setPrefecture(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuartierIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setQuartier(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setTelephone(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocalIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackerEntityInstanceRepository.findAll().size();
        // set the field null
        trackerEntityInstance.setLocalId(null);

        // Create the TrackerEntityInstance, which fails.


        restTrackerEntityInstanceMockMvc.perform(post("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrackerEntityInstances() throws Exception {
        // Initialize the database
        trackerEntityInstanceRepository.saveAndFlush(trackerEntityInstance);

        // Get all the trackerEntityInstanceList
        restTrackerEntityInstanceMockMvc.perform(get("/api/tracker-entity-instances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trackerEntityInstance.getId().intValue())))
            .andExpect(jsonPath("$.[*].uid").value(hasItem(DEFAULT_UID)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].sexe").value(hasItem(DEFAULT_SEXE)))
            .andExpect(jsonPath("$.[*].profession").value(hasItem(DEFAULT_PROFESSION)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION)))
            .andExpect(jsonPath("$.[*].prefecture").value(hasItem(DEFAULT_PREFECTURE)))
            .andExpect(jsonPath("$.[*].sousPrefecture").value(hasItem(DEFAULT_SOUS_PREFECTURE)))
            .andExpect(jsonPath("$.[*].quartier").value(hasItem(DEFAULT_QUARTIER)))
            .andExpect(jsonPath("$.[*].village").value(hasItem(DEFAULT_VILLAGE)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].localId").value(hasItem(DEFAULT_LOCAL_ID)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.intValue())))
            .andExpect(jsonPath("$.[*].certificate").value(hasItem(DEFAULT_CERTIFICATE)));
    }
    
    @Test
    @Transactional
    public void getTrackerEntityInstance() throws Exception {
        // Initialize the database
        trackerEntityInstanceRepository.saveAndFlush(trackerEntityInstance);

        // Get the trackerEntityInstance
        restTrackerEntityInstanceMockMvc.perform(get("/api/tracker-entity-instances/{id}", trackerEntityInstance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trackerEntityInstance.getId().intValue()))
            .andExpect(jsonPath("$.uid").value(DEFAULT_UID))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.sexe").value(DEFAULT_SEXE))
            .andExpect(jsonPath("$.profession").value(DEFAULT_PROFESSION))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION))
            .andExpect(jsonPath("$.prefecture").value(DEFAULT_PREFECTURE))
            .andExpect(jsonPath("$.sousPrefecture").value(DEFAULT_SOUS_PREFECTURE))
            .andExpect(jsonPath("$.quartier").value(DEFAULT_QUARTIER))
            .andExpect(jsonPath("$.village").value(DEFAULT_VILLAGE))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.localId").value(DEFAULT_LOCAL_ID))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.intValue()))
            .andExpect(jsonPath("$.certificate").value(DEFAULT_CERTIFICATE));
    }
    @Test
    @Transactional
    public void getNonExistingTrackerEntityInstance() throws Exception {
        // Get the trackerEntityInstance
        restTrackerEntityInstanceMockMvc.perform(get("/api/tracker-entity-instances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrackerEntityInstance() throws Exception {
        // Initialize the database
        trackerEntityInstanceService.save(trackerEntityInstance);

        int databaseSizeBeforeUpdate = trackerEntityInstanceRepository.findAll().size();

        // Update the trackerEntityInstance
        TrackerEntityInstance updatedTrackerEntityInstance = trackerEntityInstanceRepository.findById(trackerEntityInstance.getId()).get();
        // Disconnect from session so that the updates on updatedTrackerEntityInstance are not directly saved in db
        em.detach(updatedTrackerEntityInstance);
        updatedTrackerEntityInstance
            .uid(UPDATED_UID)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .sexe(UPDATED_SEXE)
            .profession(UPDATED_PROFESSION)
            .age(UPDATED_AGE)
            .region(UPDATED_REGION)
            .prefecture(UPDATED_PREFECTURE)
            .sousPrefecture(UPDATED_SOUS_PREFECTURE)
            .quartier(UPDATED_QUARTIER)
            .village(UPDATED_VILLAGE)
            .telephone(UPDATED_TELEPHONE)
            .localId(UPDATED_LOCAL_ID)
            .code(UPDATED_CODE)
            .certificate(UPDATED_CERTIFICATE);

        restTrackerEntityInstanceMockMvc.perform(put("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrackerEntityInstance)))
            .andExpect(status().isOk());

        // Validate the TrackerEntityInstance in the database
        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeUpdate);
        TrackerEntityInstance testTrackerEntityInstance = trackerEntityInstanceList.get(trackerEntityInstanceList.size() - 1);
        assertThat(testTrackerEntityInstance.getUid()).isEqualTo(UPDATED_UID);
        assertThat(testTrackerEntityInstance.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTrackerEntityInstance.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testTrackerEntityInstance.getSexe()).isEqualTo(UPDATED_SEXE);
        assertThat(testTrackerEntityInstance.getProfession()).isEqualTo(UPDATED_PROFESSION);
        assertThat(testTrackerEntityInstance.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTrackerEntityInstance.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testTrackerEntityInstance.getPrefecture()).isEqualTo(UPDATED_PREFECTURE);
        assertThat(testTrackerEntityInstance.getSousPrefecture()).isEqualTo(UPDATED_SOUS_PREFECTURE);
        assertThat(testTrackerEntityInstance.getQuartier()).isEqualTo(UPDATED_QUARTIER);
        assertThat(testTrackerEntityInstance.getVillage()).isEqualTo(UPDATED_VILLAGE);
        assertThat(testTrackerEntityInstance.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testTrackerEntityInstance.getLocalId()).isEqualTo(UPDATED_LOCAL_ID);
        assertThat(testTrackerEntityInstance.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testTrackerEntityInstance.getCertificate()).isEqualTo(UPDATED_CERTIFICATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTrackerEntityInstance() throws Exception {
        int databaseSizeBeforeUpdate = trackerEntityInstanceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrackerEntityInstanceMockMvc.perform(put("/api/tracker-entity-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trackerEntityInstance)))
            .andExpect(status().isBadRequest());

        // Validate the TrackerEntityInstance in the database
        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrackerEntityInstance() throws Exception {
        // Initialize the database
        trackerEntityInstanceService.save(trackerEntityInstance);

        int databaseSizeBeforeDelete = trackerEntityInstanceRepository.findAll().size();

        // Delete the trackerEntityInstance
        restTrackerEntityInstanceMockMvc.perform(delete("/api/tracker-entity-instances/{id}", trackerEntityInstance.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TrackerEntityInstance> trackerEntityInstanceList = trackerEntityInstanceRepository.findAll();
        assertThat(trackerEntityInstanceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
