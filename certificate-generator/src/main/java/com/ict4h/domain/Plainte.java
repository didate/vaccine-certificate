package com.ict4h.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Plainte.
 */
@Entity
@Table(name = "plainte")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Plainte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "local_id")
    private String localId;

    @Column(name = "code")
    private Long code;

    @NotNull
    @Column(name = "commentaire", nullable = false)
    private String commentaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTelephone() {
        return telephone;
    }

    public Plainte telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getLocalId() {
        return localId;
    }

    public Plainte localId(String localId) {
        this.localId = localId;
        return this;
    }

    public void setLocalId(String localId) {
        this.localId = localId;
    }

    public Long getCode() {
        return code;
    }

    public Plainte code(Long code) {
        this.code = code;
        return this;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Plainte commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Plainte)) {
            return false;
        }
        return id != null && id.equals(((Plainte) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Plainte{" +
            "id=" + getId() +
            ", telephone='" + getTelephone() + "'" +
            ", localId='" + getLocalId() + "'" +
            ", code=" + getCode() +
            ", commentaire='" + getCommentaire() + "'" +
            "}";
    }
}
