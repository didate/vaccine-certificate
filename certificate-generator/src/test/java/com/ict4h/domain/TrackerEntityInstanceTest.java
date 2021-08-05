package com.ict4h.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ict4h.web.rest.TestUtil;

public class TrackerEntityInstanceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrackerEntityInstance.class);
        TrackerEntityInstance trackerEntityInstance1 = new TrackerEntityInstance();
        trackerEntityInstance1.setId(1L);
        TrackerEntityInstance trackerEntityInstance2 = new TrackerEntityInstance();
        trackerEntityInstance2.setId(trackerEntityInstance1.getId());
        assertThat(trackerEntityInstance1).isEqualTo(trackerEntityInstance2);
        trackerEntityInstance2.setId(2L);
        assertThat(trackerEntityInstance1).isNotEqualTo(trackerEntityInstance2);
        trackerEntityInstance1.setId(null);
        assertThat(trackerEntityInstance1).isNotEqualTo(trackerEntityInstance2);
    }
}
