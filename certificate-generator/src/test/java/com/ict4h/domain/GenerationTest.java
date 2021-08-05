package com.ict4h.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ict4h.web.rest.TestUtil;

public class GenerationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Generation.class);
        Generation generation1 = new Generation();
        generation1.setId(1L);
        Generation generation2 = new Generation();
        generation2.setId(generation1.getId());
        assertThat(generation1).isEqualTo(generation2);
        generation2.setId(2L);
        assertThat(generation1).isNotEqualTo(generation2);
        generation1.setId(null);
        assertThat(generation1).isNotEqualTo(generation2);
    }
}
