package com.startupfinder.controller;

import com.startupfinder.model.ChatMessage;
import com.startupfinder.repository.ChatMessageRepository;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin("*")

public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @GetMapping("/{teamId}")

    public List<ChatMessage> getMessages(
            @PathVariable Long teamId
    ) {

        return chatMessageRepository.findByTeamId(teamId);

    }

    @PostMapping

    public ChatMessage sendMessage(
            @RequestBody ChatMessage message
    ) {

        return chatMessageRepository.save(message);

    }

    @PostMapping("/upload")
public ChatMessage uploadFile(

        @RequestParam("teamId")
        Long teamId,

        @RequestParam("sender")
        String sender,

        @RequestParam("file")
        MultipartFile file

) throws Exception {

    ChatMessage message =
            new ChatMessage();

    message.setTeamId(teamId);

    message.setSender(sender);

    message.setMessage("FILE_SHARED");

    // CREATE FOLDER
    File uploadDir =
            new File("chat_uploads");

    if (!uploadDir.exists()) {

        uploadDir.mkdirs();

    }

    // UNIQUE FILE NAME
    String fileName =

            System.currentTimeMillis()
                    + "_"
                    + file.getOriginalFilename();

    Path filePath =

            Paths.get(
                    "chat_uploads",
                    fileName
            );

    Files.copy(

            file.getInputStream(),

            filePath,

            StandardCopyOption.REPLACE_EXISTING

    );

    message.setFileName(fileName);

    message.setOriginalFileName(
            file.getOriginalFilename()
    );

    return chatMessageRepository.save(
            message
    );

}

}