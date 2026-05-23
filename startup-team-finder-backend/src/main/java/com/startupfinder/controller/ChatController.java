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

}