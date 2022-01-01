package com.lewis.lewis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LewisApplication {

	public static void main(String[] args) {
		SpringApplication.run(LewisApplication.class, args);
	}

}
