package com.ict4h.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TrackerEntityInstance.
 */
@Entity
@Table(name = "tracker_entity_instance")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TrackerEntityInstance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "uid", nullable = false)
    private String uid;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "sexe", nullable = false)
    private String sexe;

    @NotNull
    @Column(name = "profession", nullable = false)
    private String profession;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotNull
    @Column(name = "prefecture", nullable = false)
    private String prefecture;

    @Column(name = "sous_prefecture")
    private String sousPrefecture;

    @NotNull
    @Column(name = "quartier", nullable = false)
    private String quartier;

    @Column(name = "village")
    private String village;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @NotNull
    @Column(name = "local_id", nullable = false)
    private String localId;

    @Column(name = "code")
    private Long code;

    @Column(name = "certificate")
    private String certificate;

    @OneToMany(mappedBy = "tei")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Event> events = new HashSet<>();

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

    public TrackerEntityInstance uid(String uid) {
        this.uid = uid;
        return this;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getNom() {
        return nom;
    }

    public TrackerEntityInstance nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public TrackerEntityInstance prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getSexe() {
        return sexe;
    }

    public TrackerEntityInstance sexe(String sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getProfession() {
        return profession;
    }

    public TrackerEntityInstance profession(String profession) {
        this.profession = profession;
        return this;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public Integer getAge() {
        return age;
    }

    public TrackerEntityInstance age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPrefecture() {
        return prefecture;
    }

    public TrackerEntityInstance prefecture(String prefecture) {
        this.prefecture = prefecture;
        return this;
    }

    public void setPrefecture(String prefecture) {
        this.prefecture = prefecture;
    }

    public String getSousPrefecture() {
        return sousPrefecture;
    }

    public TrackerEntityInstance sousPrefecture(String sousPrefecture) {
        this.sousPrefecture = sousPrefecture;
        return this;
    }

    public void setSousPrefecture(String sousPrefecture) {
        this.sousPrefecture = sousPrefecture;
    }

    public String getQuartier() {
        return quartier;
    }

    public TrackerEntityInstance quartier(String quartier) {
        this.quartier = quartier;
        return this;
    }

    public void setQuartier(String quartier) {
        this.quartier = quartier;
    }

    public String getVillage() {
        return village;
    }

    public TrackerEntityInstance village(String village) {
        this.village = village;
        return this;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getTelephone() {
        return telephone;
    }

    public TrackerEntityInstance telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getLocalId() {
        return localId;
    }

    public TrackerEntityInstance localId(String localId) {
        this.localId = localId;
        return this;
    }

    public void setLocalId(String localId) {
        this.localId = localId;
    }

    public Long getCode() {
        return code;
    }

    public TrackerEntityInstance code(Long code) {
        this.code = code;
        return this;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getCertificate() {
        return certificate;
    }

    public TrackerEntityInstance certificate(String certificate) {
        this.certificate = certificate;
        return this;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public TrackerEntityInstance events(Set<Event> events) {
        this.events = events;
        return this;
    }

    public TrackerEntityInstance addEvent(Event event) {
        this.events.add(event);
        event.setTei(this);
        return this;
    }

    public TrackerEntityInstance removeEvent(Event event) {
        this.events.remove(event);
        event.setTei(null);
        return this;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrackerEntityInstance)) {
            return false;
        }
        return id != null && id.equals(((TrackerEntityInstance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TrackerEntityInstance{" +
            "id=" + getId() +
            ", uid='" + getUid() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", profession='" + getProfession() + "'" +
            ", age=" + getAge() +
            ", prefecture='" + getPrefecture() + "'" +
            ", sousPrefecture='" + getSousPrefecture() + "'" +
            ", quartier='" + getQuartier() + "'" +
            ", village='" + getVillage() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", localId='" + getLocalId() + "'" +
            ", code=" + getCode() +
            ", certificate='" + getCertificate() + "'" +
            "}";
    }
}
