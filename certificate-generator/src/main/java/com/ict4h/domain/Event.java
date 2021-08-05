package com.ict4h.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "uid", nullable = false)
    private String uid;

    @NotNull
    @Column(name = "date_vaccination", nullable = false)
    private LocalDate dateVaccination;

    @NotNull
    @Column(name = "site_vaccination", nullable = false)
    private String siteVaccination;

    @NotNull
    @Column(name = "type_vaccin", nullable = false)
    private String typeVaccin;

    @NotNull
    @Column(name = "lot", nullable = false)
    private String lot;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "events", allowSetters = true)
    private TrackerEntityInstance tei;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUid() {
        return uid;
    }

    public Event uid(String uid) {
        this.uid = uid;
        return this;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public LocalDate getDateVaccination() {
        return dateVaccination;
    }

    public Event dateVaccination(LocalDate dateVaccination) {
        this.dateVaccination = dateVaccination;
        return this;
    }

    public void setDateVaccination(LocalDate dateVaccination) {
        this.dateVaccination = dateVaccination;
    }

    public String getSiteVaccination() {
        return siteVaccination;
    }

    public Event siteVaccination(String siteVaccination) {
        this.siteVaccination = siteVaccination;
        return this;
    }

    public void setSiteVaccination(String siteVaccination) {
        this.siteVaccination = siteVaccination;
    }

    public String getTypeVaccin() {
        return typeVaccin;
    }

    public Event typeVaccin(String typeVaccin) {
        this.typeVaccin = typeVaccin;
        return this;
    }

    public void setTypeVaccin(String typeVaccin) {
        this.typeVaccin = typeVaccin;
    }

    public String getLot() {
        return lot;
    }

    public Event lot(String lot) {
        this.lot = lot;
        return this;
    }

    public void setLot(String lot) {
        this.lot = lot;
    }

    public TrackerEntityInstance getTei() {
        return tei;
    }

    public Event tei(TrackerEntityInstance trackerEntityInstance) {
        this.tei = trackerEntityInstance;
        return this;
    }

    public void setTei(TrackerEntityInstance trackerEntityInstance) {
        this.tei = trackerEntityInstance;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Event)) {
            return false;
        }
        return id != null && id.equals(((Event) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", uid='" + getUid() + "'" +
            ", dateVaccination='" + getDateVaccination() + "'" +
            ", siteVaccination='" + getSiteVaccination() + "'" +
            ", typeVaccin='" + getTypeVaccin() + "'" +
            ", lot='" + getLot() + "'" +
            "}";
    }
}
