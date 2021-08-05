package com.ict4h.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Signature.
 */
@Entity
@Table(name = "signature")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Signature implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "authorite", nullable = false)
    private String authorite;

    
    @Lob
    @Column(name = "signature", nullable = false)
    private byte[] signature;

    @Column(name = "signature_content_type", nullable = false)
    private String signatureContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthorite() {
        return authorite;
    }

    public Signature authorite(String authorite) {
        this.authorite = authorite;
        return this;
    }

    public void setAuthorite(String authorite) {
        this.authorite = authorite;
    }

    public byte[] getSignature() {
        return signature;
    }

    public Signature signature(byte[] signature) {
        this.signature = signature;
        return this;
    }

    public void setSignature(byte[] signature) {
        this.signature = signature;
    }

    public String getSignatureContentType() {
        return signatureContentType;
    }

    public Signature signatureContentType(String signatureContentType) {
        this.signatureContentType = signatureContentType;
        return this;
    }

    public void setSignatureContentType(String signatureContentType) {
        this.signatureContentType = signatureContentType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Signature)) {
            return false;
        }
        return id != null && id.equals(((Signature) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Signature{" +
            "id=" + getId() +
            ", authorite='" + getAuthorite() + "'" +
            ", signature='" + getSignature() + "'" +
            ", signatureContentType='" + getSignatureContentType() + "'" +
            "}";
    }
}
