package com.ict4h.service.search;

import com.ict4h.service.search.criteria.SearchCriteria;
import com.ict4h.service.search.criteria.SearchOperation;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class SpecificationBuilder<T> {

    private final List<SearchCriteria> params;

    public SpecificationBuilder() {
        params = new ArrayList<SearchCriteria>();
    }

    public final SpecificationBuilder<T> with(final String key, final String operation, final Object value,
            final String prefix, final String suffix) {
        return with(null, key, operation, value, prefix, suffix);
    }

    public final SpecificationBuilder<T> with(final String orPredicate, final String key, final String operation,
            final Object value, final String prefix, final String suffix) {
        SearchOperation op = SearchOperation.getSimpleOperation(operation.charAt(0));
        if (op != null) {
            if (op == SearchOperation.EQUALITY) { // the operation may be complex operation
                final boolean startWithAsterisk = prefix != null && prefix.contains(SearchOperation.ZERO_OR_MORE_REGEX);
                final boolean endWithAsterisk = suffix != null && suffix.contains(SearchOperation.ZERO_OR_MORE_REGEX);

                if (startWithAsterisk && endWithAsterisk) {
                    op = SearchOperation.CONTAINS;
                } else if (startWithAsterisk) {
                    op = SearchOperation.ENDS_WITH;
                } else if (endWithAsterisk) {
                    op = SearchOperation.STARTS_WITH;
                }
            }
            params.add(new SearchCriteria(orPredicate, key, op, value));
        }
        return this;
    }

    public Specification<T> build() {
        if (params.size() == 0) {
            return null;
        }
        Specification<T> result = new SearchSpecification<T>(params.get(0));
        for (int i = 1; i < params.size(); i++) {
            result = params.get(i).isOrPredicate()
                    ? Specification.where(result).or(new SearchSpecification<T>(params.get(i)))
                    : Specification.where(result).and(new SearchSpecification<T>(params.get(i)));
        }
        return result;
    }

    public final SpecificationBuilder<T> with(SearchSpecification<T> spec) {
        params.add(spec.getCriteria());
        return this;
    }

    public final SpecificationBuilder<T> with(SearchCriteria criteria) {
        params.add(criteria);
        return this;
    }
}
