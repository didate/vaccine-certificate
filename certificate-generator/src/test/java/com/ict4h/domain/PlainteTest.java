package com.ict4h.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ict4h.web.rest.TestUtil;

public class PlainteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plainte.class);
        Plainte plainte1 = new Plainte();
        plainte1.setId(1L);
        Plainte plainte2 = new Plainte();
        plainte2.setId(plainte1.getId());
        assertThat(plainte1).isEqualTo(plainte2);
        plainte2.setId(2L);
        assertThat(plainte1).isNotEqualTo(plainte2);
        plainte1.setId(null);
        assertThat(plainte1).isNotEqualTo(plainte2);
    }
}
