package com.cg;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpbCineStarModulesApplication {

    private static final Logger logger = LoggerFactory.getLogger(SpbCineStarModulesApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SpbCineStarModulesApplication.class, args);
        logger.info("Application Started........");
    }

}
