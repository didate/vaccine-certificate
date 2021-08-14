package com.ict4h.repository;

import java.util.List;

import com.ict4h.domain.Event;
import com.ict4h.domain.TrackerEntityInstance;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByTei(TrackerEntityInstance tei);
}
