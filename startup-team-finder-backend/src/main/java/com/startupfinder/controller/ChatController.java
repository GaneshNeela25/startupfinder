package com.startupfinder.controller;

import com.startupfinder.model.ChatMessage;
import com.startupfinder.repository.ChatMessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin("*")

public class ChatController {

    @Autowired
    private ChatMessageRepository chatRepo;

    @PostMapping
    public ChatMessage sendMessage(

        @RequestBody ChatMessage chatMessage

    ) {

        return chatRepo.save(chatMessage);

    }

    @GetMapping("/{teamId}")

    public List<ChatMessage> getMessages(

        @PathVariable Long teamId

    ) {

        return chatRepo.findByTeamId(teamId);

    }
}