package com.ict4h.service.search;

import com.ict4h.service.search.criteria.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

public class SearchSpecification<T> implements Specification<T> {

    private static final long serialVersionUID = 1L;
    private SearchCriteria criteria;

    public SearchSpecification() {
    }

    public SearchSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

        switch (criteria.getOperation()) {
            case EQUALITY:
                if (root.get(criteria.getKey()).getJavaType() == String.class) {
                    return builder.equal(builder.lower(root.<String>get(criteria.getKey())),
                            criteria.getValue().toString().toLowerCase());
                } else if (root.get(criteria.getKey()).getJavaType() == Boolean.class) {
                    return builder.equal(root.get(criteria.getKey()),
                            Boolean.parseBoolean(criteria.getValue().toString()));
                }  else {
                    return builder.equal(root.get(criteria.getKey()),
                            java.lang.Long.valueOf(criteria.getValue().toString()));
                }

            case NEGATION:
                if (root.get(criteria.getKey()).getJavaType() == String.class) {
                    return builder.notEqual(builder.lower(root.<String>get(criteria.getKey())),
                            criteria.getValue().toString().toLowerCase());
                } else if (root.get(criteria.getKey()).getJavaType() == Boolean.class) {
                    return builder.notEqual(root.get(criteria.getKey()),
                            Boolean.parseBoolean(criteria.getValue().toString()));
                }  else {
                    return builder.notEqual(root.get(criteria.getKey()),
                            java.lang.Long.valueOf(criteria.getValue().toString()));
                }

            case GREATER_THAN:
                if (root.get(criteria.getKey()).getJavaType() == Instant.class) {
                    Timestamp t = new Timestamp(Long.valueOf(criteria.getValue().toString()));
                    Instant instant = t.toInstant();
                    return builder.greaterThan(root.<Instant>get(criteria.getKey()), instant);
                } else {
                    return builder.greaterThan(root.<String>get(criteria.getKey()), criteria.getValue().toString());
                }

            case LESS_THAN:
                if (root.get(criteria.getKey()).getJavaType() == Instant.class) {
                    Timestamp t = new Timestamp(Long.valueOf(criteria.getValue().toString()));
                    Instant instant = t.toInstant();
                    instant = instant.plus(1, ChronoUnit.DAYS);
                    return builder.lessThan(root.<Instant>get(criteria.getKey()), instant);
                } else {
                    return builder.lessThan(root.<String>get(criteria.getKey()), criteria.getValue().toString());
                }

            case LIKE:
                return builder.like(builder.lower(root.<String>get(criteria.getKey())),
                        criteria.getValue().toString().toLowerCase());
            case STARTS_WITH:
                return builder.like(builder.lower(root.<String>get(criteria.getKey())),
                        criteria.getValue().toString().toLowerCase() + "%");
            case ENDS_WITH:
                return builder.like(builder.lower(root.<String>get(criteria.getKey())),
                        "%" + criteria.getValue().toString().toLowerCase());
            case CONTAINS:
                return builder.like(builder.lower(root.<String>get(criteria.getKey())),
                        "%" + criteria.getValue().toString().toLowerCase() + "%");
            default:
                return null;
        }
    }

    public SearchCriteria getCriteria() {
        return criteria;
    }

    public void setCriteria(SearchCriteria criteria) {
        this.criteria = criteria;
    }
}
