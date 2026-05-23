package com.startupfinder.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/upload")
@CrossOrigin("*")

public class UploadController {

    @PostMapping

    public String uploadResume(

        @RequestParam("file")
        MultipartFile file

    ) throws IOException {

        String folderPath =
            "uploads/";

        File folder =
            new File(folderPath);

        if (!folder.exists()) {
            folder.mkdir();
        }

        String fileName =
            System.currentTimeMillis()
            + "_"
            + file.getOriginalFilename();

        file.transferTo(

            new File(
                folderPath + fileName
            )

        );

        return fileName;
    }
}