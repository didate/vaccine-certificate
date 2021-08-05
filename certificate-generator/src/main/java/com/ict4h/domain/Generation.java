package com.ict4h.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Generation.
 */
@Entity
@Table(name = "generation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Generation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date_generation", nullable = false)
    private LocalDate dateGeneration;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateGeneration() {
        return dateGeneration;
    }

    public Generation dateGeneration(LocalDate dateGeneration) {
        this.dateGeneration = dateGeneration;
        return this;
    }

    public void setDateGeneration(LocalDate dateGeneration) {
        this.dateGeneration = dateGeneration;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Generation)) {
            return false;
        }
        return id != null && id.equals(((Generation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Generation{" +
            "id=" + getId() +
            ", dateGeneration='" + getDateGeneration() + "'" +
            "}";
    }
}
