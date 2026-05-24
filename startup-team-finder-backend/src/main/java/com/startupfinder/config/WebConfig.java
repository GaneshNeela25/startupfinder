package com.startupfinder.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig
implements WebMvcConfigurer {

    @Override

    public void addResourceHandlers(

        ResourceHandlerRegistry registry

    ) {

        registry.addResourceHandler(
            "/uploads/**"
        )

        .addResourceLocations(
            "file:uploads/"
        );

        registry.addResourceHandler(
            "/chat_uploads/**"
        )

        .addResourceLocations(
            "file:chat_uploads/"
        );

    }

}