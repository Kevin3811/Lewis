package com.lewis.lewis.utils;

import java.time.temporal.ChronoUnit;
import java.util.Date;

public class DateUtils {

    public static Long timeBetweenDates(Date date1, Date date2){
        Long timeDifference = ChronoUnit.MINUTES.between(date1.toInstant(), date2.toInstant());
        return timeDifference;
    }

}
